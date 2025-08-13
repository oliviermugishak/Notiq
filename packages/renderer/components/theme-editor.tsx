"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme-context"
import type { PreviewTheme } from "@/components/preview-themes"
import { Palette, Download, Upload, Plus, Trash2 } from "lucide-react"

export function ThemeEditor() {
  const { currentTheme, customThemes, addCustomTheme, removeCustomTheme, exportTheme, importTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [newTheme, setNewTheme] = useState<PreviewTheme>({
    name: "Custom Theme",
    id: `custom-${Date.now()}`,
    styles: { ...currentTheme.styles },
  })
  const [importJson, setImportJson] = useState("")

  const handleCreateTheme = () => {
    addCustomTheme(newTheme)
    setNewTheme({
      name: "Custom Theme",
      id: `custom-${Date.now()}`,
      styles: { ...currentTheme.styles },
    })
    setIsOpen(false)
  }

  const handleExportTheme = () => {
    const json = exportTheme(currentTheme.id)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentTheme.name.toLowerCase().replace(/\s+/g, "-")}-theme.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportTheme = () => {
    if (importTheme(importJson)) {
      setImportJson("")
      setIsOpen(false)
    }
  }

  const updateThemeStyle = (key: keyof PreviewTheme["styles"], value: string) => {
    setNewTheme((prev) => ({
      ...prev,
      styles: {
        ...prev.styles,
        [key]: value,
      },
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Palette className="h-4 w-4 mr-2" />
          Theme Editor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Theme Editor</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create Theme</TabsTrigger>
            <TabsTrigger value="manage">Manage Themes</TabsTrigger>
            <TabsTrigger value="import-export">Import/Export</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme-name">Theme Name</Label>
                  <Input
                    id="theme-name"
                    value={newTheme.name}
                    onChange={(e) => setNewTheme((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Colors</Label>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="background">Background</Label>
                      <div className="flex gap-2">
                        <Input
                          id="background"
                          value={newTheme.styles.background}
                          onChange={(e) => updateThemeStyle("background", e.target.value)}
                        />
                        <input
                          type="color"
                          value={newTheme.styles.background}
                          onChange={(e) => updateThemeStyle("background", e.target.value)}
                          className="w-10 h-10 rounded border"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="text">Text</Label>
                      <div className="flex gap-2">
                        <Input
                          id="text"
                          value={newTheme.styles.text}
                          onChange={(e) => updateThemeStyle("text", e.target.value)}
                        />
                        <input
                          type="color"
                          value={newTheme.styles.text}
                          onChange={(e) => updateThemeStyle("text", e.target.value)}
                          className="w-10 h-10 rounded border"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="heading">Heading</Label>
                      <div className="flex gap-2">
                        <Input
                          id="heading"
                          value={newTheme.styles.heading}
                          onChange={(e) => updateThemeStyle("heading", e.target.value)}
                        />
                        <input
                          type="color"
                          value={newTheme.styles.heading}
                          onChange={(e) => updateThemeStyle("heading", e.target.value)}
                          className="w-10 h-10 rounded border"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="link">Link</Label>
                      <div className="flex gap-2">
                        <Input
                          id="link"
                          value={newTheme.styles.link}
                          onChange={(e) => updateThemeStyle("link", e.target.value)}
                        />
                        <input
                          type="color"
                          value={newTheme.styles.link}
                          onChange={(e) => updateThemeStyle("link", e.target.value)}
                          className="w-10 h-10 rounded border"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="code">Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="code"
                          value={newTheme.styles.code}
                          onChange={(e) => updateThemeStyle("code", e.target.value)}
                        />
                        <input
                          type="color"
                          value={newTheme.styles.code}
                          onChange={(e) => updateThemeStyle("code", e.target.value)}
                          className="w-10 h-10 rounded border"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="code-background">Code Background</Label>
                      <div className="flex gap-2">
                        <Input
                          id="code-background"
                          value={newTheme.styles.codeBackground}
                          onChange={(e) => updateThemeStyle("codeBackground", e.target.value)}
                        />
                        <input
                          type="color"
                          value={newTheme.styles.codeBackground}
                          onChange={(e) => updateThemeStyle("codeBackground", e.target.value)}
                          className="w-10 h-10 rounded border"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleCreateTheme} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Theme
                </Button>
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <Card style={{ backgroundColor: newTheme.styles.background, color: newTheme.styles.text }}>
                  <CardHeader>
                    <CardTitle style={{ color: newTheme.styles.heading }}>Sample Heading</CardTitle>
                    <CardDescription style={{ color: newTheme.styles.text }}>
                      This is how your theme will look
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>
                      Regular paragraph text with{" "}
                      <a href="#" style={{ color: newTheme.styles.link }}>
                        a link
                      </a>
                      .
                    </p>
                    <code
                      style={{
                        backgroundColor: newTheme.styles.codeBackground,
                        color: newTheme.styles.code,
                        padding: "2px 4px",
                        borderRadius: "3px",
                      }}
                    >
                      inline code
                    </code>
                    <div
                      style={{
                        borderLeft: `4px solid ${newTheme.styles.blockquoteBorder}`,
                        backgroundColor: newTheme.styles.codeBackground,
                        padding: "8px 12px",
                        color: newTheme.styles.blockquote,
                      }}
                    >
                      This is a blockquote
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <div className="grid gap-4">
              {customThemes.map((theme) => (
                <Card key={theme.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{theme.name}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => removeCustomTheme(theme.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {Object.entries(theme.styles)
                        .slice(0, 6)
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: value }}
                            title={`${key}: ${value}`}
                          />
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {customThemes.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No custom themes yet. Create one in the "Create Theme" tab.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="import-export" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Export Current Theme</CardTitle>
                  <CardDescription>Download the current theme as a JSON file</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleExportTheme} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export {currentTheme.name}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Import Theme</CardTitle>
                  <CardDescription>Import a theme from JSON</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    placeholder="Paste theme JSON here..."
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleImportTheme} className="w-full" disabled={!importJson.trim()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Theme
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
