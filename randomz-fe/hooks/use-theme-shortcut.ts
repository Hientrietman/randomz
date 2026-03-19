"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function useThemeShortcut() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault()
        setTheme(theme === "dark" ? "light" : "dark")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [theme, setTheme])
}
