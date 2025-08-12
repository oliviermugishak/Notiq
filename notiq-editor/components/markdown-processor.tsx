"use client"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkBreaks from "remark-breaks"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

export interface ProcessorOptions {
  enableMath?: boolean
  enableGfm?: boolean
  enableBreaks?: boolean
  enableSyntaxHighlighting?: boolean
  enableHeadingLinks?: boolean
}

export function createMarkdownProcessor(options: ProcessorOptions = {}) {
  const {
    enableMath = true,
    enableGfm = true,
    enableBreaks = true,
    enableSyntaxHighlighting = true,
    enableHeadingLinks = true,
  } = options

  let processor = unified().use(remarkParse)

  if (enableGfm) {
    processor = processor.use(remarkGfm)
  }

  if (enableMath) {
    processor = processor.use(remarkMath)
  }

  if (enableBreaks) {
    processor = processor.use(remarkBreaks)
  }

  processor = processor.use(remarkRehype, { allowDangerousHtml: false })

  if (enableMath) {
    processor = processor.use(rehypeKatex)
  }

  if (enableHeadingLinks) {
    processor = processor.use(rehypeSlug).use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["heading-link"],
      },
    })
  }

  if (enableSyntaxHighlighting) {
    processor = processor.use(rehypeHighlight, {
      detect: true,
      ignoreMissing: true,
    })
  }

  processor = processor.use(rehypeSanitize).use(rehypeStringify)

  return processor
}

export function processMarkdown(markdown: string, options?: ProcessorOptions): string {
  try {
    const processor = createMarkdownProcessor(options)
    const result = processor.processSync(markdown)
    return String(result)
  } catch (error) {
    console.error("Markdown processing error:", error)
    return `<div class="error-message">
      <h3>Error processing markdown</h3>
      <p>There was an error rendering your markdown. Please check your syntax.</p>
      <details>
        <summary>Error details</summary>
        <pre>${error instanceof Error ? error.message : "Unknown error"}</pre>
      </details>
    </div>`
  }
}
