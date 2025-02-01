"use client"
import Auth_Header from '@/components/Header/page'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Signin = () => {

    const router = useRouter()
    return (
        <>

            <Auth_Header />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col max-md:min-h-[calc(100vh-68px)] max-[1300px]:p-[16px] max-[1300px]:min-h-[calc(100vh-79px)]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full'>
                    <ul className='flex space-x-1 mb-[55px] max-[1300px]:mb-[24px] items-center'>
                        <li>
                            <a href="/">
                                <img src="/img/home.svg" alt="home" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="/img/crumb-arrow.svg" alt="arrow" />
                            </a>
                        </li>
                        <li>
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14] '>
                                Login
                            </p>
                        </li>
                    </ul>
                </div>
                <div className='w-[90%] mx-auto max-[1400px]:w-full '>
                    <div className='max-w-[394px] mx-auto'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px] max-[1300px]:mb-[10px]'>Log in to your account</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px] max-[1300px]:mb-[16px]'>Welcome back! Please enter your details.</p>
                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px]'>
                            <div className='mb-[24px] last-of-type:mb-0'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Email</label>
                                <input type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                            </div>
                            <div className='mb-[10px] last-of-type:mb-0'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                <div className='relative flex items-center'>
                                    <input type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                                    <a href="#" className='absolute right-[10px]'>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </a>
                                </div>
                            </div>
                            <div className='mb-[10px] last-of-type:mb-0'>
                                <div className='flex items-center justify-between space-x-2'>
                                    <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                    <div className='flex items-center space-x-[4px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>Invalid Password</p></div>
                                </div>
                                <input type="text" className='border !border-[#EC1919] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full' />
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center space-x-[8px]'>
                                    <input id="check1" className="cursor-pointer block w-[14px] h-[14px] border-[#00000026] checked:!bg-[#1D1D1F] rounded-[4px] shadow-none !outline-none focus:ring-0 focus:outline-none" type="checkbox" name="termCheck" />
                                    <label htmlFor="check1" className='text-[12px] font-medium leading-[14px] text-[#151618CC] cursor-pointer'>Remember Password</label>
                                </div>
                                <a href="/login/forgot-password" className='text-[12px] font-medium leading-[14px] text-[#1D1D1F] hover:underline'>Forgot Password ?</a>
                            </div>
                            <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c]'>Sign In</Link>
                        </div>
                        <div className='flex items-center space-x-[4px] mt-[30px] justify-center max-[1300px]:mt-[16px]'>
                            <p className='text-[12px] font-medium leading-[14px] text-[#1516188F]'>Don't have an account?</p>
                            <Link href="/signup" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Signin
