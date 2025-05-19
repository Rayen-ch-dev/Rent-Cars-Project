import React from 'react'
import Image from 'next/image'

const ContactFields = ({linker,imageUrl}) => {
  return (
 <div className=" cursor-pointer flex items-center gap-4 border border-white rounded-2xl p-6 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-300">
            <span><Image src={imageUrl} alt="" width={30} height={40}/></span>
            <a href="#">{linker}</a>
          </div>
  )
}

export default ContactFields
