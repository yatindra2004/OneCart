import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <div className='w-full md:h-[36vh] h-[24vh] mb-[77px] md:mb-0'>
      <div className='w-full md:h-[30vh] h-[18vh] bg-[#dbfcfcec] flex flex-col md:flex-row items-center justify-between px-4 md:px-[50px]'>
        {/* Logo & Description */}
        <div className='md:w-[30%] w-full h-full flex flex-col items-start justify-start gap-1 mt-[10px] md:mt-[40px]'>
          <div className='flex items-center gap-2'>
            <img src={logo} alt="logo" className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]' />
            <p className='text-[19px] md:text-[20px] text-black font-semibold'>OneCart</p>
          </div>
          <p className='text-[14px] md:text-[15px] text-[#1e2223] hidden md:block leading-5'>
            OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
          </p>
          <p className='text-[14px] text-[#1e2223] md:hidden mt-1'>Fast. Easy. Reliable. OneCart Shopping</p>
        </div>

        {/* Company Section */}
        <div className='md:w-[25%] w-[45%] h-full flex flex-col items-center justify-start text-center mt-[10px] md:mt-[40px]'>
          <p className='text-[18px] md:text-[20px] text-[#1e2223] font-semibold'>COMPANY</p>
          <ul className='mt-2 space-y-1'>
            <li className='text-[14px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>
            <li className='text-[14px] text-[#1e2223] cursor-pointer'>About us</li>
            <li className='text-[14px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
            <li className='text-[14px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className='md:w-[25%] w-[50%] h-full flex flex-col items-center justify-start text-center mt-[10px] md:mt-[40px]'>
          <p className='text-[18px] md:text-[20px] text-[#1e2223] font-semibold'>GET IN TOUCH</p>
          <ul className='mt-2 space-y-1'>
            <li className='text-[14px] text-[#1e2223]'>+91-9876543210</li>
            <li className='text-[14px] text-[#1e2223]'>contact@onecart.com</li>
            <li className='text-[14px] text-[#1e2223] hidden md:block'>+1-123-456-7890</li>
            <li className='text-[14px] text-[#1e2223] hidden md:block'>admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <div className='w-full h-[1px] bg-slate-400'></div>

      {/* Bottom Bar */}
      <div className='w-full h-[5vh] bg-[#dbfcfcec] flex items-center justify-center text-[13px] md:text-[14px] text-[#1e2223] font-medium'>
        Copyright 2025@onecart.com - All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
