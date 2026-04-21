import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, ChevronDown, Circle, Play } from "lucide-react";

const BREATH_PHASES = [
  { text: "吸氣", duration: 4, action: "inhale", icon: ChevronUp },
  { text: "停留", duration: 4, action: "hold", icon: Circle },
  { text: "吐氣", duration: 4, action: "exhale", icon: ChevronDown },
  { text: "停留", duration: 4, action: "hold", icon: Circle },
];

export default function BreathingGuide() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(BREATH_PHASES[0].duration);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const nextIndex = (phaseIndex + 1) % BREATH_PHASES.length;
            setPhaseIndex(nextIndex);
            return BREATH_PHASES[nextIndex].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phaseIndex]);

  const currentPhase = BREATH_PHASES[phaseIndex];

  return (
    <div className="breathing-card flex flex-col items-center justify-center p-10 md:p-14 space-y-12 h-full">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-normal text-olive mb-3">箱式呼吸法</h2>
        <p className="text-sage text-sm md:text-base leading-relaxed font-sans mb-6">
          跟隨圓圈律動調節神經系統。
        </p>
        {!isActive && (
          <img 
            src="https://picsum.photos/seed/meditation/400/150?blur=2" 
            alt="Serene nature" 
            referrerPolicy="no-referrer"
            className="w-full h-24 object-cover rounded-2xl opacity-40 mix-blend-multiply grayscale mb-4"
          />
        )}
      </div>

      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Outer Circle - Dashed as per theme */}
        <div className="absolute inset-0 border border-dashed border-sage/40 rounded-full" />
        
        {/* Breathing Circle - Inner */}
        <motion.div
          animate={
            isActive
              ? {
                  scale: currentPhase.action === "inhale" ? 1 : 
                         currentPhase.action === "exhale" ? 0.75 : 
                         phaseIndex === 1 ? 1 : 0.75,
                }
              : { scale: 0.75 }
          }
          transition={{
            duration: currentPhase.duration,
            ease: "easeInOut",
          }}
          className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-sage opacity-80 flex flex-col items-center justify-center text-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase.text + (isActive ? "" : "idle")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              {!isActive ? (
                <Play className="w-8 h-8 mb-4 opacity-50" />
              ) : (
                <currentPhase.icon className={`w-10 h-10 mb-4 ${currentPhase.action === 'inhale' ? 'animate-bounce' : currentPhase.action === 'exhale' ? 'animate-bounce [animation-direction:reverse]' : ''}`} />
              )}
              
              <span className="text-xl md:text-2xl tracking-widest font-normal">
                {isActive ? currentPhase.text : "準備開始"}
              </span>
              {isActive && (
                <span className="text-[10px] md:text-xs uppercase mt-2 opacity-80 font-sans">
                  {currentPhase.duration} 秒
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) {
              setPhaseIndex(0);
              setTimeLeft(BREATH_PHASES[0].duration);
            }
          }}
          className="px-10 py-3 bg-olive text-white rounded-full text-base font-normal tracking-wide transition-all hover:bg-stone hover:-translate-y-0.5 active:translate-y-0"
        >
          {isActive ? "停止練習" : "開始正念呼吸"}
        </button>
        
        {isActive && (
          <p className="text-sage text-xs uppercase tracking-widest font-sans">
            當前週期：{phaseIndex + 1} / {BREATH_PHASES.length}
          </p>
        )}
      </div>

      {/* Instructional Section with icons */}
      {!isActive && (
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-sage/10 w-full max-w-xs">
          <div className="flex flex-col items-center space-y-2 opacity-60">
            <div className="w-12 h-12 rounded-full border border-sage/30 flex items-center justify-center">
              <ChevronUp className="w-6 h-6 text-olive" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-sans">吸氣：向上律動</span>
          </div>
          <div className="flex flex-col items-center space-y-2 opacity-60">
            <div className="w-12 h-12 rounded-full border border-sage/30 flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-olive" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-sans">吐氣：向下收縮</span>
          </div>
        </div>
      )}
    </div>
  );
}
