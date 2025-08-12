"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Keyboard, Palette, FileText } from "lucide-react"

interface SettingsPanelProps {
  autoSave: boolean
  onAutoSaveChange: (enabled: boolean) => void
  fontSize: string
  onFontSizeChange: (size: string) => void
  lineHeight: string
  onLineHeightChange: (height: string) => void
}

export function SettingsPanel({
  autoSave,
  onAutoSaveChange,
  fontSize,
  onFontSizeChange,
  lineHeight,
  onLineHeightChange,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const keyboardShortcuts = [
    { keys: "Ctrl+N", description: "New file" },
    { keys: "Ctrl+O", description: "Open file" },
    { keys: "Ctrl+S", description: "Save file" },
    { keys: "Ctrl+Shift+S", description: "Save as" },
    { keys: "Ctrl+P", description: "Toggle preview" },
    { keys: "Ctrl+K", description: "Command palette" },
    { keys: "Ctrl+/", description: "Toggle comment" },
    { keys: "Ctrl+B", description: "Bold text" },
    { keys: "Ctrl+I", description: "Italic text" },
    { keys: "Ctrl+U", description: "Underline text" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Editor Settings
                </CardTitle>
                <CardDescription>Customize your writing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Save</Label>
                    <div className="text-sm text-muted-foreground">Automatically save changes as you type</div>
                  </div>
                  <Switch checked={autoSave} onCheckedChange={onAutoSaveChange} />
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Font Size</Label>
                  <Select value={fontSize} onValueChange={onFontSizeChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12px">Small (12px)</SelectItem>
                      <SelectItem value="14px">Medium (14px)</SelectItem>
                      <SelectItem value="16px">Large (16px)</SelectItem>
                      <SelectItem value="18px">Extra Large (18px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Line Height</Label>
                  <Select value={lineHeight} onValueChange={onLineHeightChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.4">Compact (1.4)</SelectItem>
                      <SelectItem value="1.6">Normal (1.6)</SelectItem>
                      <SelectItem value="1.8">Relaxed (1.8)</SelectItem>
                      <SelectItem value="2.0">Loose (2.0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shortcuts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Keyboard Shortcuts
                </CardTitle>
                <CardDescription>Learn the keyboard shortcuts to work faster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {keyboardShortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm">{shortcut.description}</span>
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        {shortcut.keys}
                      </kbd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  About Notiq
                </CardTitle>
                <CardDescription>A beautiful, cross-platform Markdown editor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Version</h4>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time markdown preview</li>
                    <li>• Beautiful customizable themes</li>
                    <li>• Syntax highlighting for code blocks</li>
                    <li>• Math equation support with KaTeX</li>
                    <li>• Drag & drop image support</li>
                    <li>• File system integration</li>
                    <li>• Command palette</li>
                    <li>• Auto-save functionality</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Built with</h4>
                  <p className="text-sm text-muted-foreground">
                    React, TypeScript, CodeMirror 6, unified, remark, rehype, and Tailwind CSS
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Developer</h4>
                  <p className="text-sm text-muted-foreground">Kwizera Mugisha Olivier</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
