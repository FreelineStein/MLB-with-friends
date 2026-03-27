"use client";

import { useState } from "react";
import Image from "next/image";
import { TeamRecord } from "@/lib/types";

type SortKey = "team" | "wins" | "losses" | "winPct";
type SortDir = "asc" | "desc";

interface AllTeamsTableProps {
  teams: (TeamRecord & { owner: string; ownerColor: string })[];
}

export default function AllTeamsTable({ teams }: AllTeamsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("wins");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = [...teams].sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case "team":
        cmp = a.displayName.localeCompare(b.displayName);
        break;
      case "wins":
        cmp = a.wins - b.wins;
        break;
      case "losses":
        cmp = a.losses - b.losses;
        break;
      case "winPct":
        cmp = a.winPct - b.winPct;
        break;
    }
    return sortDir === "desc" ? -cmp : cmp;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="ml-1">{sortDir === "desc" ? "↓" : "↑"}</span>;
  };

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">All 30 Teams</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left">
              <th
                className="px-3 py-3 font-medium cursor-pointer select-none"
                onClick={() => handleSort("team")}
              >
                Team
                <SortIcon col="team" />
              </th>
              <th
                className="px-2 py-3 font-medium text-right cursor-pointer select-none w-10"
                onClick={() => handleSort("wins")}
              >
                W
                <SortIcon col="wins" />
              </th>
              <th
                className="px-2 py-3 font-medium text-right cursor-pointer select-none w-10"
                onClick={() => handleSort("losses")}
              >
                L
                <SortIcon col="losses" />
              </th>
              <th
                className="px-2 py-3 font-medium text-right cursor-pointer select-none w-14 hidden sm:table-cell"
                onClick={() => handleSort("winPct")}
              >
                PCT
                <SortIcon col="winPct" />
              </th>
              <th className="px-2 py-3 font-medium w-20 sm:w-28">Owner</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t) => (
              <tr key={t.abbreviation} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2.5">
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
                <td className="px-2 py-2.5 text-right font-medium">{t.wins}</td>
                <td className="px-2 py-2.5 text-right text-gray-600">{t.losses}</td>
                <td className="px-2 py-2.5 text-right text-gray-600 hidden sm:table-cell">
                  {t.winPct.toFixed(3).replace(/^0/, "")}
                </td>
                <td className="px-2 py-2.5">
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full truncate"
                    style={{
                      backgroundColor: `${t.ownerColor}15`,
                      color: t.ownerColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: t.ownerColor }}
                    />
                    {t.owner}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
