import Auth_Header from '@/components/Header/page';
import Link from 'next/link';
import React from 'react';

const Forgot_Password = () => {
    return (
        <>
            <Auth_Header />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col max-md:min-h-[calc(100vh-68px)] max-[1300px]:min-h-[calc(100vh-79px)] max-[1300px]:p-[16px]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full mb-auto'>
                    <ul className='flex space-x-1 mb-[55px] max-[1300px]:mb-[24px] items-center'>
                        <li>
                            <Link href="/">
                                <img src="/img/home.svg" alt="home" />
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <Link href="/login" className='text-[14px] font-normal leading-4 text-[#151618CC] hover:underline'>
                                Login
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14] '>
                                Forgot password
                            </p>
                        </li>
                    </ul>
                </div>
                <div className='w-[90%] mx-auto max-[1400px]:w-full mb-auto'>

                    <div className='max-w-[394px] mx-auto mb-[24px]'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Forgot Password ?</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px] max-[1300px]:mb-[16px]'>No worries, we will send reset instruction</p>
                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-w-[394px] mx-auto'>
                            <div className='mb-[24px] last-of-type:mb-0'>
                                <input placeholder='Enter your registered Email ID ' type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                            </div>
                            <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c]'>Verify</Link>
                        </div>
                        <div className='flex items-center space-x-[4px] mt-[30px] justify-center'>
                            <p className='text-[12px] font-medium leading-[14px] text-[#1516188F]'>Back to</p>
                            <Link href="/login" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'>Login</Link>
                        </div>
                    </div>

                    {/* checkmail */}
                    <div className='max-w-[394px] mx-auto mb-[24px]'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Check Your Email</h1>
                        <p className='text-base font-medium leading-[20px] text-[#83838D] text-center mb-[40px]'>We sent password reset link to <span className='text-[#33333C]'>kishpicco@gmail.com</span></p>
                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-w-[394px] mx-auto'>
                            <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF]  rounded-[4px] text-center hover:bg-[#28282c]'>Open email app</Link>
                            <div className='flex items-center space-x-[4px] mt-[24px] justify-center'>
                                <p className='text-[12px] font-medium leading-[14px] text-[#1516188F]'>Back to</p>
                                <Link href="/login" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'>Login</Link>
                            </div>
                        </div>

                    </div>

                    {/* new password */}
                    <div className='max-w-[394px] mx-auto mb-[24px]'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Set New Password</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px] max-[1300px]:mb-[16px]'>Your new password must be different to previously passwords </p>
                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-w-[394px] mx-auto max-[1300px]:p-[16px]'>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[16px]'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                <div className='relative flex items-center'>
                                    <input type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                                    <a href="#" className='absolute right-[10px]'>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </a>
                                </div>
                                <p className='text-[12px] font-medium leading-[14px] text-[#1516188F] mt-[10px]'>Must be less than 8 characters</p>
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[16px]'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Confirm password</label>
                                <div className='relative flex items-center'>
                                    <input type="text" className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] ' />
                                    <a href="#" className='absolute right-[10px]'>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </a>
                                </div>
                            </div>

                            <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c]'>Reset password</Link>
                        </div>
                        <div className="flex items-center space-x-[4px] mt-[30px] justify-center max-[1300px]:mt-[16px]"><p className="text-[12px] font-medium leading-[14px] text-[#1516188F]">Back to</p><Link href="/login" className="text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]">Login</Link></div>

                    </div>

                    {/* password reset*/}
                    <div className='max-w-[394px] mx-auto mb-[24px]'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Password Reset</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px]'>Your password has been successfully reset.
                            click below to login  </p>
                        <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[30px] rounded-[4px] text-center hover:bg-[#28282c] max-w-[334px] mx-auto'>Continue</Link>
                        <div className="flex items-center space-x-[4px] mt-[30px] justify-center"><p className="text-[12px] font-medium leading-[14px] text-[#1516188F]">Back to</p><Link href="/login" className="text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]">Login</Link></div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Forgot_Password;
