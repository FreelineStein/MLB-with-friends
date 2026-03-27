export interface Participant {
  name: string;
  teams: string[]; // ESPN team abbreviations, exactly 5 per participant
}

export const participants: Participant[] = [
  { name: "Plum", teams: ["LAD", "DET", "TEX", "TB", "WSH"] },
  { name: "JP", teams: ["SEA", "BAL", "SD", "MIN", "MIA"] },
  { name: "Rose", teams: ["NYM", "ATL", "KC", "PIT", "STL"] },
  { name: "Drew", teams: ["TOR", "BOS", "CLE", "CIN", "CWS"] },
  { name: "ZT", teams: ["NYY", "MIL", "ARI", "SF", "COL"] },
  { name: "Steiner", teams: ["PHI", "CHC", "HOU", "OAK", "LAA"] },
];

// Validation
const allTeams = participants.flatMap((p) => p.teams);
const uniqueTeams = new Set(allTeams);

if (allTeams.length !== 30) {
  console.error(
    `Roster config error: expected 30 total team slots, got ${allTeams.length}`
  );
}
if (uniqueTeams.size !== 30) {
  console.error(
    `Roster config error: expected 30 unique teams, got ${uniqueTeams.size}. Duplicates: ${allTeams.filter((t, i) => allTeams.indexOf(t) !== i)}`
  );
}
participants.forEach((p) => {
  if (p.teams.length !== 5) {
    console.error(
      `Roster config error: ${p.name} has ${p.teams.length} teams, expected 5`
    );
  }
});

export const PARTICIPANT_COLORS = [
  "#2563eb", // blue
  "#dc2626", // red
  "#16a34a", // green
  "#ea580c", // orange
  "#9333ea", // purple
  "#0d9488", // teal
];
