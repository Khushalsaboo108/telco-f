"use client";
import { Search, Filter } from "lucide-react";
import type React from "react";

import { useState, useEffect, useCallback, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import CourseGrid from "./CourseGrid";
import type { ICourseApiResponse } from "@/types/course";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ICourseData {
  coursePosts?: ICourseApiResponse | null;
  initialPage?: number;
  initialLimit?: number;
  initialQuery?: string;
}

const CourseCatalogue: React.FC<ICourseData> = ({
  coursePosts = null,
  initialPage = 1,
  initialLimit = 10,
  initialQuery = "",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState<string>(initialQuery || "");
  const [tableParams, setTableParams] = useState({
    page: initialPage,
    limit: initialLimit,
    title: initialQuery || "",
    price: "",
    level: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create a completely new query string to avoid parameter duplication
  const buildQueryString = useCallback(() => {
    // Get technical learning path params
    const pg = searchParams.get("pg") || "1";
    const lm = searchParams.get("lm") || "2";

    // Create new clean params object with all values
    const params = new URLSearchParams();

    // Add CourseCatalogue params
    params.set("page", tableParams.page.toString());
    params.set("limit", tableParams.limit.toString());
    if (tableParams.title !== undefined && tableParams.title !== null) {
      params.set("title", tableParams.title);
    }
    if (tableParams.price) {
      params.set("price", tableParams.price);
    }
    if (tableParams.level) {
      params.set("level", tableParams.level);
    }

    // Add TechnicalLearningPath params
    params.set("pg", pg);
    params.set("lm", lm);

    return params.toString();
  }, [searchParams, tableParams]);

  useEffect(() => {
    // Push a clean URL with no duplicate parameters
    router.push(`${pathname}?${buildQueryString()}`, { scroll: false });
  }, [tableParams, router, pathname, buildQueryString]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Explicitly handle empty string case
      setTableParams({
        ...tableParams,
        title: inputValue,
        page: 1, // Reset to page 1 when search changes
      });
    }, 500); // Debounced search

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setTableParams({ ...tableParams, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (filters: { price: string; level: string }) => {
    setTableParams({
      ...tableParams,
      price: filters.price === "all" ? "" : filters.price,
      level: filters.level === "all" ? "" : filters.level,
      page: 1, // Reset to page 1 when filters change
    });
  };

  // Calculate total pages
  const totalPages = useMemo(
    () => coursePosts?.pagination?.totalPages || 1,
    [coursePosts]
  );

  return (
    <main className="min-h-screen bg-background">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <section className="max-w-desktop mx-auto px-4 py-12">
        <div className="flex justify-between flex-col lg:flex-row lg:items-center mb-8">
          <h2 className="text-headingSizeMobile lg:text-headingSizeDesktop font-bold">
            Explore {pathname === "/labs" ? "Lab" : "Course"} Catalogue
          </h2>
          <div className="flex items-center justify-end lg:p-0 py-3 gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-10 h-12 pr-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </div>
            <button
              className="lg:hidden bg-primary text-primary-foreground p-2 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar for Desktop */}
          <FilterSidebar
            className="hidden lg:block"
            onFilterChange={handleFilterChange}
          />
          <CourseGrid
            coursePosts={coursePosts}
            currentPage={tableParams.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        className={`fixed inset-0 left-0 z-50 w-64 bg-sidebar shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClose={() => setIsSidebarOpen(false)}
        onFilterChange={handleFilterChange}
      />
    </main>
  );
};

export default CourseCatalogue;
