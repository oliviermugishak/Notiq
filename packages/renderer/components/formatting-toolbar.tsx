"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  ImageIcon,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  X,
} from "lucide-react"

interface FormattingToolbarProps {
  onInsertMarkdown: (before: string, after?: string, placeholder?: string) => void
  onClose: () => void
}

export function FormattingToolbar({ onInsertMarkdown, onClose }: FormattingToolbarProps) {
  const insertMarkdown = (before: string, after = "", placeholder = "") => {
    onInsertMarkdown(before, after, placeholder)
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg p-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Format</span>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {/* Text Formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("**", "**", "bold text")}
          className="h-8 w-8 p-0"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("_", "_", "italic text")}
          className="h-8 w-8 p-0"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("__", "__", "underlined text")}
          className="h-8 w-8 p-0"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("~~", "~~", "strikethrough text")}
          className="h-8 w-8 p-0"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headers */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("\n# ", "", "Heading 1")}
          className="h-8 w-8 p-0"
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("\n## ", "", "Heading 2")}
          className="h-8 w-8 p-0"
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("\n### ", "", "Heading 3")}
          className="h-8 w-8 p-0"
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists and Quotes */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("\n- ", "", "List item")}
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("\n1. ", "", "List item")}
          className="h-8 w-8 p-0"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("\n> ", "", "Quote")}
          className="h-8 w-8 p-0"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Code and Links */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("`", "`", "inline code")}
          className="h-8 w-8 p-0"
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("[", "](url)", "link text")}
          className="h-8 w-8 p-0"
          title="Link"
        >
          <Link className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("![", "](image-url)", "alt text")}
          className="h-8 w-8 p-0"
          title="Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
