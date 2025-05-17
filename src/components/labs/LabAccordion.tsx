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

interface ISections {
  _id: string;
  title: string;
  isPublished: boolean;
  labChapters?: any;
}

interface ISectionDetail {
  labSection: ISections[] | null;
}

const LabAccordion = ({ labSection }: ISectionDetail) => {
  console.log("data", labSection);

  // Filter sections that are published and have at least one published chapter
  const validSections = labSection
    ? labSection.filter(
        (sectionItem) =>
          sectionItem.isPublished &&
          sectionItem.labChapters.some(
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
            const publishedChapters = sectionItem.labChapters.filter(
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
                                <FaLock className="text-[18px]" />
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p>No labs available</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};

export default LabAccordion;
