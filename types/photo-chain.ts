export interface User {
  id: string;
  name: string;
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * One link in a chain: the photo answers the previous entry's challenge,
 * and `challenge` is the task this entry sets for the next participant.
 */
export interface ChainEntry {
  id: string;
  author: User;
  photo: Photo;
  challenge: string;
  /** ISO 8601 date string, e.g. "2026-11-02". */
  createdAt: string;
  points: number;
}

export interface PhotoChain {
  id: string;
  title: string;
  /** Ordered oldest to newest. */
  entries: ChainEntry[];
}
