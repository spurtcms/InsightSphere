import Auth_Header from '@/components/Header/page';
import Link from 'next/link';
import React from 'react';

const Signup = () => {
    return (
        <>
            <Auth_Header />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col
             max-md:min-h-[calc(100vh-68px)] max-xl:min-h-[calc(100vh-79px)] max-[1300px]:p-[16px]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full mb-[27px] max-[1300px]:mb-[14px]'>
                    <ul className='flex space-x-1 items-center'>
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
                                Sign up
                            </p>
                        </li>
                    </ul>
                </div>
                <div className='w-[90%] mx-auto max-[1400px]:w-full '>
                    <div className='max-w-[394px] mx-auto'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[24px] max-[1300px]:mb-[8px] max-[1300px]:text-[32px] max-[1300px]:leading-none '>Create an account</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px] max-[1300px]:mb-[16px] max-sm:text-[14px] '>Thankyou for choosing us. Give your details</p>

                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-[1300px]:p-[16px]'>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[14px]'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>User name</label>
                                <input placeholder='Eg: Steve Job' type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[14px]'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Email</label>
                                <input placeholder='Enter your Email' type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[14px]'>
                                <div className='flex items-center justify-between space-x-2'>
                                    <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Email ID</label>
                                    <div className='flex items-center space-x-[4px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>Invalid Email ID</p></div>
                                </div>
                                <input type="text" className='border !border-[#EC1919] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full' />
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[14px]'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                <div className='relative flex items-center'>
                                    <input placeholder="Enter your Password" type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                                    <a href="#" className='absolute right-[10px]'>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </a>
                                </div>
                                <p className="text-[12px] font-medium leading-[14px] text-[#1516188F] mt-[10px]">Must be less than 8 characters</p>
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[14px]'>
                                <div className='flex items-center justify-between space-x-2'>
                                    <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                </div>
                                <input type="text" className='border !border-[#EC1919] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full' />
                                <div className='flex items-start space-x-[4px] mt-[10px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>Password must be more than 8 Character and contain at least 1
                                    number and 1 special charcter </p></div>
                            </div>

                            <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c] max-[1300px]:mt-[16px]'>Getting started</Link>

                        </div>

                        <div className='flex items-center space-x-[4px] mt-[30px] justify-center max-[1300px]:mt-[16px]'>
                            <p className='text-[12px] font-medium leading-[14px] text-[#1516188F]'>Already have an account ?</p>
                            <Link href="/login" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'>Log In</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
