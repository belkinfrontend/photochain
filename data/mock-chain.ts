import type { PhotoChain } from "@/types/photo-chain";

const PHOTO_SIZE = { width: 800, height: 600 } as const;

export const mockChain: PhotoChain = {
  id: "chain-1",
  title: "City Senses",
  entries: [
    {
      id: "entry-1",
      author: { id: "user-1", name: "Maya Chen" },
      photo: {
        src: "/photos/red-bicycle.svg",
        alt: "A red bicycle leaning against a white wall",
        ...PHOTO_SIZE,
      },
      challenge: "Capture a reflection of the sky on the ground.",
      createdAt: "2026-11-02",
      points: 50,
    },
    {
      id: "entry-2",
      author: { id: "user-2", name: "Jonas Weber" },
      photo: {
        src: "/photos/puddle-sky.svg",
        alt: "A puddle on the pavement reflecting blue sky and clouds",
        ...PHOTO_SIZE,
      },
      challenge: "Photograph a shadow that looks like something else.",
      createdAt: "2026-11-05",
      points: 40,
    },
    {
      id: "entry-3",
      author: { id: "user-3", name: "Priya Nair" },
      photo: {
        src: "/photos/plant-shadow.svg",
        alt: "The shadow of a potted plant on a wall, shaped like a waving hand",
        ...PHOTO_SIZE,
      },
      challenge: "Find three circles in a single frame.",
      createdAt: "2026-11-09",
      points: 45,
    },
    {
      id: "entry-4",
      author: { id: "user-4", name: "Leo Martins" },
      photo: {
        src: "/photos/three-cups.svg",
        alt: "Three coffee cups seen from above on a wooden table",
        ...PHOTO_SIZE,
      },
      challenge:
        "Show something that has stayed in the same place for over 100 years.",
      createdAt: "2026-11-13",
      points: 35,
    },
  ],
};
