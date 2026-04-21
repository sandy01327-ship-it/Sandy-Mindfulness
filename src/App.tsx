/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wind, Heart, Settings } from "lucide-react";
import BreathingGuide from "./components/BreathingGuide";
import GratitudeJournal from "./components/GratitudeJournal";

type AppView = "breathe" | "journal";

export default function App() {
  const [view, setView] = useState<AppView>("breathe");
  const today = new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="min-h-screen bg-bg flex flex-col font-serif p-8 md:p-12 box-border">
      {/* Header */}
      <header className="flex justify-between items-baseline border-b border-sage/20 pb-4 mb-12">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center text-white">
            <Wind className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-normal text-olive">Inner Calm</h1>
        </div>
        <div className="text-sm uppercase tracking-widest text-sage font-sans">
          {today}
        </div>
      </header>

      {/* Main Content Area: Split Layout for Desktop */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto w-full">
        {/* Desktop: Side-by-side, Mobile: Component Switching based on toggle or just show both? 
            The instructions say "preserve all existing components, content, and functionality".
            My existing functionality has a state-based view. I'll transform it into a responsive visual layout
            where they are side-by-side on large screens, but still follow the state on mobile if that's preferred,
            or just show them grid-style as instructed by the design HTML. 
            I will use the grid layout for desktop and component switching for mobile to keep the "preserve functionality" part relevant.
        */}
        
        {/* Breathing Section Container */}
        <div className={`${view === "breathe" ? "block" : "hidden lg:block"}`}>
          <BreathingGuide />
        </div>

        {/* Journal Section Container */}
        <div className={`${view === "journal" ? "block" : "hidden lg:block"}`}>
          <GratitudeJournal />
        </div>
      </main>

      {/* Mobile Sticky Navigation (Preserving functionality for mobile) */}
      <div className="lg:hidden sticky bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-panel px-8 py-4 flex items-center space-x-12 shadow-2xl">
          <button
            onClick={() => setView("breathe")}
            className={`flex flex-col items-center space-y-1 transition-all ${
              view === "breathe" ? "text-olive scale-110" : "text-sage"
            }`}
          >
            <Wind className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-sans">呼吸</span>
          </button>
          <button
            onClick={() => setView("journal")}
            className={`flex flex-col items-center space-y-1 transition-all ${
              view === "journal" ? "text-clay scale-110" : "text-sage"
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-sans">日記</span>
          </button>
        </div>
      </div>

      <footer className="mt-12 text-center text-sage/60 text-sm italic py-8 border-t border-sage/10">
        "在這寧靜的一刻，找到內心的平靜與喜悅。"
      </footer>
    </div>
  );
}
