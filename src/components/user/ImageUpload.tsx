"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Pencil, CircleUser, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
    value: string
    onChange?: (url: string) => void
    disabled?: boolean
}

export const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
    const [preview, setPreview] = useState<string>(value || "")
    const [imageError, setImageError] = useState<boolean>(!value)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (disabled) return
        fileInputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const result = reader.result as string
            setPreview(result)
            setImageError(false)
            onChange?.(result)
        }
        reader.readAsDataURL(file)
    }

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <div className="flex justify-center mb-8">
            <div className="relative">
                <div
                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#e2e8f0] cursor-pointer bg-gray-100 flex items-center justify-center"
                    onClick={handleClick}
                >
                    {!imageError && preview ? (
                        <Image
                            src={preview || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            width={128}
                            height={128}
                            onError={handleImageError}
                        />
                    ) : (
                        <UserPlus className="h-24 w-24 text-gray-400" />
                    )}
                </div>
                <Button
                    size="icon"
                    type="button"
                    className="absolute bottom-0 right-0 rounded-full bg-[#2563eb] hover:bg-[#2563eb]/90 text-white w-10 h-10"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    <Pencil className="h-5 w-5" />
                    <span className="sr-only">Edit profile picture</span>
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

