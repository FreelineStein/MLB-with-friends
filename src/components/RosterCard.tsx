"use client";

import Image from "next/image";
import { ParticipantStanding } from "@/lib/types";

interface RosterCardProps {
  participant: ParticipantStanding;
}

export default function RosterCard({ participant }: RosterCardProps) {
  const p = participant;

  return (
    <div
      id={`roster-${p.name}`}
      className="rounded-xl border-2 bg-white overflow-hidden scroll-mt-20"
      style={{ borderColor: p.color }}
    >
      <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: `${p.color}10` }}>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="font-semibold text-gray-900">{p.name}</span>
          {p.rank === 1 && <span className="text-sm">🏆</span>}
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold" style={{ color: p.color }}>
            {p.totalWins}
          </span>
          <span className="text-sm text-gray-500 ml-1">wins</span>
        </div>
      </div>

      <table className="w-full text-xs sm:text-sm table-fixed">
        <thead>
          <tr className="text-gray-500 text-left bg-gray-50">
            <th className="px-3 py-2 font-medium">Team</th>
            <th className="px-2 py-2 font-medium text-right w-8">W</th>
            <th className="px-2 py-2 font-medium text-right w-8">L</th>
            <th className="px-2 py-2 font-medium text-right w-12">PCT</th>
          </tr>
        </thead>
        <tbody>
          {p.teams.map((t) => (
            <tr key={t.abbreviation} className="border-t border-gray-100">
              <td className="px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  {t.logoUrl && (
                    <Image
                      src={t.logoUrl}
                      alt={t.displayName}
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                      unoptimized
                    />
                  )}
                  <span className="truncate">{t.displayName}</span>
                </div>
              </td>
              <td className="px-2 py-2 text-right font-medium">{t.wins}</td>
              <td className="px-2 py-2 text-right text-gray-600">{t.losses}</td>
              <td className="px-2 py-2 text-right text-gray-600 whitespace-nowrap">
                {t.winPct.toFixed(3).replace(/^0/, "")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
