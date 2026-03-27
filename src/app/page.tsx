"use client";

import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import RosterSection from "@/components/RosterSection";
import AllTeamsTable from "@/components/AllTeamsTable";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useStandings } from "@/hooks/useStandings";

export default function Home() {
  const { standings, allTeams, loading, error, lastUpdated, refresh } =
    useStandings();

  return (
    <>
      <Header lastUpdated={lastUpdated} onRefresh={refresh} loading={loading} />
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-10">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center">
            <p className="text-red-800 font-medium mb-2">
              Failed to load standings
            </p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {loading && !error && <LoadingSkeleton />}

        {!loading && !error && (
          <>
            <Leaderboard standings={standings} />
            <RosterSection standings={standings} />
            <AllTeamsTable teams={allTeams} />
          </>
        )}
      </main>
    </>
  );
}
