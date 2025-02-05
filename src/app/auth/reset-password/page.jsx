import React from "react";

const ResetPassword = () => {




    return (
        <div>

            {/* password reset*/}

            <div className='max-w-[394px] mx-auto mb-[24px]'>
                <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Password Reset</h1>
                <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px]'>Your password has been successfully reset.
                    click below to login  </p>
                <Link href="/" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[30px] rounded-[4px] text-center hover:bg-[#28282c] max-w-[334px] mx-auto'>Continue</Link>
                <div className="flex items-center space-x-[4px] mt-[30px] justify-center"><p className="text-[12px] font-medium leading-[14px] text-[#1516188F]">Back to</p><Link href="/auth/login" className="text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]">Login</Link></div>

            </div>

        </div>
    )

}
export default ResetPassword