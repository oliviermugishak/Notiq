"use client"

import React from "react"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface FileInfo {
  name: string
  path: string
  handle?: FileSystemFileHandle
  lastModified: number
  content: string
}

interface FileContextType {
  currentFile: FileInfo | null
  recentFiles: FileInfo[]
  isModified: boolean
  openFile: () => Promise<void>
  saveFile: () => Promise<void>
  saveAsFile: () => Promise<void>
  newFile: () => void
  setContent: (content: string) => void
  addToRecent: (file: FileInfo) => void
  openRecentFile: (file: FileInfo) => void
  removeFromRecent: (path: string) => void
  hasFileSystemAccess: boolean
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export function useFile() {
  const context = useContext(FileContext)
  if (!context) {
    throw new Error("useFile must be used within a FileProvider")
  }
  return context
}

export function FileProvider({ children }: { children: ReactNode }) {
  const [currentFile, setCurrentFile] = useState<FileInfo | null>(null)
  const [recentFiles, setRecentFiles] = useState<FileInfo[]>([])
  const [isModified, setIsModified] = useState(false)
  const [hasFileSystemAccess] = useState(() => "showOpenFilePicker" in window)

  // Load recent files from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem("notiq-recent-files")
    if (saved) {
      try {
        setRecentFiles(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to load recent files:", error)
      }
    }
  }, [])

  const addToRecent = useCallback((file: FileInfo) => {
    setRecentFiles((prev) => {
      const filtered = prev.filter((f) => f.path !== file.path)
      const updated = [file, ...filtered].slice(0, 10) // Keep only 10 recent files
      localStorage.setItem("notiq-recent-files", JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromRecent = useCallback((path: string) => {
    setRecentFiles((prev) => {
      const updated = prev.filter((f) => f.path !== path)
      localStorage.setItem("notiq-recent-files", JSON.stringify(updated))
      return updated
    })
  }, [])

  const openFile = useCallback(async () => {
    if (!hasFileSystemAccess) {
      // Fallback for browsers without File System Access API
      const input = document.createElement("input")
      input.type = "file"
      input.accept = ".md,.markdown,.txt"
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const content = await file.text()
          const fileInfo: FileInfo = {
            name: file.name,
            path: file.name,
            lastModified: file.lastModified,
            content,
          }
          setCurrentFile(fileInfo)
          addToRecent(fileInfo)
          setIsModified(false)
        }
      }
      input.click()
      return
    }

    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Markdown files",
            accept: {
              "text/markdown": [".md", ".markdown"],
              "text/plain": [".txt"],
            },
          },
        ],
      })

      const file = await fileHandle.getFile()
      const content = await file.text()
      const fileInfo: FileInfo = {
        name: file.name,
        path: fileHandle.name,
        handle: fileHandle,
        lastModified: file.lastModified,
        content,
      }

      setCurrentFile(fileInfo)
      addToRecent(fileInfo)
      setIsModified(false)
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Failed to open file:", error)
      }
    }
  }, [hasFileSystemAccess, addToRecent])

  const saveFile = useCallback(async () => {
    if (!currentFile) return

    if (!hasFileSystemAccess || !currentFile.handle) {
      // Fallback: download file
      const blob = new Blob([currentFile.content], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = currentFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setIsModified(false)
      return
    }

    try {
      const writable = await currentFile.handle.createWritable()
      await writable.write(currentFile.content)
      await writable.close()
      setIsModified(false)

      // Update recent files
      const updatedFile = { ...currentFile, lastModified: Date.now() }
      setCurrentFile(updatedFile)
      addToRecent(updatedFile)
    } catch (error) {
      console.error("Failed to save file:", error)
    }
  }, [currentFile, hasFileSystemAccess, addToRecent])

  const saveAsFile = useCallback(async () => {
    if (!currentFile) return

    if (!hasFileSystemAccess) {
      // Fallback: download file with new name
      const fileName = prompt("Enter filename:", currentFile.name) || currentFile.name
      const blob = new Blob([currentFile.content], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      return
    }

    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: currentFile.name,
        types: [
          {
            description: "Markdown files",
            accept: {
              "text/markdown": [".md", ".markdown"],
            },
          },
        ],
      })

      const writable = await fileHandle.createWritable()
      await writable.write(currentFile.content)
      await writable.close()

      const updatedFile: FileInfo = {
        ...currentFile,
        name: fileHandle.name,
        path: fileHandle.name,
        handle: fileHandle,
        lastModified: Date.now(),
      }

      setCurrentFile(updatedFile)
      addToRecent(updatedFile)
      setIsModified(false)
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Failed to save file:", error)
      }
    }
  }, [currentFile, hasFileSystemAccess, addToRecent])

  const newFile = useCallback(() => {
    const fileInfo: FileInfo = {
      name: "Untitled.md",
      path: "Untitled.md",
      lastModified: Date.now(),
      content: "",
    }
    setCurrentFile(fileInfo)
    setIsModified(false)
  }, [])

  const setContent = useCallback((content: string) => {
    setCurrentFile((prev) => {
      if (!prev) return null
      const updated = { ...prev, content }
      setIsModified(updated.content !== prev.content)
      return updated
    })
  }, [])

  const openRecentFile = useCallback(
    async (file: FileInfo) => {
      if (hasFileSystemAccess && file.handle) {
        try {
          const currentFile = await file.handle.getFile()
          const content = await currentFile.text()
          const fileInfo: FileInfo = {
            ...file,
            content,
            lastModified: currentFile.lastModified,
          }
          setCurrentFile(fileInfo)
          setIsModified(false)
        } catch (error) {
          console.error("Failed to open recent file:", error)
          removeFromRecent(file.path)
        }
      } else {
        // For fallback mode, we can't reopen files
        console.warn("Cannot reopen file without File System Access API")
      }
    },
    [hasFileSystemAccess, removeFromRecent],
  )

  return (
    <FileContext.Provider
      value={{
        currentFile,
        recentFiles,
        isModified,
        openFile,
        saveFile,
        saveAsFile,
        newFile,
        setContent,
        addToRecent,
        openRecentFile,
        removeFromRecent,
        hasFileSystemAccess,
      }}
    >
      {children}
    </FileContext.Provider>
  )
}
