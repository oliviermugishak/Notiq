"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { EditorView, basicSetup } from "codemirror"
import { placeholder } from "@codemirror/view"
import { markdown } from "@codemirror/lang-markdown"
import { EditorState } from "@codemirror/state"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export interface MarkdownEditorRef {
  insertMarkdown: (before: string, after?: string, placeholderText?: string) => void
}

export const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(
  ({ value, onChange, placeholder: placeholderText = "Start writing your markdown here..." }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null)
    const viewRef = useRef<EditorView | null>(null)

    useImperativeHandle(ref, () => ({
      insertMarkdown: (before: string, after = "", placeholderText = "") => {
        if (!viewRef.current) return

        const view = viewRef.current
        const { from, to } = view.state.selection.main
        const selectedText = view.state.doc.sliceString(from, to)
        const textToInsert = selectedText || placeholderText
        const fullText = before + textToInsert + after

        view.dispatch({
          changes: { from, to, insert: fullText },
          selection: { anchor: from + before.length, head: from + before.length + textToInsert.length },
        })

        view.focus()
      },
    }))

    useEffect(() => {
      if (!editorRef.current) return

      const extensions = [
        basicSetup,
        markdown(),
        placeholder(placeholderText),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString())
          }
        }),
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
            backgroundColor: "#ffffff",
          },
          ".cm-content": {
            padding: "20px",
            minHeight: "100%",
            color: "#1a202c",
            lineHeight: "1.6",
          },
          ".cm-focused": {
            outline: "none",
          },
          ".cm-editor": {
            height: "100%",
          },
          ".cm-scroller": {
            fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace",
          },
          ".cm-cursor": {
            borderLeftColor: "#0066cc",
          },
          ".cm-selectionBackground": {
            backgroundColor: "#0066cc22",
          },
          ".cm-activeLine": {
            backgroundColor: "#f8f9fa",
          },
          ".cm-gutters": {
            backgroundColor: "#ffffff",
            border: "none",
          },
          ".cm-placeholder": {
            color: "#9ca3af",
            fontStyle: "italic",
          },
        }),
      ]

      const state = EditorState.create({
        doc: value,
        extensions,
      })

      const view = new EditorView({
        state,
        parent: editorRef.current,
      })

      viewRef.current = view

      return () => {
        view.destroy()
      }
    }, [placeholderText])

    useEffect(() => {
      if (viewRef.current && viewRef.current.state.doc.toString() !== value) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: viewRef.current.state.doc.length,
            insert: value,
          },
        })
      }
    }, [value])

    return (
      <div className="h-full bg-white relative">
        <div ref={editorRef} className="h-full" />
      </div>
    )
  },
)

MarkdownEditor.displayName = "MarkdownEditor"
