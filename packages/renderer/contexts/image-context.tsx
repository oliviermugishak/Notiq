"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface ImageInfo {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: number
}

interface ImageContextType {
  images: ImageInfo[]
  addImage: (file: File) => Promise<ImageInfo>
  removeImage: (id: string) => void
  getImageUrl: (id: string) => string | null
  clearImages: () => void
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export function useImage() {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider")
  }
  return context
}

export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<ImageInfo[]>([])

  const addImage = useCallback(async (file: File): Promise<ImageInfo> => {
    // Create a blob URL for the image
    const url = URL.createObjectURL(file)
    const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const imageInfo: ImageInfo = {
      id,
      name: file.name,
      url,
      size: file.size,
      type: file.type,
      uploadedAt: Date.now(),
    }

    setImages((prev) => [...prev, imageInfo])
    return imageInfo
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id)
      if (image) {
        URL.revokeObjectURL(image.url)
      }
      return prev.filter((img) => img.id !== id)
    })
  }, [])

  const getImageUrl = useCallback(
    (id: string): string | null => {
      const image = images.find((img) => img.id === id)
      return image ? image.url : null
    },
    [images],
  )

  const clearImages = useCallback(() => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.url)
    })
    setImages([])
  }, [images])

  return (
    <ImageContext.Provider
      value={{
        images,
        addImage,
        removeImage,
        getImageUrl,
        clearImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}
