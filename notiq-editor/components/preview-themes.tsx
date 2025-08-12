"use client"

export interface PreviewTheme {
  name: string
  id: string
  styles: {
    background: string
    text: string
    heading: string
    link: string
    code: string
    codeBackground: string
    blockquote: string
    blockquoteBorder: string
    border: string
  }
}

export const previewThemes: PreviewTheme[] = [
  {
    name: "GitHub Light",
    id: "github-light",
    styles: {
      background: "#ffffff",
      text: "#24292f",
      heading: "#1f2328",
      link: "#0969da",
      code: "#d73a49",
      codeBackground: "#f6f8fa",
      blockquote: "#656d76",
      blockquoteBorder: "#d1d9e0",
      border: "#d1d9e0",
    },
  },
  {
    name: "GitHub Dark",
    id: "github-dark",
    styles: {
      background: "#0d1117",
      text: "#e6edf3",
      heading: "#f0f6fc",
      link: "#58a6ff",
      code: "#f85149",
      codeBackground: "#161b22",
      blockquote: "#8d96a0",
      blockquoteBorder: "#30363d",
      border: "#30363d",
    },
  },
  {
    name: "Glassmorphism",
    id: "glassmorphism",
    styles: {
      background: "rgba(255, 255, 255, 0.1)",
      text: "#2d3748",
      heading: "#1a202c",
      link: "#3182ce",
      code: "#e53e3e",
      codeBackground: "rgba(247, 250, 252, 0.8)",
      blockquote: "#4a5568",
      blockquoteBorder: "#cbd5e0",
      border: "rgba(203, 213, 224, 0.3)",
    },
  },
  {
    name: "Sepia",
    id: "sepia",
    styles: {
      background: "#f7f3e9",
      text: "#5d4e37",
      heading: "#3c2e1f",
      link: "#8b4513",
      code: "#a0522d",
      codeBackground: "#f5f5dc",
      blockquote: "#8b7355",
      blockquoteBorder: "#deb887",
      border: "#deb887",
    },
  },
  {
    name: "Nord",
    id: "nord",
    styles: {
      background: "#2e3440",
      text: "#d8dee9",
      heading: "#eceff4",
      link: "#88c0d0",
      code: "#bf616a",
      codeBackground: "#3b4252",
      blockquote: "#81a1c1",
      blockquoteBorder: "#5e81ac",
      border: "#4c566a",
    },
  },
  {
    name: "Dracula",
    id: "dracula",
    styles: {
      background: "#282a36",
      text: "#f8f8f2",
      heading: "#bd93f9",
      link: "#8be9fd",
      code: "#ff79c6",
      codeBackground: "#44475a",
      blockquote: "#6272a4",
      blockquoteBorder: "#bd93f9",
      border: "#6272a4",
    },
  },
]

export function getThemeById(id: string): PreviewTheme {
  return previewThemes.find((theme) => theme.id === id) || previewThemes[0]
}
