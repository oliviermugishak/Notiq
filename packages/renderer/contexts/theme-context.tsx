"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type PreviewTheme, previewThemes } from "@/components/preview-themes"

interface ThemeContextType {
  currentTheme: PreviewTheme
  setTheme: (themeId: string) => void
  customThemes: PreviewTheme[]
  addCustomTheme: (theme: PreviewTheme) => void
  removeCustomTheme: (themeId: string) => void
  exportTheme: (themeId: string) => string
  importTheme: (themeJson: string) => boolean
  applyThemeVariables: (theme: PreviewTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<PreviewTheme>(previewThemes[0])
  const [customThemes, setCustomThemes] = useState<PreviewTheme[]>([])

  // Load saved theme and custom themes from localStorage
  useEffect(() => {
    const savedThemeId = localStorage.getItem("notiq-theme")
    const savedCustomThemes = localStorage.getItem("notiq-custom-themes")

    if (savedCustomThemes) {
      try {
        const parsed = JSON.parse(savedCustomThemes)
        setCustomThemes(parsed)
      } catch (error) {
        console.error("Failed to load custom themes:", error)
      }
    }

    if (savedThemeId) {
      const allThemes = [...previewThemes, ...customThemes]
      const theme = allThemes.find((t) => t.id === savedThemeId) || previewThemes[0]
      setCurrentTheme(theme)
      applyThemeVariables(theme)
    }
  }, [])

  const setTheme = (themeId: string) => {
    const allThemes = [...previewThemes, ...customThemes]
    const theme = allThemes.find((t) => t.id === themeId) || previewThemes[0]
    setCurrentTheme(theme)
    applyThemeVariables(theme)
    localStorage.setItem("notiq-theme", themeId)
  }

  const addCustomTheme = (theme: PreviewTheme) => {
    const newCustomThemes = [...customThemes, theme]
    setCustomThemes(newCustomThemes)
    localStorage.setItem("notiq-custom-themes", JSON.stringify(newCustomThemes))
  }

  const removeCustomTheme = (themeId: string) => {
    const newCustomThemes = customThemes.filter((t) => t.id !== themeId)
    setCustomThemes(newCustomThemes)
    localStorage.setItem("notiq-custom-themes", JSON.stringify(newCustomThemes))
  }

  const exportTheme = (themeId: string): string => {
    const allThemes = [...previewThemes, ...customThemes]
    const theme = allThemes.find((t) => t.id === themeId)
    if (!theme) throw new Error("Theme not found")
    return JSON.stringify(theme, null, 2)
  }

  const importTheme = (themeJson: string): boolean => {
    try {
      const theme = JSON.parse(themeJson) as PreviewTheme
      if (!theme.id || !theme.name || !theme.styles) {
        throw new Error("Invalid theme format")
      }
      addCustomTheme(theme)
      return true
    } catch (error) {
      console.error("Failed to import theme:", error)
      return false
    }
  }

  const applyThemeVariables = (theme: PreviewTheme) => {
    const root = document.documentElement
    root.style.setProperty("--theme-background", theme.styles.background)
    root.style.setProperty("--theme-text", theme.styles.text)
    root.style.setProperty("--theme-heading", theme.styles.heading)
    root.style.setProperty("--theme-link", theme.styles.link)
    root.style.setProperty("--theme-code", theme.styles.code)
    root.style.setProperty("--theme-code-background", theme.styles.codeBackground)
    root.style.setProperty("--theme-blockquote", theme.styles.blockquote)
    root.style.setProperty("--theme-blockquote-border", theme.styles.blockquoteBorder)
    root.style.setProperty("--theme-border", theme.styles.border)
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        customThemes,
        addCustomTheme,
        removeCustomTheme,
        exportTheme,
        importTheme,
        applyThemeVariables,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
