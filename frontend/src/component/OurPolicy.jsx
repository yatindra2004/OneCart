import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-start gap-12 py-12 px-4'>
      
      <div className='text-center'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='text-[13px] md:text-[18px] text-[#d0f0ff] mt-2 max-w-[700px] mx-auto'>
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      <div className='w-full flex flex-wrap items-center justify-center gap-10 md:gap-16'>
        
        <div className='w-[320px] max-w-[90%] flex flex-col items-center text-center gap-3'>
          <RiExchangeFundsLine className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90b9ff]' />
          <p className='font-semibold text-[19px] md:text-[24px] text-[#a5e8f7]'>Easy Exchange Policy</p>
          <p className='font-medium text-[12px] md:text-[16px] text-[#d0f0ff]'>
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        <div className='w-[320px] max-w-[90%] flex flex-col items-center text-center gap-3'>
          <TbRosetteDiscountCheckFilled className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90b9ff]' />
          <p className='font-semibold text-[19px] md:text-[24px] text-[#a5e8f7]'>7 Days Return Policy</p>
          <p className='font-medium text-[12px] md:text-[16px] text-[#d0f0ff]'>
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        <div className='w-[320px] max-w-[90%] flex flex-col items-center text-center gap-3'>
          <BiSupport className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90b9ff]' />
          <p className='font-semibold text-[19px] md:text-[24px] text-[#a5e8f7]'>Best Customer Support</p>
          <p className='font-medium text-[12px] md:text-[16px] text-[#d0f0ff]'>
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
