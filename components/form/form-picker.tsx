"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Check } from "lucide-react";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { defaultImages } from "@/constants/images";
import FormErrors from "@/components/form/form-errors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({ id, errors }: FormPickerProps) {
    const { pending } = useFormStatus();
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9,
                });

                if (result && result.response) {
                    const newImages = result.response as Array<Record<string, any>>;
                    setImages(newImages);
                } else {
                    console.log("Failed to get images");
                }
            } catch (error) {
                console.log(error);
                setImages(defaultImages);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
        );
    }
    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-100 cursor-auto"
                        )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id);
                        }}
                    >
                        <input
                            type="radio"
                            id={id}
                            name={id}
                            checked={selectedImageId === image.id}
                            className="hidden"
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image fill src={image.urls.thumb} alt="unsplash image" className="object-cover rounded-sm" />
                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 h-full w-full flex items-center justify-center bg-black/30">
                                <Check className="h-6 w-6 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors id="image" errors={errors} />
        </div>
    );
}
