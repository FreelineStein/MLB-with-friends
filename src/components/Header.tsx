"use client";

import { useEffect, useState } from "react";

interface HeaderProps {
  lastUpdated: Date | null;
  onRefresh: () => void;
  loading: boolean;
}

function getRelativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return "Updated just now";
  if (seconds < 60) return `Updated ${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Updated ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `Updated ${hours}h ago`;
}

export default function Header({ lastUpdated, onRefresh, loading }: HeaderProps) {
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    if (!lastUpdated) return;
    setTimeText(getRelativeTime(lastUpdated));
    const interval = setInterval(() => {
      setTimeText(getRelativeTime(lastUpdated));
    }, 10000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Degens MLB 2026
            </h1>
            <p className="text-sm text-gray-500">$50 buy-in, winner takes all</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {lastUpdated && <span className="hidden sm:inline">{timeText}</span>}
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="Refresh standings"
            >
              <svg
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
