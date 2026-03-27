export interface TeamRecord {
  abbreviation: string;
  displayName: string;
  logoUrl: string;
  wins: number;
  losses: number;
  winPct: number;
}

export interface ParticipantStanding {
  name: string;
  color: string;
  rank: number;
  totalWins: number;
  totalLosses: number;
  winPct: number;
  gamesBack: number;
  teams: TeamRecord[];
}
