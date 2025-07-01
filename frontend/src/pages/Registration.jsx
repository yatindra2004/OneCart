import React from 'react'
import Logo from "../assets/logo.png"
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { userDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Registration() {
  const [show, setShow] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { getCurrentUser } = useContext(userDataContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', {
        name, email, password
      }, { withCredentials: true })

      getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("User Registration Failed")
      setLoading(false)
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const result = await axios.post(serverUrl + "/api/auth/googlelogin", {
        name: user.displayName, email: user.email
      }, { withCredentials: true })

      getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")
    } catch (error) {
      console.log(error)
      toast.error("User Registration Failed")
    }
  }

  return (
    <div className='w-screen min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center pt-5'>
      <div className='w-full flex items-center gap-3 px-6 h-[60px] cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-8' src={Logo} alt="logo" />
        <h1 className='text-lg font-semibold'>OneCart</h1>
      </div>

      <div className='text-center mt-4 mb-6'>
        <h2 className='text-xl font-semibold'>Registration Page</h2>
        <p className='text-sm text-slate-300'>Welcome to OneCart, Place your order</p>
      </div>

      <div className='w-[90%] max-w-[480px] bg-[#00000025] border border-[#96969635] backdrop-blur-md rounded-lg shadow-lg p-6'>
        <form onSubmit={handleSignup} className='flex flex-col gap-4'>
          <div
            className='w-full py-3 bg-[#42656cae] hover:bg-[#567c83] rounded-lg flex items-center justify-center gap-3 text-sm md:text-base font-medium cursor-pointer'
            onClick={googleSignup}
          >
            <img src={google} alt="google" className='w-5 h-5' />
            Register with Google
          </div>

          <div className='flex items-center justify-center text-xs text-gray-300 gap-2'>
            <span className='h-px bg-gray-400 flex-1' />
            OR
            <span className='h-px bg-gray-400 flex-1' />
          </div>

          <input
            type="text"
            placeholder="UserName"
            required
            className='w-full h-[45px] px-4 rounded-md border border-[#96969635] bg-transparent text-sm placeholder-white font-semibold focus:outline-none shadow'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className='w-full h-[45px] px-4 rounded-md border border-[#96969635] bg-transparent text-sm placeholder-white font-semibold focus:outline-none shadow'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='relative'>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              className='w-full h-[45px] px-4 pr-10 rounded-md border border-[#96969635] bg-transparent text-sm placeholder-white font-semibold focus:outline-none shadow'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? (
              <IoEye className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(false)} />
            ) : (
              <IoEyeOutline className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(true)} />
            )}
          </div>

          <button
            type="submit"
            className='w-full h-[45px] bg-[#6060f5] hover:bg-[#4c4ce0] transition rounded-md flex items-center justify-center font-semibold mt-2'
          >
            {loading ? <Loading /> : "Create Account"}
          </button>

          <p className='text-xs text-center text-gray-400'>
            Already have an account?{" "}
            <span
              className='text-[#5555f6cf] font-semibold cursor-pointer hover:underline'
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Registration
