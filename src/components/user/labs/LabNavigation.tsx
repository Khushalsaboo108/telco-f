"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LabsNavigationProps {
  isFirstLesson: boolean;
  isLastLesson: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
  className?: string;
}

export default function LabNavigation({
  isFirstLesson,
  isLastLesson,
  goToPrevious,
  goToNext,
  className,
}: LabsNavigationProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        variant="outline"
        className={cn(
          "bg-[#e9effd] text-[#2563eb] hover:bg-[#e0f2fe]",
          isFirstLesson && "opacity-50 cursor-not-allowed"
        )}
        onClick={goToPrevious}
        disabled={isFirstLesson}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Prev
      </Button>
      <Button
        variant="outline"
        className={cn(
          "bg-[#e9effd] text-[#2563eb] hover:bg-[#e0f2fe]",
          isLastLesson && "opacity-50 cursor-not-allowed"
        )}
        onClick={goToNext}
        disabled={isLastLesson}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
