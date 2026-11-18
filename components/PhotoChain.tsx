import { useId } from "react";
import type { PhotoChain as PhotoChainData } from "@/types/photo-chain";
import PhotoCard from "./PhotoCard";

interface PhotoChainProps {
  chain: PhotoChainData;
  /** Optional small label shown above the chain title. */
  eyebrow?: string;
}

export default function PhotoChain({ chain, eyebrow }: PhotoChainProps) {
  const titleId = useId();
  const totalPoints = chain.entries.reduce((sum, e) => sum + e.points, 0);

  return (
    <section aria-labelledby={titleId}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          {eyebrow && (
            <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
              {eyebrow}
            </p>
          )}
          <h2
            id={titleId}
            className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            {chain.title}
          </h2>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {chain.entries.length} photos · {totalPoints} points
        </p>
      </div>

      <ol className="relative space-y-8">
        {chain.entries.map((entry, index) => (
          <li key={entry.id} className="relative pl-12 sm:pl-14">
            {/* Connector line to the next entry */}
            {index < chain.entries.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-8 -bottom-8 left-4 w-0.5 -translate-x-1/2 sm:top-10 bg-linear-to-b from-violet-400 to-violet-200 sm:left-5 dark:from-violet-500 dark:to-violet-900"
              />
            )}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white ring-4 ring-zinc-50 sm:h-10 sm:w-10 dark:ring-zinc-950"
            >
              {index + 1}
            </span>
            <PhotoCard entry={entry} position={index + 1} />
          </li>
        ))}
      </ol>
    </section>
  );
}
