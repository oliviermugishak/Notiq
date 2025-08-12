"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, FileText, Folder, Clock, X } from "lucide-react"
import { useFile } from "@/contexts/file-context"
import { formatDistanceToNow } from "date-fns"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { recentFiles, openRecentFile, removeFromRecent, currentFile } = useFile()

  if (isCollapsed) {
    return (
      <div className="w-12 border-r bg-muted/30 flex flex-col">
        <Button variant="ghost" size="sm" className="h-12 w-full" onClick={() => setIsCollapsed(false)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-64 border-r bg-muted/30 flex flex-col">
      <div className="h-12 border-b flex items-center justify-between px-4">
        <span className="font-medium text-sm">Explorer</span>
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(true)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Recent Files
            </div>

            {recentFiles.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
                No recent files
                <br />
                Open a file to get started
              </div>
            ) : (
              recentFiles.map((file) => (
                <div key={file.path} className="group relative">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-auto p-2 ${currentFile?.path === file.path ? "bg-accent" : ""}`}
                    onClick={() => openRecentFile(file)}
                  >
                    <div className="flex items-start gap-2 w-full">
                      <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="truncate text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(file.lastModified), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromRecent(file.path)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="border-t p-2">
        <div className="text-xs text-muted-foreground px-2 py-1">
          {recentFiles.length} recent file{recentFiles.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  )
}
