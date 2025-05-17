"use client";

import { IChapter } from "@/types/course";
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
  items: IChapter[];
  onReorder: (updateData: { _id: string; order: number }[]) => void;
  onEdit: (_id: string) => void;
}

function LabChaptersList({ items, onReorder, onEdit }: LabChapterListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);
    setChapters(items);

    // Modified this part to start order from 1 instead of 0
    const bulkUpdateData = updatedChapters.map((chapter) => ({
      _id: chapter._id,
      order: items.findIndex((item) => item._id === chapter._id) + 1, // Added +1 here
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
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter._id}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 border rounded-md mb-4 text-sm",
                        chapter.isPublished
                          ? "bg-sky-100 border-sky-200 text-sky-700"
                          : "bg-slate-200 border-slate-200 text-slate-900"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                          chapter.isPublished &&
                            "border-r-sky-200 hover:border-sky-200"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="w-5 h-5" />
                      </div>
                      {chapter.title}
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {chapter.isFree && <Badge>Free</Badge>}
                        <Badge
                          className={cn(
                            "bg-slate-500",
                            chapter.isPublished && "bg-sky-700"
                          )}
                        >
                          {chapter.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Pencil
                          onClick={() => onEdit(chapter._id || "")}
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

export default LabChaptersList;
