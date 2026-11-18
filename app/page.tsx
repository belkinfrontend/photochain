import CurrentChallenge from "@/components/CurrentChallenge";
import Header from "@/components/Header";
import PhotoChain from "@/components/PhotoChain";
import { mockChain } from "@/data/mock-chain";

export default function Home() {
  const latestEntry = mockChain.entries.at(-1);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            One photo. One challenge. Pass it on.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Every photo in a chain answers the previous challenge and sets a
            new one for the next participant.
          </p>
        </div>
        {latestEntry && <CurrentChallenge latestEntry={latestEntry} />}
        <PhotoChain chain={mockChain} eyebrow="Example chain" />
      </main>
    </>
  );
}
