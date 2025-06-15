"use client"

import { UserButton } from '@clerk/nextjs'
import { CircleDollarSign, CircleUser, DollarSign, Icon, LayoutGrid, PiggyBank, ReceiptText } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'

        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
    ]

    const path=usePathname();

    useEffect(() => {
        console.log('Current path:', path);
    },[path]);

  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Image src={'/logo.svg'} 
            alt='logo'
            width={200}
            height={100}
            className='cursor-pointer mt-3'
        />
        <div className='mt-10'>
            {menuList.map((menu, index) => (
                <Link href={menu.path} key={menu.id}>
                    <h2 className={`flex gap-2 items-center
                        text-gray-500 font-medium mb-2
                        p-5 cursor-pointer rounded-md
                        hover:text-[#0F52FF] hover:bg-blue-100 
                        ${path === menu.path && 'text-primary bg-blue-100'}
                    `}>
                    <menu.icon />
                    {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default SideNav
