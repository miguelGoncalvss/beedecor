import React from 'react';

export const Logo = ({ className = "w-32 h-32" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Royal Purple Background Circle */}
      <div className="absolute inset-0 bg-purple-deep rounded-full shadow-xl" />
      
      {/* Bee Body */}
      <svg
        viewBox="0 0 100 100"
        className="relative z-10 w-4/5 h-4/5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wings */}
        <path
          d="M30 40C20 30 15 45 30 50M70 40C80 30 85 45 70 50"
          stroke="#C8E6F0"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-pulse"
        />
        <path
          d="M35 45C25 35 20 50 35 55M65 45C75 35 80 50 65 55"
          fill="#C8E6F0"
          fillOpacity="0.6"
        />
        
        {/* Antennae */}
        <path
          d="M45 35C45 25 40 20 35 20M55 35C55 25 60 20 65 20"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Head */}
        <circle cx="50" cy="40" r="8" fill="#111111" />
        
        {/* Body (Stripes) */}
        <path
          d="M50 48C40 48 35 60 35 70C35 80 40 85 50 85C60 85 65 80 65 70C65 60 60 48 50 48Z"
          fill="#F4B942"
        />
        <path
          d="M37 60H63M35 70H65M38 78H62"
          stroke="#111111"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Gold Accent (Sparkle) */}
        <circle cx="60" cy="35" r="2" fill="#F4B942" className="animate-ping" />
      </svg>
      
      {/* Text Ring (Optional visual flair) */}
      <div className="absolute inset-0 border-2 border-honey/20 rounded-full scale-110 animate-spin-slow" />
    </div>
  );
};

export const LogoText = () => (
  <div className="flex flex-col items-start leading-none">
    <span className="font-heading font-bold text-2xl tracking-tighter text-primary">Bee</span>
    <span className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Decoração e Arte</span>
  </div>
);
