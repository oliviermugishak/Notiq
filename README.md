# Notiq

A cross-platform Markdown editor and previewer built with React and Electron, with a focus on a clean user interface and seamless integration with your file system.

---

## About

Notiq is a modern, cross-platform application designed to provide a beautiful and efficient Markdown editing and previewing experience.  
Built with a focus on performance and user experience, it aims to be a reliable tool for writers, developers, and anyone who works with Markdown files.

It supports opening Markdown files directly from your OS, offers gorgeous themed previews, and delivers a smooth, distraction-free writing experience — whether you’re on Windows, macOS, or Linux.

---

## Features

- **Cross-Platform** – Runs on Windows, macOS, and Linux via Electron.
- **Beautiful Themed Preview** – Choose from stunning, customizable themes (light, dark, glassmorphism, skeuomorphic, etc.).
- **Real-time Editing** – See your changes instantly in a live preview pane.
- **Native File Integration** – Open, edit, and save files directly from your file system.
- **Extensible Markdown Pipeline** – Powered by `unified`, `remark`, and `rehype` for robust parsing and rendering.
- **Syntax Highlighting** – Gorgeous code block highlighting powered by Shiki or rehype-highlight.
- **Secure Preview** – Sanitized HTML rendering for safety.
- **Theme Engine** – Fully customizable with CSS variables and JSON theme files.
- **Drag & Drop Images** – Automatically copy assets to your project and insert Markdown links.
- **File Watching** – Detect and reload changes made by external editors.

---

## Why I Built This

Hi, I'm Kwizera Mugisha Olivier, the developer behind Notiq.

I built this application because I wanted a Markdown editor that combined **power**, **beauty**, and **true cross-platform feel**.  
While many Markdown tools exist, they often sacrifice either design polish, native OS integration, or advanced editing features.  

With Notiq, my goal is to create a **delightful writing environment** where you can focus entirely on your content — free from clutter and friction.

---

## Technologies Used

- **Frontend:** React, TypeScript, Vite
- **Editor:** CodeMirror 6
- **Markdown Parsing:** unified, remark, rehype
- **Styling:** CSS variables + Tailwind (for components)
- **Syntax Highlighting:** Shiki / rehype-highlight
- **Desktop Packaging:** Electron

---

## Project Structure

```
/src
  /electron      # Electron main & preload scripts
  /ui
    /src         # React app source
    /public      # Static assets
    /dist        # Build output
  /workers       # Web workers (e.g., markdown parsing)
  /themes        # JSON theme files
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/notiq.git
cd notiq
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
npm run electron:build
```

---

## Roadmap

### **MVP (Web + Desktop basics)**
- Open & edit `.md` files
- Live preview with GFM & syntax highlighting
- Two themes (light/dark) + one advanced (glassmorphism)
- Save / Save As with file system integration
- Sanitized HTML output

### **v1 (Polished Desktop)**
- File associations for `.md` files
- Drag & drop image handling
- Theme editor with JSON import/export
- File watching for external edits
- Installers for all platforms

### **Future**
- Git integration
- Cloud sync (themes & settings)
- Plugins (diagrams, charts, etc.)
- Export to PDF/HTML

---

## License
MIT License © 2025 Kwizera Mugisha Olivier
