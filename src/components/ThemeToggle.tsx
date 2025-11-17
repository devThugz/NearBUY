import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
export default function ThemeToggle() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <motion.button whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }} onClick={toggleTheme} className="relative p-2 rounded-lg bg-m2m-bg-card border-2 border-m2m-divider hover:border-m2m-accent-blue transition-all" aria-label="Toggle theme">
      <motion.div initial={false} animate={{
      rotate: theme === 'dark' ? 0 : 180,
      scale: theme === 'dark' ? 1 : 0
    }} transition={{
      duration: 0.3
    }} className="absolute inset-0 flex items-center justify-center">
        <MoonIcon className="w-5 h-5 text-m2m-accent-blue" />
      </motion.div>
      <motion.div initial={false} animate={{
      rotate: theme === 'light' ? 0 : -180,
      scale: theme === 'light' ? 1 : 0
    }} transition={{
      duration: 0.3
    }} className="absolute inset-0 flex items-center justify-center">
        <SunIcon className="w-5 h-5 text-m2m-accent-orange" />
      </motion.div>
      <div className="w-5 h-5 opacity-0">
        <SunIcon className="w-5 h-5" />
      </div>
    </motion.button>;
}