"use client"

import React, { useEffect } from 'react'
import { CarouselController } from '../global/CarouselComponent'
import Courses3 from "@/../public/labs/courses3.png";
import Courses4 from "@/../public/labs/courses4.png";
import { BlogCarouselComponent } from './BlogCarouselComponent';

const COURSES = [
    {
        image: Courses3,
        title: "Create An LMS Website",
        subTitle: "by Lorem-ipsum",
        timeOfCourse: "2 Weeks",
        activeStudent: "156",
        priceOfLessons: "20.0",
        isFree: true,
        link: "#",
    },
    {
        image: Courses4,
        title: "Create An LMS Website",
        subTitle: "by Lorem-ipsum",
        timeOfCourse: "2 Weeks",
        activeStudent: "156",
        priceOfLessons: "20.0",
        isFree: true,
        link: "#",
    },
    {
        image: Courses3,
        title: "Create An LMS Website",
        subTitle: "by Lorem-ipsum",
        timeOfCourse: "2 Weeks",
        activeStudent: "156",
        priceOfLessons: "20.0",
        isFree: true,
        link: "#",
    },
    {
        image: Courses4,
        title: "Create An LMS Website",
        subTitle: "by Lorem-ipsum",
        timeOfCourse: "2 Weeks",
        activeStudent: "156",
        priceOfLessons: "20.0",
        isFree: true,
        link: "#",
    },
    {
        image: Courses3,
        title: "Create An LMS Website",
        subTitle: "by Lorem-ipsum",
        timeOfCourse: "2 Weeks",
        activeStudent: "156",
        priceOfLessons: "20.0",
        isFree: true,
        link: "#",
    },
    {
        image: Courses4,
        title: "Create An LMS Website",
        subTitle: "by Lorem-ipsum",
        timeOfCourse: "2 Weeks",
        activeStudent: "156",
        priceOfLessons: "20.0",
        isFree: true,
        link: "#",
    },
]

function OurClients() {

    return (
        <div className=' max-w-desktop p-commonPadding mx-auto flex flex-col gap-[60px] my-32'>
            <div className=' text-center w-full flex flex-col gap-10  ' >
                <h1 className=' text-headingSizeMobile text-start lg:text-headingSizeDesktop'>Our Client</h1>
            </div>
            <BlogCarouselComponent courses={COURSES} />
        </div>
    )
}

export default OurClients
