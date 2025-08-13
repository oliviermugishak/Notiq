"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useFile } from "@/contexts/file-context"
import { useTheme } from "@/contexts/theme-context"
import { previewThemes } from "@/components/preview-themes"
import { FolderOpen, Save, Plus, Palette, Eye, EyeOff, Download } from "lucide-react"

interface Command {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action: () => void
  keywords: string[]
  shortcut?: string
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onTogglePreview: () => void
  showPreview: boolean
}

export function CommandPalette({ isOpen, onClose, onTogglePreview, showPreview }: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { newFile, openFile, saveFile, saveAsFile } = useFile()
  const { setTheme, customThemes } = useTheme()

  const commands: Command[] = [
    {
      id: "new-file",
      title: "New File",
      description: "Create a new markdown file",
      icon: <Plus className="h-4 w-4" />,
      action: () => {
        newFile()
        onClose()
      },
      keywords: ["new", "create", "file"],
      shortcut: "Ctrl+N",
    },
    {
      id: "open-file",
      title: "Open File",
      description: "Open an existing markdown file",
      icon: <FolderOpen className="h-4 w-4" />,
      action: () => {
        openFile()
        onClose()
      },
      keywords: ["open", "file", "load"],
      shortcut: "Ctrl+O",
    },
    {
      id: "save-file",
      title: "Save File",
      description: "Save the current file",
      icon: <Save className="h-4 w-4" />,
      action: () => {
        saveFile()
        onClose()
      },
      keywords: ["save", "file"],
      shortcut: "Ctrl+S",
    },
    {
      id: "save-as",
      title: "Save As",
      description: "Save the file with a new name",
      icon: <Download className="h-4 w-4" />,
      action: () => {
        saveAsFile()
        onClose()
      },
      keywords: ["save", "as", "export"],
      shortcut: "Ctrl+Shift+S",
    },
    {
      id: "toggle-preview",
      title: showPreview ? "Hide Preview" : "Show Preview",
      description: showPreview ? "Hide the markdown preview" : "Show the markdown preview",
      icon: showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
      action: () => {
        onTogglePreview()
        onClose()
      },
      keywords: ["preview", "toggle", "view"],
      shortcut: "Ctrl+P",
    },
    ...previewThemes.map((theme) => ({
      id: `theme-${theme.id}`,
      title: `Switch to ${theme.name}`,
      description: `Change theme to ${theme.name}`,
      icon: <Palette className="h-4 w-4" />,
      action: () => {
        setTheme(theme.id)
        onClose()
      },
      keywords: ["theme", theme.name.toLowerCase(), "switch"],
    })),
    ...customThemes.map((theme) => ({
      id: `theme-${theme.id}`,
      title: `Switch to ${theme.name}`,
      description: `Change theme to ${theme.name}`,
      icon: <Palette className="h-4 w-4" />,
      action: () => {
        setTheme(theme.id)
        onClose()
      },
      keywords: ["theme", theme.name.toLowerCase(), "switch", "custom"],
    })),
  ]

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase()
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.keywords.some((keyword) => keyword.includes(searchLower))
    )
  })

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
          break
        case "Enter":
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    },
    [isOpen, filteredCommands, selectedIndex, onClose],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  useEffect(() => {
    if (isOpen) {
      setSearch("")
      setSelectedIndex(0)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <div className="border-b p-4">
          <Input
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0 text-lg"
            autoFocus
          />
        </div>

        <ScrollArea className="max-h-96">
          <div className="p-2">
            {filteredCommands.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No commands found</div>
            ) : (
              filteredCommands.map((command, index) => (
                <div
                  key={command.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    index === selectedIndex ? "bg-accent" : "hover:bg-accent/50"
                  }`}
                  onClick={command.action}
                >
                  {command.icon}
                  <div className="flex-1">
                    <div className="font-medium">{command.title}</div>
                    <div className="text-sm text-muted-foreground">{command.description}</div>
                  </div>
                  {command.shortcut && (
                    <Badge variant="outline" className="text-xs">
                      {command.shortcut}
                    </Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
