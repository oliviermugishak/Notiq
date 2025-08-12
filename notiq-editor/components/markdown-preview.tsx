"use client"

import { useEffect } from "react"

import { useMemo } from "react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"
import { useState } from "react"

interface MarkdownPreviewProps {
  markdown: string
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [copiedBlocks, setCopiedBlocks] = useState<Set<number>>(new Set())

  const html = useMemo(() => {
    try {
      const result = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .processSync(markdown)

      return result.toString()
    } catch (error) {
      console.error("Markdown processing error:", error)
      return "<p>Error processing markdown</p>"
    }
  }, [markdown])

  const copyToClipboard = async (text: string, blockIndex: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedBlocks((prev) => new Set(prev).add(blockIndex))
      setTimeout(() => {
        setCopiedBlocks((prev) => {
          const newSet = new Set(prev)
          newSet.delete(blockIndex)
          return newSet
        })
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const processedHtml = useMemo(() => {
    let blockIndex = 0
    return html.replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
      const currentIndex = blockIndex++
      const decodedCode = code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')

      return `
        <div class="code-block-container">
          <div class="code-block-header">
            <button 
              class="copy-button" 
              onclick="window.copyCode('${encodeURIComponent(decodedCode)}', ${currentIndex})"
              data-block="${currentIndex}"
            >
              <span class="copy-icon">${copiedBlocks.has(currentIndex) ? "✓" : "Copy"}</span>
            </button>
          </div>
          ${match}
        </div>
      `
    })
  }, [html, copiedBlocks])

  useEffect(() => {
    window.copyCode = (encodedCode: string, blockIndex: number) => {
      const code = decodeURIComponent(encodedCode)
      copyToClipboard(code, blockIndex)
    }
    return () => {
      delete window.copyCode
    }
  }, [])

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-none p-8">
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: processedHtml }} />
      </div>

      <style jsx global>{`
        .markdown-content {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          color: #1a202c;
        }

        .markdown-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #4a90e2;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }

        .markdown-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          color: #4a90e2;
          margin: 2rem 0 1rem 0;
          line-height: 1.3;
        }

        .markdown-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #4a90e2;
          margin: 1.5rem 0 0.75rem 0;
          line-height: 1.4;
        }

        .markdown-content p {
          margin: 1rem 0;
          color: #2d3748;
        }

        .markdown-content a {
          color: #0066cc;
          text-decoration: none;
        }

        .markdown-content a:hover {
          text-decoration: underline;
        }

        .markdown-content ul, .markdown-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .markdown-content li {
          margin: 0.5rem 0;
          color: #2d3748;
        }

        .markdown-content blockquote {
          border-left: 4px solid #e2e8f0;
          background: #f7fafc;
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          color: #718096;
        }

        .markdown-content blockquote p {
          margin: 0.5rem 0;
        }

        .markdown-content blockquote blockquote {
          margin: 0.5rem 0;
          border-left: 4px solid #cbd5e0;
          background: #edf2f7;
        }

        .markdown-content code {
          background: #f1f5f9;
          color: #e53e3e;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-size: 0.875rem;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
        }

        .code-block-container {
          position: relative;
          margin: 1.5rem 0;
        }

        .code-block-header {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          z-index: 10;
        }

        .copy-button {
          background: #4a5568;
          color: white;
          border: none;
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .copy-button:hover {
          background: #2d3748;
        }

        .markdown-content pre {
          background: #2d3748 !important;
          border-radius: 6px;
          padding: 1rem 1rem 1rem 1rem;
          overflow-x: auto;
          margin: 0;
        }

        .markdown-content pre code {
          background: transparent;
          color: #e2e8f0;
          padding: 0;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .markdown-content table {
          border-collapse: collapse;
          margin: 1.5rem 0;
          width: 100%;
          border: 1px solid #e2e8f0;
        }

        .markdown-content table th,
        .markdown-content table td {
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1rem;
          text-align: left;
        }

        .markdown-content table th {
          background: #f7fafc;
          font-weight: 600;
          color: #2d3748;
        }

        .markdown-content table td {
          color: #4a5568;
        }

        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          margin: 1rem 0;
        }

        .markdown-content strong {
          font-weight: 600;
          color: #2d3748;
        }

        .markdown-content em {
          font-style: italic;
          color: #4a5568;
        }

        .markdown-content del {
          text-decoration: line-through;
          color: #718096;
        }
      `}</style>
    </div>
  )
}
