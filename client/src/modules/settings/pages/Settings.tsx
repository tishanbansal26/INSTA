import { useThemeStore } from '@/store/theme.store';
import { 
  Monitor, 
  Moon, 
  Sun, 
  Palette, 
  Layout, 
  Zap 
} from 'lucide-react';

export const Settings = () => {
  const { theme, setTheme, accent, setAccent, compactMode, setCompactMode, animations, setAnimations } = useThemeStore();

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      
      <div>
        <h1 className="text-2xl font-black text-text">Settings</h1>
        <p className="text-text-secondary mt-1">Manage your application preferences and theme.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
          <Palette className="w-5 h-5 text-primary" /> Appearance
        </h2>

        <div className="space-y-8">
          
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-bold text-text mb-3">Theme Preference</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <button 
                onClick={() => setTheme('light')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}
              >
                <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-primary' : 'text-text-secondary'}`} />
                <span className={`font-medium ${theme === 'light' ? 'text-primary' : 'text-text'}`}>Light Mode</span>
              </button>

              <button 
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}
              >
                <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-primary' : 'text-text-secondary'}`} />
                <span className={`font-medium ${theme === 'dark' ? 'text-primary' : 'text-text'}`}>Dark Mode</span>
              </button>

              <button 
                onClick={() => setTheme('system')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}
              >
                <Monitor className={`w-5 h-5 ${theme === 'system' ? 'text-primary' : 'text-text-secondary'}`} />
                <span className={`font-medium ${theme === 'system' ? 'text-primary' : 'text-text'}`}>System Sync</span>
              </button>
            </div>
          </div>

          {/* Accent Color Selection */}
          <div className="pt-6 border-t border-border">
            <label className="block text-sm font-bold text-text mb-3">Accent Color</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setAccent('blue')}
                className={`w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center transition-transform ${accent === 'blue' ? 'scale-110 ring-4 ring-blue-500/30' : 'hover:scale-105'}`}
              ></button>
              <button 
                onClick={() => setAccent('emerald')}
                className={`w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center transition-transform ${accent === 'emerald' ? 'scale-110 ring-4 ring-emerald-500/30' : 'hover:scale-105'}`}
              ></button>
              <button 
                onClick={() => setAccent('purple')}
                className={`w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center transition-transform ${accent === 'purple' ? 'scale-110 ring-4 ring-purple-500/30' : 'hover:scale-105'}`}
              ></button>
            </div>
            <p className="text-xs text-text-secondary mt-3">Changes the primary accent color across the application. (Preview feature)</p>
          </div>

          {/* Additional Toggles */}
          <div className="pt-6 border-t border-border space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layout className="w-5 h-5 text-text-secondary" />
                <div>
                  <p className="font-bold text-text text-sm">Compact Mode</p>
                  <p className="text-xs text-text-secondary">Reduce whitespace and padding for higher data density.</p>
                </div>
              </div>
              <button 
                onClick={() => setCompactMode(!compactMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${compactMode ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${compactMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-text-secondary" />
                <div>
                  <p className="font-bold text-text text-sm">Enable Animations</p>
                  <p className="text-xs text-text-secondary">Toggle micro-animations and transitions.</p>
                </div>
              </div>
              <button 
                onClick={() => setAnimations(!animations)}
                className={`w-12 h-6 rounded-full transition-colors relative ${animations ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${animations ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
