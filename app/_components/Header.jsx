"use client"
import React from 'react'
import { Button } from "../../components/ui/button";
import { UserButton, useUser } from '@clerk/nextjs'
import { User } from 'lucide-react';
import Link from 'next/link'
import Image from "next/image"


function Header() {

  const {user,isSignedIn}=useUser();

  return (
    <div className='p-5 flex justify-between items-center shadow-md z-50 sticky top-0'>
      <Image src={'/logo.svg'} 
        alt='logo'
        width={160}
        height={100}
      />
      {isSignedIn? 
        <UserButton/> : 
        <Link href={'/sign-in'}>
          <Button> Get Started </Button>
        </Link>
      }

    </div>
  )
}

export default Header
