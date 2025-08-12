"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useImage } from "@/contexts/image-context"
import { ImageIcon, Trash2, Copy, Download } from "lucide-react"
import { formatBytes } from "@/lib/format"

interface ImageManagerProps {
  onInsertImage?: (imageId: string, imageName: string) => void
}

export function ImageManager({ onInsertImage }: ImageManagerProps) {
  const { images, removeImage } = useImage()
  const [isOpen, setIsOpen] = useState(false)

  const handleCopyMarkdown = (image: { id: string; name: string }) => {
    const markdown = `![${image.name}](${image.id})`
    navigator.clipboard.writeText(markdown)
  }

  const handleDownloadImage = (image: { url: string; name: string }) => {
    const a = document.createElement("a")
    a.href = image.url
    a.download = image.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleInsertImage = (image: { id: string; name: string }) => {
    if (onInsertImage) {
      onInsertImage(image.id, image.name)
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <ImageIcon className="h-4 w-4 mr-2" />
          Images ({images.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Image Manager</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh]">
          {images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Images Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Drag and drop images into the editor to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="truncate text-sm font-medium" title={image.name}>
                        {image.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {formatBytes(image.size)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {image.type.split("/")[1].toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        {onInsertImage && (
                          <Button size="sm" variant="outline" onClick={() => handleInsertImage(image)}>
                            Insert
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyMarkdown(image)}
                          title="Copy markdown"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDownloadImage(image)} title="Download">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => removeImage(image.id)} title="Delete">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
