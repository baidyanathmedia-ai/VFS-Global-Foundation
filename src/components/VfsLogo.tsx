import React from 'react';

interface VfsLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full' | 'auto';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shieldOnly?: boolean;
}

export const VfsLogo: React.FC<VfsLogoProps> = ({
  className = '',
  variant = 'auto',
  showSubtitle = true,
  size = 'md',
  shieldOnly = false,
}) => {
  // Dimension scales
  const sizeMap = {
    sm: { shield: 'w-8 h-9', title: 'text-sm', academy: 'text-base', sub: 'text-[9px]' },
    md: { shield: 'w-10 h-11 sm:w-11 sm:h-12', title: 'text-base sm:text-lg', academy: 'text-lg sm:text-xl', sub: 'text-[10px] sm:text-[11px]' },
    lg: { shield: 'w-14 h-16', title: 'text-xl sm:text-2xl', academy: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    xl: { shield: 'w-20 h-24', title: 'text-3xl', academy: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];
  const isExplicitDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official VFS Academy Shield Emblem */}
      <div className={`relative ${currentSize.shield} flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
        <svg 
          viewBox="0 0 100 115" 
          className="w-full h-full drop-shadow-sm" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Shield Outline */}
          <path
            d="M50 4L88 18V56C88 82 50 108 50 108C50 108 12 82 12 56V18L50 4Z"
            fill="none"
            stroke="#2563EB"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Inner Navy Shield Fill */}
          <path
            d="M50 10L82 22V55C82 78 50 101 50 101C50 101 18 78 18 55V22L50 10Z"
            fill="#0F172A"
            className="fill-blue-950"
          />

          {/* Graduation Mortarboard Cap */}
          {/* Cap Crown / Underneath */}
          <path
            d="M32 40C32 40 40 48 50 48C60 48 68 40 68 40V49C68 53 60 57 50 57C40 57 32 53 32 49V40Z"
            fill="#3B82F6"
          />
          {/* Cap Diamond Top */}
          <polygon
            points="50,20 80,33 50,45 20,33"
            fill="#FFFFFF"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Tassel Button & String */}
          <circle cx="50" cy="32.5" r="2.5" fill="#1D4ED8" />
          <path
            d="M50 33C57 36 74 38 74 54"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="74" cy="54" r="2" fill="#93C5FD" />

          {/* Center White Medallion */}
          <circle 
            cx="50" 
            cy="75" 
            r="20" 
            fill="#FFFFFF" 
            stroke="#2563EB" 
            strokeWidth="2" 
          />

          {/* 'vfs.' Inscription inside Medallion */}
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontFamily="Georgia, serif, system-ui"
            fontSize="18"
            fontStyle="italic"
            fontWeight="bold"
            fill="#0F172A"
            letterSpacing="-0.5"
          >
            vfs.
          </text>
        </svg>
      </div>

      {/* Official Typography Wordmark (unless shieldOnly) */}
      {!shieldOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex flex-col">
            <span 
              className={`font-black tracking-wider uppercase ${currentSize.title} ${
                isExplicitDark 
                  ? 'text-white' 
                  : variant === 'light' 
                    ? 'text-slate-900' 
                    : 'text-slate-900 dark:text-white'
              }`}
              style={{ letterSpacing: '0.08em' }}
            >
              VFS GLOBAL
            </span>
            <span 
              className={`font-black tracking-tight uppercase text-blue-600 dark:text-blue-400 ${currentSize.academy}`}
              style={{ letterSpacing: '0.02em', marginTop: '-1px' }}
            >
              ACADEMY
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[10px] sm:text-[11px] font-semibold ${
                isExplicitDark 
                  ? 'text-slate-400' 
                  : variant === 'light' 
                    ? 'text-slate-500' 
                    : 'text-slate-500 dark:text-slate-400'
              }`}>
                Under VFS Global Foundation
              </span>
              <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                STPI Deoghar
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
