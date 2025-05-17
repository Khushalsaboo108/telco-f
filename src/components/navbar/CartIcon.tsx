"use client"

import { useAppSelector } from '@/hooks/use-redux';
import { selectCourses } from '@/store/features/cartSlice';
import Link from 'next/link'
import React from 'react'
import { IoMdCart } from 'react-icons/io'

function Cart() {
    const cartDetails = useAppSelector(selectCourses);

    return (
        <div className="relative">
            <Link href="/cart" className="text-[20px] block">
                <IoMdCart className="text-[25px]" />

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[16px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartDetails.length}
                </span>

            </Link>
        </div>
    )
}

export default Cart