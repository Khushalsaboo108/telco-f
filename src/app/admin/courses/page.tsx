'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { columns } from "@/components/admin/courses/datatable/Columns";
import { DataTable } from "@/components/admin/courses/datatable/DataTable";
import { getAllCourses } from "@/app/actions/course.action";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getAllCourses();
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <Link href={"/admin/create-course"}>
        <Button> New Course </Button>
      </Link>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}

export default CoursesPage;
