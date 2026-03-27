"use client";

import { ParticipantStanding } from "@/lib/types";
import RosterCard from "./RosterCard";

interface RosterSectionProps {
  standings: ParticipantStanding[];
}

export default function RosterSection({ standings }: RosterSectionProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Roster Breakdown
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {standings.map((p) => (
          <RosterCard key={p.name} participant={p} />
        ))}
      </div>
    </section>
  );
}
