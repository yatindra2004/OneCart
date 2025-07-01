import React from 'react'

function NewLetterBox() {
  const handleSubmit = () => {
    e.preventDefault()
  }

  return (
    <div className='w-full h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-center gap-3 px-4 py-6'>
      <p className='text-[20px] md:text-[30px] text-[#a5faf7] font-semibold text-center'>
        Subscribe now & get 20% off
      </p>

      <p className='text-[14px] md:text-[18px] text-blue-100 font-medium text-center max-w-[600px]'>
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[700px] flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 px-2'
      >
        <input
          type='text'
          placeholder='Enter Your Email'
          required
          className='w-full sm:w-[60%] h-[45px] bg-slate-300 text-black placeholder:text-black px-4 rounded-lg shadow-sm shadow-black'
        />
        <button
          type='submit'
          className='h-[45px] px-6 bg-[#2e3030c9] text-white rounded-lg shadow-sm shadow-black border border-[#80808049] text-[15px] md:text-[16px] hover:bg-slate-500'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox
