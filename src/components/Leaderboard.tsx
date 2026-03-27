"use client";

import { ParticipantStanding } from "@/lib/types";

interface LeaderboardProps {
  standings: ParticipantStanding[];
}

export default function Leaderboard({ standings }: LeaderboardProps) {
  const scrollToRoster = (name: string) => {
    const el = document.getElementById(`roster-${name}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Leaderboard</h2>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left">
              <th className="px-4 py-3 font-medium w-12">#</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium text-right">W</th>
              <th className="px-4 py-3 font-medium text-right">L</th>
              <th className="px-4 py-3 font-medium text-right">PCT</th>
              <th className="px-4 py-3 font-medium text-right">GB</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((p) => (
              <tr
                key={p.name}
                onClick={() => scrollToRoster(p.name)}
                className={`border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  p.rank === 1 ? "bg-yellow-50/50" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-500">
                  {p.rank === 1 ? "🏆" : p.rank}
                </td>
                <td className="px-4 py-3 font-semibold">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full mr-2"
                    style={{ backgroundColor: p.color }}
                  />
                  {p.name}
                </td>
                <td className="px-4 py-3 text-right font-semibold">{p.totalWins}</td>
                <td className="px-4 py-3 text-right text-gray-600">{p.totalLosses}</td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {p.winPct.toFixed(3).replace(/^0/, "")}
                </td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {p.gamesBack === 0 ? "—" : p.gamesBack}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2">
        {standings.map((p) => (
          <div
            key={p.name}
            onClick={() => scrollToRoster(p.name)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer active:bg-gray-50 ${
              p.rank === 1
                ? "border-yellow-300 bg-yellow-50/50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-400 w-6 text-center">
                {p.rank === 1 ? "🏆" : p.rank}
              </span>
              <div>
                <div className="font-semibold flex items-center gap-1.5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  {p.name}
                </div>
                <div className="text-xs text-gray-500">
                  {p.totalWins}W - {p.totalLosses}L
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{p.totalWins}</div>
              <div className="text-xs text-gray-500">
                {p.gamesBack === 0 ? "Leader" : `${p.gamesBack} GB`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
