import { useId } from "react";
import type { ChainEntry } from "@/types/photo-chain";

interface CurrentChallengeProps {
  /** The most recent entry; its challenge is the one now open. */
  latestEntry: ChainEntry;
}

export default function CurrentChallenge({ latestEntry }: CurrentChallengeProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-lg sm:p-8"
    >
      <h2
        id={titleId}
        className="text-sm font-semibold tracking-wide text-violet-100 uppercase"
      >
        Current challenge
      </h2>
      <p className="mt-2 text-2xl font-bold sm:text-3xl">
        {latestEntry.challenge}
      </p>
      <p className="mt-4 text-sm text-violet-100">
        Set by {latestEntry.author.name}. Waiting for the next participant.
      </p>
    </section>
  );
}
