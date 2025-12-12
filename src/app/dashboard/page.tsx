"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/Card";
import { LanguageSelector } from "@/components/LanguageSelector";
import Link from "next/link";
import Image from "next/image";
import type { Memory } from "@/types";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "recent" | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await fetch("/api/memories");
      if (response.ok) {
        const data = await response.json();
        setMemories(data);
      }
    } catch (error) {
      console.error("Error fetching memories:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMemories = memories.filter((memory) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        memory.name.toLowerCase().includes(query) ||
        memory.relationship.toLowerCase().includes(query) ||
        memory.description?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Filter by type
    if (filter === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(memory.createdAt) >= oneWeekAgo;
    }
    // Note: favorites filter would need a favorite field in the Memory model
    // For now, we'll just show all when favorites is selected
    return true;
  });

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-[#F7F5F3] via-[#E8D5B7] to-[#7A8A76]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-[20px] bg-[rgba(247,245,243,0.8)] border-b border-[rgba(122,138,118,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Title */}
            <h1 className="text-2xl font-semibold text-[#3A4B39] font-['Outfit']">
              {t.dashboard.title}
            </h1>

            {/* Filters and Search */}
            <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "all"
                      ? "bg-gradient-to-r from-[#7A8A76] to-[#B8952F] text-white shadow-md"
                      : "bg-white/50 text-[#5A6B59] hover:bg-white/70"
                  }`}
                >
                  {t.dashboard.filters.all}
                </button>
                <button
                  onClick={() => setFilter("recent")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "recent"
                      ? "bg-gradient-to-r from-[#7A8A76] to-[#B8952F] text-white shadow-md"
                      : "bg-white/50 text-[#5A6B59] hover:bg-white/70"
                  }`}
                >
                  {t.dashboard.filters.recent}
                </button>
                <button
                  onClick={() => setFilter("favorites")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "favorites"
                      ? "bg-gradient-to-r from-[#7A8A76] to-[#B8952F] text-white shadow-md"
                      : "bg-white/50 text-[#5A6B59] hover:bg-white/70"
                  }`}
                >
                  {t.dashboard.filters.favorites}
                </button>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={t.dashboard.filters.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full bg-white/50 border border-[rgba(122,138,118,0.3)] text-[#3A4B39] placeholder:text-[#7A8A76] focus:outline-none focus:ring-2 focus:ring-[#7A8A76]/50 focus:bg-white/70 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7A8A76]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Right side: Language Selector and UserButton */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#7A8A76]">{t.common.loading}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Memory Cards */}
            {filteredMemories.map((memory) => (
              <Link key={memory.id} href={`/memories/${memory.id}`}>
                <Card
                  variant="memory"
                  className="cursor-pointer h-full flex flex-col"
                >
                  <CardContent className="flex flex-col items-center text-center p-6 h-full">
                    {/* Avatar Image */}
                    <div className="relative w-24 h-24 rounded-full mb-4 overflow-hidden border-4 border-white/50 shadow-lg">
                      {memory.avatarImageUrl ? (
                        <Image
                          src={memory.avatarImageUrl}
                          alt={memory.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#7A8A76] to-[#B8952F] flex items-center justify-center text-white text-2xl font-semibold">
                          {memory.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-semibold text-[#3A4B39] mb-1 font-['Outfit']">
                      {memory.name}
                    </h3>

                    {/* Relationship */}
                    <p className="text-sm text-[#7A8A76] mb-3">
                      {memory.relationship}
                    </p>

                    {/* Description */}
                    {memory.description && (
                      <p className="text-sm text-[#5A6B59] line-clamp-2 flex-1">
                        {memory.description}
                      </p>
                    )}

                    {/* Personality Traits */}
                    {memory.personalityTraits && memory.personalityTraits.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 justify-center">
                        {memory.personalityTraits.slice(0, 3).map((trait, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-[rgba(122,138,118,0.1)] text-[#4A5D49]"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Create New Memory Card */}
            <Link href="/memories/create">
              <Card
                variant="memory"
                className="cursor-pointer h-full flex flex-col border-2 border-dashed border-[rgba(122,138,118,0.4)] hover:border-[rgba(122,138,118,0.6)]"
              >
                <CardContent className="flex flex-col items-center justify-center text-center p-6 h-full min-h-[300px]">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7A8A76] to-[#B8952F] flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#3A4B39] mb-2 font-['Outfit']">
                    {t.dashboard.createMemory}
                  </h3>
                  <p className="text-sm text-[#7A8A76]">
                    {t.dashboard.createFirstMemory}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}
      </main>
        </div>
      </SignedIn>
    </>
  );
}

