"use client"
import React, { useState } from 'react';

const Auth_Header = () => {

    const [open, setopen] = useState(false);
    return (
        <header className='p-[36px_16px] bg-white h-[120px] max-md:h-[68px] max-xl:h-[79px]  max-xl:p-[16px]'>
            <div className='flex items-center justify-between space-x-4 w-[90%] mx-auto max-[1400px]:w-full'>
                <div className='flex items-center space-x-[24px] max-[1400px]:space-x-[16px]'>
                    <a href="/" className='max-sm:max-w-[100px]'>
                        <img src="/img/logo.svg" alt="logo" />
                    </a>
                    <div className='w-full max-w-[387px] max-sm:hidden'>
                        <input type="text" placeholder='Search' className='bg-[#EBEBEB] rounded-[50px] p-[10px_32px] text-base font-normal leading-[27px] text-[#0000008F] w-full max-md:p-[10px] max-md:leading-none  max-md:text-sm border-none' />
                    </div>
                </div>

                <div className='flex items-center space-x-[40px] max-[1400px]:space-x-[16px]'>

                    <ul className={`flex space-x-[30px] max-[1400px]:space-x-[16px]  max-lg:flex-col max-lg:fixed max-lg:h-screen max-lg:top-0 max-lg:bg-white max-lg:w-[50vw] max-lg:right-0 max-lg:shadow-lg max-lg:p-[24px_16px_16px_16px] max-lg:rounded-[30px_0_0_0] max-lg:space-x-0 max-lg:space-y-[16px] max-sm:w-full z-50 transition-all duration-300 ${open? "max-lg:translate-x-0" : "max-lg:translate-x-full"} `}>
                        <a href="#" onClick={(e) => setopen(!open)} className='max-lg:block hidden absolute top-[16px] right-[16px]'><img src="/img/menu-close.svg" alt="close" className='w-[16px]' /></a>
                        <li>
                            <a href="#" className='text-base font-medium text-[#120B14] leading-[27px] hover:underline whitespace-nowrap'>Demos</a>
                        </li>
                        <li>
                            <a href="#" className='text-base font-medium text-[#120B14] leading-[27px] hover:underline whitespace-nowrap'>Demos</a>
                        </li>
                        <li>
                            <a href="#" className='text-base font-medium text-[#120B14] leading-[27px] hover:underline whitespace-nowrap'>About us</a>
                        </li>
                        <li>
                            <a href="#" className='text-base font-medium text-[#120B14] leading-[27px] hover:underline whitespace-nowrap'>Style guide</a>
                        </li>
                        <li>
                            <a href="#" className='text-base font-medium text-[#120B14] leading-[27px] hover-underline 
                             whitespace-nowrap flex space-x-[4px] items-center min-w-[118px]'> Membership <img src="/img/membership-arrow.svg" alt="arrow" /></a>
                        </li>
                    </ul>

                    <a href="#" className='p-[10px_32px] inline-block rounded-[50px] text-base font-semibold leading-[27px]
                     text-[#FFFFFF] bg-[#120B14] whitespace-nowrap max-md:p-[10px] max-md:leading-none  max-md:text-sm hover:bg-[#28282c] max-sm:!ml-0'>Join Now</a>

                    <div className='w-[24px] max-lg:grid hidden' onClick={(e) => setopen(!open)}>
                        <img src="/img/menu-button.svg" alt="menu" />
                    </div>

                </div>


            </div>
        </header>
    );
};

export default Auth_Header;
