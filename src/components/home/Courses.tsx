import React from "react";
import CourseCard from "./CourseCard";

export default function Courses() {
  return (
    <div
      id="course-container"
      className="h-[90vh] bg-white flex justify-between items-center border border-black"
    >
      <CourseCard name="LABS" />
      <CourseCard name="COURSES" />
      <CourseCard name="ASSESMENTS" />
    </div>
  );
}
