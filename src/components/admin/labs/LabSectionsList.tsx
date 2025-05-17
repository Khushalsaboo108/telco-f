"use client";

import { IChapter, ISection } from "@/types/course";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ILabSection } from "@/types/lab";

const mockChapter: IChapter = {
  _id: "64b2f3e5c9b8b320c78a1f56",
  title: "Introduction to Web Development",
  description:
    "This chapter covers the basics of web development, including HTML, CSS, and JavaScript.",
  videoUrl: "https://example.com/videos/introduction-to-web-development.mp4",
  order: 1,
  isPublished: false,
  isFree: true,
  courseId: "64b2f3e5c9b8b320c78a1f55",
  createdAt: new Date("2025-02-10T10:30:00Z"),
  updatedAt: new Date("2025-02-10T12:00:00Z"),
};

interface LabChapterListProps {
  items: ILabSection[];
  onReorder: (updateData: { _id: string; order: number }[]) => void;
  onEdit: (_id: string) => void;
}
function LabSectionsList({ items, onReorder, onEdit }: LabChapterListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [sections, setSections] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSections(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSections = items.slice(startIndex, endIndex + 1);
    setSections(items);

    // Modified this part to start order from 1 instead of 0
    const bulkUpdateData = updatedSections.map((section) => ({
      _id: section._id,
      order: items.findIndex((item) => item._id === section._id) + 1, // Added +1 here
    }));

    //@ts-ignore
    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable
                  key={section._id}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 border rounded-md mb-4 text-sm",
                        section.isPublished
                          ? "bg-sky-100 border-sky-200 text-sky-700"
                          : "bg-slate-200 border-slate-200 text-slate-900"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                          section.isPublished &&
                            "border-r-sky-200 hover:border-sky-200"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="w-5 h-5" />
                      </div>
                      {section.title}
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {/*{section.isFree && <Badge>Free</Badge>}*/}
                        <Badge
                          className={cn(
                            "bg-slate-500",
                            section.isPublished && "bg-sky-700"
                          )}
                        >
                          {section.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Pencil
                          onClick={() => onEdit(section._id || "")}
                          className="w-4 h-4 hover:opacity-75 transition cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default LabSectionsList;
