'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function MacWindow({ title, children, className }: MacWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col overflow-hidden bg-macos-card",
        "shadow-macos border border-macos-border/50",
        "rounded-[var(--radius-macos-lg)]",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 glass-sidebar border-b border-macos-border/50 select-none relative">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-macos-red hover:brightness-90 cursor-pointer transition-all" />
          <div className="w-3 h-3 rounded-full bg-macos-yellow hover:brightness-90 cursor-pointer transition-all" />
          <div className="w-3 h-3 rounded-full bg-macos-green hover:brightness-90 cursor-pointer transition-all" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-macos-muted-fg">
          {title}
        </span>
      </div>
      {children}
    </motion.div>
  );
}
