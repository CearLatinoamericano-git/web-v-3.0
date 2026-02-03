import { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  colorVariant: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Variante fija: solo Azul CEAR Institucional V2
  const colorVariant = 'blue';

  return (
    <ThemeContext.Provider value={{ colorVariant }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
