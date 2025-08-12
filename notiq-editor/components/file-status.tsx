"use client"

import { useFile } from "@/contexts/file-context"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, HardDrive } from "lucide-react"

export function FileStatus() {
  const { currentFile, isModified, hasFileSystemAccess } = useFile()

  if (!currentFile) return null

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-t bg-muted/30">
      <div className="flex items-center gap-2 text-sm">
        <HardDrive className="h-4 w-4" />
        <span className="truncate max-w-48">{currentFile.path}</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {!hasFileSystemAccess && (
          <Badge variant="outline" className="text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Limited File Access
          </Badge>
        )}

        {isModified ? (
          <Badge variant="secondary" className="text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Modified
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Saved
          </Badge>
        )}
      </div>
    </div>
  )
}
