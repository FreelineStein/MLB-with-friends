import { TeamRecord } from "./types";

const ESPN_STANDINGS_URL =
  "https://site.api.espn.com/apis/v2/sports/baseball/mlb/standings";

interface ESPNStat {
  type: string;
  value: number;
  displayValue: string;
}

interface ESPNTeam {
  abbreviation: string;
  displayName: string;
  logos: { href: string }[];
}

interface ESPNEntry {
  team: ESPNTeam;
  stats: ESPNStat[];
}

interface ESPNDivision {
  standings: {
    entries: ESPNEntry[];
  };
}

interface ESPNResponse {
  children: ESPNDivision[];
}

function parseStat(stats: ESPNStat[], type: string): number {
  const stat = stats.find((s) => s.type === type);
  return stat ? stat.value : 0;
}

export async function fetchStandings(): Promise<TeamRecord[]> {
  const res = await fetch(ESPN_STANDINGS_URL);
  if (!res.ok) {
    throw new Error(`ESPN API returned ${res.status}`);
  }

  const data: ESPNResponse = await res.json();
  const teams: TeamRecord[] = [];

  for (const division of data.children) {
    for (const entry of division.standings.entries) {
      const wins = parseStat(entry.stats, "wins");
      const losses = parseStat(entry.stats, "losses");
      const totalGames = wins + losses;

      teams.push({
        abbreviation: entry.team.abbreviation,
        displayName: entry.team.displayName,
        logoUrl: entry.team.logos?.[0]?.href ?? "",
        wins,
        losses,
        winPct: totalGames > 0 ? wins / totalGames : 0,
      });
    }
  }

  return teams;
}
