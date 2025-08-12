"use client"

import { useState, useCallback, useRef } from "react"
import { MarkdownEditor } from "@/components/markdown-editor"
import { MarkdownPreview } from "@/components/markdown-preview"
import { FormattingToolbar } from "@/components/formatting-toolbar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { FileText, Menu, Settings, HelpCircle } from "lucide-react"

export default function MarkdownPreviewApp() {
  const [markdown, setMarkdown] = useState("")
  const [showToolbar, setShowToolbar] = useState(false)
  const editorRef = useRef<any>(null)

  const handleMarkdownChange = useCallback((value: string) => {
    setMarkdown(value)
  }, [])

  const handleInsertMarkdown = useCallback((before: string, after = "", placeholder = "") => {
    if (editorRef.current) {
      editorRef.current.insertMarkdown(before, after, placeholder)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Desktop-style Navigation Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo and App Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Markdown Editor</h1>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Menu className="w-4 h-4 mr-2" />
              File
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              View
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Formatting Toolbar */}
      {showToolbar && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50">
          <FormattingToolbar onInsertMarkdown={handleInsertMarkdown} onClose={() => setShowToolbar(false)} />
        </div>
      )}

      {/* Editor and Preview */}
      <div className="flex-1 relative">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="relative h-full">
              {/* Floating Format Button */}
              <Button
                onClick={() => setShowToolbar(!showToolbar)}
                className="absolute top-4 right-4 z-10 shadow-lg"
                size="sm"
              >
                Format
              </Button>
              <MarkdownEditor
                ref={editorRef}
                value={markdown}
                onChange={handleMarkdownChange}
                placeholder="Start writing your markdown here..."
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <MarkdownPreview markdown={markdown} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
