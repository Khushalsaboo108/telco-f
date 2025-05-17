"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentNavigationProps {
  isFirstLesson: boolean;
  isLastLesson: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
  className?: string;
}

export default function ContentNavigation({
  isFirstLesson,
  isLastLesson,
  goToPrevious,
  goToNext,
  className,
}: ContentNavigationProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={goToPrevious}
        disabled={isFirstLesson}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={goToNext}
        disabled={isLastLesson}
        className="flex items-center gap-1"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
