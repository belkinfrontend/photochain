import Image from "next/image";
import { useId } from "react";
import type { ChainEntry } from "@/types/photo-chain";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

interface PhotoCardProps {
  entry: ChainEntry;
  /** 1-based position in the chain. */
  position: number;
}

export default function PhotoCard({ entry, position }: PhotoCardProps) {
  const titleId = useId();
  const { author, photo, challenge, createdAt, points } = entry;

  return (
    <article
      aria-labelledby={titleId}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        unoptimized
        className="aspect-4/3 w-full object-cover"
      />
      <div className="space-y-3 p-4 sm:p-5">
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3
            id={titleId}
            className="font-semibold text-zinc-900 dark:text-zinc-50"
          >
            <span className="sr-only">Step {position}: </span>
            {author.name}
          </h3>
          <time
            dateTime={createdAt}
            className="text-sm text-zinc-500 dark:text-zinc-400"
          >
            {dateFormatter.format(new Date(createdAt))}
          </time>
        </header>
        <div>
          <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Challenge for the next participant
          </p>
          <p className="mt-1 text-zinc-700 dark:text-zinc-300">{challenge}</p>
        </div>
        <p className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-semibold text-amber-800 dark:bg-amber-400/15 dark:text-amber-300">
          +{points} <span className="ml-1 font-normal">points</span>
        </p>
      </div>
    </article>
  );
}
