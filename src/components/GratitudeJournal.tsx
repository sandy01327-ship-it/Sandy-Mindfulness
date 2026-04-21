import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, Plus, Calendar } from "lucide-react";

interface JournalEntry {
  id: string;
  content: string;
  date: string;
}

export default function GratitudeJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gratitude_entries");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse entries", e);
      }
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem("gratitude_entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      content: newEntry.trim(),
      date: new Date().toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }),
    };
    setEntries([entry, ...entries]);
    setNewEntry("");
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="flex flex-col w-full h-full space-y-8">
      {/* Journal Entry Card */}
      <div className="glass-panel p-10 flex flex-col h-full bg-paper">
        <h2 className="text-2xl text-olive italic mb-6">今日感恩</h2>
        
        <div className="space-y-6 flex-1">
          <div className="prompt-group">
            <label className="text-[13px] uppercase tracking-widest text-sage mb-3 block font-sans">
              值得感謝的三件事：
            </label>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="輸入今天的感悟與反思..."
              className="w-full min-h-[160px] p-0 bg-transparent border-none border-b border-sage/10 focus:border-olive transition-colors outline-none resize-none text-lg text-stone placeholder-sage/30 leading-relaxed font-serif"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={addEntry}
              disabled={!newEntry.trim()}
              className="flex items-center space-x-2 px-8 py-2.5 bg-olive text-white rounded-full hover:bg-stone disabled:opacity-30 transition-all font-sans text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>儲存紀錄</span>
            </button>
          </div>
        </div>

        {/* Past Records View (Compact Preview) */}
        <div className="mt-10 border-t border-sage/10 pt-8">
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-sage mb-6 font-sans">
            過往點滴
          </h3>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {entries.length === 0 ? (
              <p className="text-sage/40 italic text-sm py-4">尚無對話紀錄，開始記下今日的小確幸吧。</p>
            ) : (
              entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-2 h-2 rounded-full bg-clay mt-2 shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] uppercase tracking-wider text-clay font-sans">
                        {entry.date}
                      </span>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3 text-red-300 hover:text-red-500" />
                      </button>
                    </div>
                    <p className="text-sage leading-relaxed text-sm line-clamp-2 italic">
                      "{entry.content}"
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
