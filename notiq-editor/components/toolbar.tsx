"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, Palette, FolderOpen, Save, Eye, EyeOff, Plus, Download, BarChart3 } from "lucide-react"
import { ThemeEditor } from "@/components/theme-editor"
import { ImageManager } from "@/components/image-manager"
import { SettingsPanel } from "@/components/settings-panel"
import { useTheme } from "@/contexts/theme-context"
import { useFile } from "@/contexts/file-context"
import { previewThemes } from "@/components/preview-themes"

interface ToolbarProps {
  showPreview?: boolean
  onTogglePreview?: () => void
  onInsertImage?: (imageId: string, imageName: string) => void
  onToggleStats?: () => void
  showStats?: boolean
  autoSave?: boolean
  onAutoSaveChange?: (enabled: boolean) => void
  fontSize?: string
  onFontSizeChange?: (size: string) => void
  lineHeight?: string
  onLineHeightChange?: (height: string) => void
}

export function Toolbar({
  showPreview = true,
  onTogglePreview,
  onInsertImage,
  onToggleStats,
  showStats = false,
  autoSave = true,
  onAutoSaveChange,
  fontSize = "14px",
  onFontSizeChange,
  lineHeight = "1.6",
  onLineHeightChange,
}: ToolbarProps) {
  const { currentTheme, setTheme, customThemes } = useTheme()
  const { currentFile, isModified, openFile, saveFile, saveAsFile, newFile, hasFileSystemAccess } = useFile()
  const allThemes = [...previewThemes, ...customThemes]

  const handleSave = () => {
    if (currentFile?.handle || hasFileSystemAccess) {
      saveFile()
    } else {
      saveAsFile()
    }
  }

  return (
    <div className="h-12 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">Notiq</span>
        </div>

        <div className="h-6 w-px bg-border mx-2" />

        <Button variant="ghost" size="sm" onClick={newFile}>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>

        <Button variant="ghost" size="sm" onClick={openFile}>
          <FolderOpen className="h-4 w-4 mr-2" />
          Open
        </Button>

        <Button variant="ghost" size="sm" onClick={handleSave} disabled={!currentFile}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" disabled={!currentFile}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={saveAsFile}>Save As...</DropdownMenuItem>
            <DropdownMenuItem onClick={() => saveFile()}>Download Copy</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ImageManager onInsertImage={onInsertImage} />

        {onTogglePreview && (
          <Button variant="ghost" size="sm" onClick={onTogglePreview}>
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Preview
              </>
            )}
          </Button>
        )}

        {/* Added statistics toggle button */}
        {onToggleStats && (
          <Button variant="ghost" size="sm" onClick={onToggleStats}>
            <BarChart3 className="h-4 w-4 mr-2" />
            {showStats ? "Hide Stats" : "Show Stats"}
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {currentFile?.name || "Untitled.md"}
          {isModified && " •"}
          {autoSave && isModified && <span className="ml-1 text-xs text-green-600">Auto-saving...</span>}
        </span>

        {/* Added settings panel */}
        <SettingsPanel
          autoSave={autoSave || false}
          onAutoSaveChange={onAutoSaveChange || (() => {})}
          fontSize={fontSize}
          onFontSizeChange={onFontSizeChange || (() => {})}
          lineHeight={lineHeight}
          onLineHeightChange={onLineHeightChange || (() => {})}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Palette className="h-4 w-4 mr-2" />
              {currentTheme.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {allThemes.map((theme) => (
              <DropdownMenuItem key={theme.id} onClick={() => setTheme(theme.id)}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: theme.styles.background }} />
                  {theme.name}
                  {theme.id === currentTheme.id && " ✓"}
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <div className="w-full">
                <ThemeEditor />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
