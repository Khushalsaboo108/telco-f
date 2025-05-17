"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { IShortChapter, IShortSection } from "@/types/course";
import { FaPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useState } from "react";
import { VideoModal } from "./ViedoModal";

interface ISections {
  _id: string;
  title: string;
  isPublished: boolean;
  chapters?: any;
}

interface ISectionDetail {
  section: ISections[] | null;
}

const CourseAccordion = ({ section }: ISectionDetail) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<IShortChapter | null>(
    null
  );

  const handleOpenVideoModal = (chapter: IShortChapter) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  // Filter sections that are published and have at least one published chapter
  const validSections = section
    ? section.filter(
        (sectionItem) =>
          sectionItem.isPublished &&
          sectionItem.chapters.some(
            (chapter: IShortChapter) => chapter.isPublished
          )
      )
    : [];

  return (
    <div className="border rounded">
      <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
        {validSections.length > 0 &&
          validSections.map((sectionItem, index) => {
            // Get only published chapters for this section
            const publishedChapters = sectionItem.chapters.filter(
              (chapter: IShortChapter) => chapter.isPublished
            );

            return (
              <AccordionItem key={sectionItem._id} value={`item-${index + 1}`}>
                <div className="flex justify-between items-center w-full p-4 bg-newBackgroundColor">
                  <AccordionTrigger className="hover:no-underline p-0 w-full flex justify-between items-center">
                    <div className="flex justify-between items-center bg-newBackgroundColor">
                      <div>
                        <div className="flex items-center justify-between py-2">
                          <h3 className="font-medium">{sectionItem.title}</h3>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                </div>

                <AccordionContent>
                  <div className="space-y-4 px-4 pt-4 pb-2">
                    {publishedChapters.length > 0 ? (
                      publishedChapters.map(
                        (chapter: IShortChapter, chapterIndex: number) => (
                          <div
                            key={chapter._id}
                            className={`${
                              chapterIndex !== publishedChapters.length - 1
                                ? "border-b pb-3"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-4 px-2">
                              <div className="flex w-full justify-between items-center">
                                <div className="py-3">
                                  <h4 className="font-medium">
                                    {chapter.title}
                                  </h4>
                                </div>
                                {chapter.isFree ? (
                                  <button
                                    className="text-[16px]"
                                    onClick={() =>
                                      handleOpenVideoModal(chapter)
                                    }
                                  >
                                    <FaPlayCircle className="text-[18px]" />
                                  </button>
                                ) : (
                                  <FaLock className="text-[18px]" />
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p>No chapters available</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chapter={selectedChapter}
      />
    </div>
  );
};

export default CourseAccordion;
