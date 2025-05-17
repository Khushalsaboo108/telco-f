"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Download, X } from "lucide-react"

interface ITabsDetails {
    details: {
        detaild: string
        attachementUrl: string
        attachementName: string
        attachementSize?: string
        attachementDate?: string
    }
}

export default function TabsComponent({ details }: ITabsDetails) {
    const [downloadProgress, setDownloadProgress] = useState<{
        isDownloading: boolean
        progress: number
    }>({
        isDownloading: false,
        progress: 0,
    })

    const handleDownload = async () => {
        if (!details.attachementUrl) return;

        try {
            setDownloadProgress({ isDownloading: true, progress: 0 });

            const simulateProgress = () => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress > 100) {
                        progress = 100;
                        clearInterval(interval);

                        setTimeout(() => {
                            window.open(details.attachementUrl, "_blank");
                            setTimeout(() => {
                                setDownloadProgress({ isDownloading: false, progress: 0 });
                            }, 500);
                        }, 300);
                    }
                    setDownloadProgress({ isDownloading: true, progress });
                }, 300);
            };

            simulateProgress();
        } catch (error) {
            console.error("Download failed:", error);
            setDownloadProgress({ isDownloading: false, progress: 0 });
        }
    };


    const fileSize = details.attachementSize || "313 KB"

    const fileDate = details.attachementDate || "24 Mar, 2025"

    return (
        <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-[#e9effd]">
                <TabsTrigger value="details" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white">
                    Details
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white">
                    Reviews
                </TabsTrigger>
                <TabsTrigger value="attachments" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white">
                    Attachments
                </TabsTrigger>
                <TabsTrigger value="doubts" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white">
                    Doubts
                </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Course Overview</h2>
                    <p className="text-[#51564e]">
                        {details.detaild !== ""
                            ? details.detaild
                            : `Embark on a transformative journey into the dynamic world of User Experience (UX) Design with our
              comprehensive course, "Introduction to User Experience Design." This course is meticulously crafted
              to provide you with a foundational understanding of the principles, methodologies, and tools that
              drive exceptional user experiences in the digital landscape.`}
                    </p>
                </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
                <p>Course reviews will appear here.</p>
            </TabsContent>

            <TabsContent value="attachments" className="mt-4">
                {details.attachementUrl ?
                    (downloadProgress.isDownloading ? (
                        <div className="w-full border rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex-shrink-0">
                                    <Image width={40} height={40} src="/logo/PDF.png" alt="PDF" className="object-contain" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium text-[#324054]">{details.attachementName || "File Title.pdf"}</p>
                                        <button
                                            onClick={() => setDownloadProgress({ isDownloading: false, progress: 0 })}
                                            className="text-[#71839b] hover:text-[#324054]"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <div className="w-full bg-[#e4ecf5] rounded-full h-2 mt-2">
                                        <div
                                            className="bg-[#00b65e] h-2 rounded-full"
                                            style={{ width: `${downloadProgress.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-[#71839b] mt-1">{Math.round(downloadProgress.progress)}% Completed</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full border rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <Image width={40} height={40} src="/logo/PDF.png" alt="PDF" className="object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#324054]">{details.attachementName || "File Title.pdf"}</p>
                                        <p className="text-sm text-[#71839b]">
                                            {fileSize} · {fileDate}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="text-[#2563eb] hover:text-[#1d4ed8] p-2 rounded-full hover:bg-[#e9f0fa]"
                                    aria-label="Download file"
                                >
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    "There is no any attachments"
                }

                {!details.attachementUrl && !details.attachementName && (
                    <p className="text-[#71839b] italic">No attachments available for this course.</p>
                )}
            </TabsContent>

            <TabsContent value="doubts" className="mt-4">
                <p>Ask your questions about this lesson here.</p>
            </TabsContent>
        </Tabs>
    )
}

