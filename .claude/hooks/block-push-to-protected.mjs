// PreToolUse hook: refuses any shell command that would push to a protected branch.
// Reads the hook payload on stdin; prints a "deny" decision when a push targets one.
import { execFileSync } from "node:child_process";

const PROTECTED = new Set(["main", "master"]);
const PROTECTED_LIST = [...PROTECTED].join("/");

function currentBranch(cwd) {
  try {
    // symbolic-ref also works on a branch with no commits yet.
    return execFileSync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function stripRef(ref) {
  return ref.replace(/^\+/, "").replace(/^refs\/heads\//, "");
}

// Returns a reason string if this single command segment pushes to a protected branch.
function checkSegment(segment, cwd) {
  const tokens = segment.match(/"[^"]*"|'[^']*'|\S+/g) ?? [];
  const words = tokens.map((t) => t.replace(/^["']|["']$/g, ""));

  const gitIdx = words.findIndex((w) => /(^|[\\/])git(\.exe)?$/i.test(w));
  if (gitIdx === -1) return null;
  const pushIdx = words.indexOf("push", gitIdx + 1);
  if (pushIdx === -1) return null;

  const args = words.slice(pushIdx + 1);
  if (
    args.some((a) => a === "--all" || a === "--mirror" || a === "--branches")
  ) {
    return `\`--all\`/\`--mirror\`/\`--branches\` would also push ${PROTECTED_LIST}`;
  }

  const positional = args.filter((a) => !a.startsWith("-"));
  const refspecs = positional.slice(1); // first positional is the remote
  const branch = currentBranch(cwd);

  if (refspecs.length === 0) {
    return PROTECTED.has(branch) ? `current branch is ${branch}` : null;
  }

  for (const spec of refspecs) {
    const dst = spec.includes(":") ? spec.split(":", 2)[1] : spec;
    let target = stripRef(dst);
    if (target === "HEAD" || target === "@") target = branch ?? target;
    if (PROTECTED.has(target)) return `refspec \`${spec}\` targets ${target}`;
  }
  return null;
}

let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  const payload = JSON.parse(input);
  const command = payload.tool_input?.command ?? "";
  if (!/\bpush\b/.test(command)) return;

  const cwd = payload.cwd || process.cwd();
  const segments = command.split(/&&|\|\||[;|\n]/);
  for (const segment of segments) {
    const reason = checkSegment(segment, cwd);
    if (reason) {
      process.stdout.write(
        JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: `Pushing to ${PROTECTED_LIST} is not allowed (${reason}). Push to a feature branch and open a PR instead.`,
          },
        }),
      );
      return;
    }
  }
});
