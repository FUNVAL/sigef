import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full funval-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-funval-blue">FUNVAL</h1>
            <p className="text-xs text-muted-foreground">Internacional</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="h-9 w-9"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}