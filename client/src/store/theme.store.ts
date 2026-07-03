import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type Accent = 'blue' | 'emerald' | 'purple';

interface ThemeState {
  theme: Theme;
  accent: Accent;
  compactMode: boolean;
  animations: boolean;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  setCompactMode: (compact: boolean) => void;
  setAnimations: (enabled: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      accent: 'blue',
      compactMode: false,
      animations: true,
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
      setCompactMode: (compactMode) => set({ compactMode }),
      setAnimations: (animations) => set({ animations }),
    }),
    {
      name: 'insureflow-theme-storage',
    }
  )
);
