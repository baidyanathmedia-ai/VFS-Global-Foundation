import React from 'react';
import { 
  Sparkles, 
  Award, 
  GraduationCap, 
  Compass, 
  Shield, 
  Star, 
  BookOpen,
  Building2,
  CheckCircle2
} from 'lucide-react';

export type DividerVariant = 
  | 'glow-line' 
  | 'diamond-crest' 
  | 'wave' 
  | 'curve' 
  | 'slanted' 
  | 'badge-crest'
  | 'subtle-fade';

export type DividerTone = 
  | 'dark-to-light' 
  | 'light-to-dark' 
  | 'light-to-slate' 
  | 'slate-to-light' 
  | 'slate-to-dark'
  | 'dark-to-slate'
  | 'neutral'
  | 'brand-gradient';

export interface SectionDividerProps {
  id?: string;
  variant?: DividerVariant;
  tone?: DividerTone;
  accent?: 'blue' | 'emerald' | 'cyan' | 'purple' | 'amber' | 'neutral';
  icon?: React.ReactNode;
  badgeText?: string;
  className?: string;
  flip?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  id,
  variant = 'diamond-crest',
  tone = 'neutral',
  accent = 'blue',
  icon,
  badgeText,
  className = '',
  flip = false
}) => {
  // Accent color mappings for glow and icons
  const accentGlow = {
    blue: 'from-blue-500/20 via-blue-500/60 to-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-400/40 dark:border-blue-500/40',
    emerald: 'from-emerald-500/20 via-emerald-500/60 to-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-400/40 dark:border-emerald-500/40',
    cyan: 'from-cyan-500/20 via-cyan-500/60 to-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-400/40 dark:border-cyan-500/40',
    purple: 'from-purple-500/20 via-purple-500/60 to-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-400/40 dark:border-purple-500/40',
    amber: 'from-amber-500/20 via-amber-500/60 to-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-400/40 dark:border-amber-500/40',
    neutral: 'from-slate-400/20 via-slate-400/50 to-slate-400/20 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700'
  }[accent];

  const accentLineGradient = {
    blue: 'via-blue-500/40 dark:via-blue-400/50',
    emerald: 'via-emerald-500/40 dark:via-emerald-400/50',
    cyan: 'via-cyan-500/40 dark:via-cyan-400/50',
    purple: 'via-purple-500/40 dark:via-purple-400/50',
    amber: 'via-amber-500/40 dark:via-amber-400/50',
    neutral: 'via-slate-300 dark:via-slate-700'
  }[accent];

  // Render Wave Transition (Smooth fluid SVG contour)
  if (variant === 'wave') {
    let svgFill = 'text-white dark:text-slate-950';
    let bgContainer = 'bg-transparent';

    if (tone === 'dark-to-light') {
      bgContainer = 'bg-slate-950';
      svgFill = 'text-white dark:text-slate-950';
    } else if (tone === 'light-to-dark') {
      bgContainer = 'bg-white dark:bg-slate-950';
      svgFill = 'text-slate-950';
    } else if (tone === 'light-to-slate') {
      bgContainer = 'bg-white dark:bg-slate-950';
      svgFill = 'text-slate-50 dark:text-slate-900/60';
    } else if (tone === 'slate-to-light') {
      bgContainer = 'bg-slate-50 dark:bg-slate-900/60';
      svgFill = 'text-white dark:text-slate-950';
    } else if (tone === 'slate-to-dark') {
      bgContainer = 'bg-slate-50 dark:bg-slate-900/60';
      svgFill = 'text-slate-950';
    } else if (tone === 'dark-to-slate') {
      bgContainer = 'bg-slate-950';
      svgFill = 'text-slate-50 dark:text-slate-900/60';
    }

    return (
      <div 
        id={id}
        className={`w-full overflow-hidden leading-none relative z-10 transition-colors duration-200 ${bgContainer} ${className}`}
        aria-hidden="true"
      >
        <svg
          className={`w-full h-8 sm:h-12 md:h-16 ${svgFill} transition-colors duration-200 ${flip ? 'rotate-180' : ''}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    );
  }

  // Render Curve Transition (Gentle arch SVG)
  if (variant === 'curve') {
    let svgFill = 'text-white dark:text-slate-950';
    let bgContainer = 'bg-transparent';

    if (tone === 'dark-to-light') {
      bgContainer = 'bg-slate-950';
      svgFill = 'text-white dark:text-slate-950';
    } else if (tone === 'light-to-dark') {
      bgContainer = 'bg-white dark:bg-slate-950';
      svgFill = 'text-slate-950';
    } else if (tone === 'light-to-slate') {
      bgContainer = 'bg-white dark:bg-slate-950';
      svgFill = 'text-slate-50 dark:text-slate-900/60';
    } else if (tone === 'slate-to-light') {
      bgContainer = 'bg-slate-50 dark:bg-slate-900/60';
      svgFill = 'text-white dark:text-slate-950';
    } else if (tone === 'slate-to-dark') {
      bgContainer = 'bg-slate-50 dark:bg-slate-900/60';
      svgFill = 'text-slate-950';
    } else if (tone === 'dark-to-slate') {
      bgContainer = 'bg-slate-950';
      svgFill = 'text-slate-50 dark:text-slate-900/60';
    }

    return (
      <div 
        id={id}
        className={`w-full overflow-hidden leading-none relative z-10 transition-colors duration-200 ${bgContainer} ${className}`}
        aria-hidden="true"
      >
        <svg
          className={`w-full h-6 sm:h-10 md:h-14 ${svgFill} transition-colors duration-200 ${flip ? 'rotate-180' : ''}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    );
  }

  // Render Slanted / Angled Transition (Crisp geometric slant)
  if (variant === 'slanted') {
    let svgFill = 'text-white dark:text-slate-950';
    let bgContainer = 'bg-transparent';

    if (tone === 'dark-to-light') {
      bgContainer = 'bg-slate-950';
      svgFill = 'text-white dark:text-slate-950';
    } else if (tone === 'light-to-dark') {
      bgContainer = 'bg-white dark:bg-slate-950';
      svgFill = 'text-slate-950';
    } else if (tone === 'light-to-slate') {
      bgContainer = 'bg-white dark:bg-slate-950';
      svgFill = 'text-slate-50 dark:text-slate-900/60';
    } else if (tone === 'slate-to-light') {
      bgContainer = 'bg-slate-50 dark:bg-slate-900/60';
      svgFill = 'text-white dark:text-slate-950';
    } else if (tone === 'slate-to-dark') {
      bgContainer = 'bg-slate-50 dark:bg-slate-900/60';
      svgFill = 'text-slate-950';
    } else if (tone === 'dark-to-slate') {
      bgContainer = 'bg-slate-950';
      svgFill = 'text-slate-50 dark:text-slate-900/60';
    }

    return (
      <div 
        id={id}
        className={`w-full overflow-hidden leading-none relative z-10 transition-colors duration-200 ${bgContainer} ${className}`}
        aria-hidden="true"
      >
        <svg
          className={`w-full h-6 sm:h-10 ${svgFill} transition-colors duration-200`}
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {flip ? (
            <path d="M0,60 L1200,0 L1200,60 Z" />
          ) : (
            <path d="M0,0 L1200,60 L0,60 Z" />
          )}
        </svg>
      </div>
    );
  }

  // Render Subtle Fade Transition
  if (variant === 'subtle-fade') {
    return (
      <div 
        id={id}
        className={`w-full h-12 sm:h-16 relative overflow-hidden pointer-events-none transition-colors duration-200 ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 dark:via-blue-400/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
      </div>
    );
  }

  // Render Badge Crest Divider (Hairline + pill badge with icon & text)
  if (variant === 'badge-crest') {
    return (
      <div 
        id={id}
        className={`relative py-6 sm:py-8 flex items-center justify-center overflow-hidden transition-colors duration-200 ${className}`}
      >
        {/* Left hairline gradient */}
        <div className={`flex-1 h-px bg-gradient-to-r from-transparent ${accentLineGradient} to-transparent max-w-xl`} />

        {/* Center Pill Badge */}
        <div className="mx-4 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 transition-colors">
          <span className={`p-1 rounded-full bg-slate-100 dark:bg-slate-800 ${accentGlow}`}>
            {icon || <Sparkles className="w-3.5 h-3.5" />}
          </span>
          {badgeText && <span>{badgeText}</span>}
        </div>

        {/* Right hairline gradient */}
        <div className={`flex-1 h-px bg-gradient-to-r from-transparent ${accentLineGradient} to-transparent max-w-xl`} />
      </div>
    );
  }

  // Render Glow Line Divider (Subtle glowing laser line with center diamond)
  if (variant === 'glow-line') {
    return (
      <div 
        id={id}
        className={`relative py-4 sm:py-6 flex items-center justify-center overflow-hidden transition-colors duration-200 ${className}`}
        aria-hidden="true"
      >
        {/* Background ambient subtle glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-4 bg-gradient-to-r from-transparent via-blue-500/15 dark:via-blue-400/20 to-transparent blur-md pointer-events-none" />

        {/* Left Gradient Line */}
        <div className={`flex-1 h-px bg-gradient-to-r from-transparent ${accentLineGradient} to-transparent max-w-2xl`} />

        {/* Central Geometric Diamond Emblem */}
        <div className="mx-3 flex items-center gap-1.5 text-slate-400 dark:text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="w-2.5 h-2.5 rotate-45 border border-blue-400/60 dark:border-blue-500/60 bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center shadow-2xs">
            <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Right Gradient Line */}
        <div className={`flex-1 h-px bg-gradient-to-r from-transparent ${accentLineGradient} to-transparent max-w-2xl`} />
      </div>
    );
  }

  // Default: Diamond Crest Divider (Refined hairline with dual mini diamonds & central emblem)
  return (
    <div 
      id={id}
      className={`relative py-5 sm:py-7 flex items-center justify-center overflow-hidden transition-colors duration-200 ${className}`}
      aria-hidden="true"
    >
      {/* Left Hairline Gradient */}
      <div className={`flex-1 h-px bg-gradient-to-r from-transparent ${accentLineGradient} to-transparent max-w-2xl`} />

      {/* Decorative Center Cluster */}
      <div className="mx-4 flex items-center gap-2">
        {/* Left decorative dot */}
        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

        {/* Left mini diamond */}
        <div className="w-1.5 h-1.5 rotate-45 bg-slate-400/70 dark:bg-slate-600" />

        {/* Center Crest / Icon Badge */}
        <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
          {icon || <Sparkles className="w-3.5 h-3.5" />}
        </div>

        {/* Right mini diamond */}
        <div className="w-1.5 h-1.5 rotate-45 bg-slate-400/70 dark:bg-slate-600" />

        {/* Right decorative dot */}
        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>

      {/* Right Hairline Gradient */}
      <div className={`flex-1 h-px bg-gradient-to-r from-transparent ${accentLineGradient} to-transparent max-w-2xl`} />
    </div>
  );
};
