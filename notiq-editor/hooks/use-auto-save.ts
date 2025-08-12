"use client"

import { useEffect, useRef } from "react"

export function useAutoSave(content: string, onSave: () => void, enabled = true, delay = 2000) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastSavedContent = useRef(content)

  useEffect(() => {
    if (!enabled || content === lastSavedContent.current) {
      return
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      onSave()
      lastSavedContent.current = content
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [content, onSave, enabled, delay])

  // Update last saved content when content changes externally
  useEffect(() => {
    lastSavedContent.current = content
  }, [content])
}
