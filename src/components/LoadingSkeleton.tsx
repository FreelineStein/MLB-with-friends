export default function LoadingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-pulse">
      {/* Leaderboard skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Roster cards skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>

      {/* All teams skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-36 bg-gray-200 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
