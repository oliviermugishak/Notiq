"use client"

import { useEffect } from "react"

interface KeyboardShortcuts {
  onNew?: () => void
  onOpen?: () => void
  onSave?: () => void
  onSaveAs?: () => void
  onTogglePreview?: () => void
  onCommandPalette?: () => void
}

export function useKeyboardShortcuts({
  onNew,
  onOpen,
  onSave,
  onSaveAs,
  onTogglePreview,
  onCommandPalette,
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const isCtrl = e.ctrlKey || e.metaKey

      if (isCtrl) {
        switch (e.key.toLowerCase()) {
          case "n":
            e.preventDefault()
            onNew?.()
            break
          case "o":
            e.preventDefault()
            onOpen?.()
            break
          case "s":
            e.preventDefault()
            if (e.shiftKey) {
              onSaveAs?.()
            } else {
              onSave?.()
            }
            break
          case "p":
            e.preventDefault()
            onTogglePreview?.()
            break
          case "k":
            e.preventDefault()
            onCommandPalette?.()
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onNew, onOpen, onSave, onSaveAs, onTogglePreview, onCommandPalette])
}
