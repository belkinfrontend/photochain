import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl items-center px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-8 w-8 text-violet-600 dark:text-violet-400"
          >
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <rect
              x="5"
              y="11"
              width="13"
              height="10"
              rx="5"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <rect
              x="14"
              y="11"
              width="13"
              height="10"
              rx="5"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Photo<span className="text-violet-600 dark:text-violet-400">Chain</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
