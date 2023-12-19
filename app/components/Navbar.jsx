import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
  return (
    <div className=" bg-white shadow-sm z-50 opacity-90  border-slate-300 border-b-2 py-4 sticky top-0 flex justify-center items-center focus-visible:h-80    gap-12">
              <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/logo.jpg"
          width={200}
          height={30}
          className="object-contain w-auto h-auto"
          alt="3D Dollface"
        />

        </Link>
        </div>
  )
}
