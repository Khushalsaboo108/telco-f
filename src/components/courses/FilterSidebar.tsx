import { X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  className?: string;
  onClose?: () => void;
  onFilterChange?: (filters: { price: string; level: string }) => void;
}

export default function FilterSidebar({
  className = "",
  onClose,
  onFilterChange,
}: FilterSidebarProps) {
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const handlePriceChange = (price: string) => {
    setSelectedPrice(price);
    onFilterChange?.({ price, level: selectedLevel });
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    onFilterChange?.({ price: selectedPrice, level });
  };

  return (
    <div className={`p-4 ${className} overflow-scroll`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Course Category</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((course) => (
              <label key={course} className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Course {course}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Price</h3>
          <div className="space-y-2">
            {["all", "free", "paid"].map((price) => (
              <label key={price} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === price}
                  onChange={() => handlePriceChange(price)}
                  className="rounded border-gray-300"
                />
                <span className=" capitalize ">{price}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Level</h3>
          <div className="space-y-2">
            {["all", "beginner", "intermediate", "expert"].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="level"
                  checked={selectedLevel === level}
                  onChange={() => handleLevelChange(level)}
                  className="rounded border-gray-300"
                />
                <span className="capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {onClose && (
        <div className="flex items-end justify-end mt-3">
          <button onClick={onClose} className="rounded px-3 bg-card p-1">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
