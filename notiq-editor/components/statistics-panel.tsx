"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, BarChart3, Hash } from "lucide-react"

interface StatisticsPanelProps {
  markdown: string
}

export function StatisticsPanel({ markdown }: StatisticsPanelProps) {
  const stats = useMemo(() => {
    const text = markdown.replace(/[#*`_~[\]()]/g, "").replace(/\n+/g, " ")
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = markdown.length
    const charactersNoSpaces = markdown.replace(/\s/g, "").length
    const lines = markdown.split("\n").length
    const paragraphs = markdown.split(/\n\s*\n/).filter((p) => p.trim()).length

    // Reading time calculation (average 200 words per minute)
    const readingTimeMinutes = Math.ceil(words / 200)

    // Count headings
    const headings = (markdown.match(/^#{1,6}\s/gm) || []).length

    // Count images
    const images = (markdown.match(/!\[.*?\]$$.*?$$/g) || []).length

    // Count links
    const links = (markdown.match(/\[.*?\]$$.*?$$/g) || []).length

    // Count code blocks
    const codeBlocks = (markdown.match(/```[\s\S]*?```/g) || []).length

    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
      paragraphs,
      readingTimeMinutes,
      headings,
      images,
      links,
      codeBlocks,
    }
  }, [markdown])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Words
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.words.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Reading Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.readingTimeMinutes} min{stats.readingTimeMinutes !== 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Document Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Characters:</span>
              <span className="font-medium">{stats.characters.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">No spaces:</span>
              <span className="font-medium">{stats.charactersNoSpaces.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lines:</span>
              <span className="font-medium">{stats.lines.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paragraphs:</span>
              <span className="font-medium">{stats.paragraphs.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex flex-wrap gap-2">
              {stats.headings > 0 && (
                <Badge variant="secondary">
                  <Hash className="h-3 w-3 mr-1" />
                  {stats.headings} heading{stats.headings !== 1 ? "s" : ""}
                </Badge>
              )}
              {stats.images > 0 && (
                <Badge variant="secondary">
                  📷 {stats.images} image{stats.images !== 1 ? "s" : ""}
                </Badge>
              )}
              {stats.links > 0 && (
                <Badge variant="secondary">
                  🔗 {stats.links} link{stats.links !== 1 ? "s" : ""}
                </Badge>
              )}
              {stats.codeBlocks > 0 && (
                <Badge variant="secondary">
                  💻 {stats.codeBlocks} code block{stats.codeBlocks !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
