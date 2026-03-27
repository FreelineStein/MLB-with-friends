"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchStandings } from "@/lib/espn";
import { participants, PARTICIPANT_COLORS } from "@/config/rosters";
import { TeamRecord, ParticipantStanding } from "@/lib/types";

interface UseStandingsResult {
  standings: ParticipantStanding[];
  allTeams: (TeamRecord & { owner: string; ownerColor: string })[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

export function useStandings(): UseStandingsResult {
  const [standings, setStandings] = useState<ParticipantStanding[]>([]);
  const [allTeams, setAllTeams] = useState<
    (TeamRecord & { owner: string; ownerColor: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const teams = await fetchStandings();
      const teamMap = new Map(teams.map((t) => [t.abbreviation, t]));

      // Build participant standings
      const participantStandings: ParticipantStanding[] = participants.map(
        (p, i) => {
          const pTeams = p.teams
            .map((abbr) => teamMap.get(abbr))
            .filter((t): t is TeamRecord => t !== undefined)
            .sort((a, b) => b.wins - a.wins);

          const totalWins = pTeams.reduce((sum, t) => sum + t.wins, 0);
          const totalLosses = pTeams.reduce((sum, t) => sum + t.losses, 0);
          const totalGames = totalWins + totalLosses;

          return {
            name: p.name,
            color: PARTICIPANT_COLORS[i],
            rank: 0, // computed after sorting
            totalWins,
            totalLosses,
            winPct: totalGames > 0 ? totalWins / totalGames : 0,
            gamesBack: 0, // computed after sorting
            teams: pTeams,
          };
        }
      );

      // Sort by wins desc, then losses asc
      participantStandings.sort((a, b) => {
        if (b.totalWins !== a.totalWins) return b.totalWins - a.totalWins;
        return a.totalLosses - b.totalLosses;
      });

      // Assign ranks and games back
      const leaderWins = participantStandings[0]?.totalWins ?? 0;
      let currentRank = 1;
      participantStandings.forEach((p, i) => {
        if (
          i > 0 &&
          (p.totalWins !== participantStandings[i - 1].totalWins ||
            p.totalLosses !== participantStandings[i - 1].totalLosses)
        ) {
          currentRank = i + 1;
        }
        p.rank = currentRank;
        p.gamesBack = leaderWins - p.totalWins;
      });

      // Build owner lookup
      const ownerMap = new Map<string, { name: string; color: string }>();
      participants.forEach((p, i) => {
        p.teams.forEach((abbr) => {
          ownerMap.set(abbr, { name: p.name, color: PARTICIPANT_COLORS[i] });
        });
      });

      const enrichedTeams = teams
        .map((t) => {
          const owner = ownerMap.get(t.abbreviation);
          return {
            ...t,
            owner: owner?.name ?? "Unknown",
            ownerColor: owner?.color ?? "#666",
          };
        })
        .sort((a, b) => b.wins - a.wins);

      setStandings(participantStandings);
      setAllTeams(enrichedTeams);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch standings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { standings, allTeams, loading, error, lastUpdated, refresh: load };
}
