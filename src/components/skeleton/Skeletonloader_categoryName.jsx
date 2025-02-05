import React from 'react'

export const Skeletonloader_categoryName = () => {
    return (
        <>
            <ul className='flex lg:flex-row flex-col gap-[30px] max-lg:gap-[16px] p-0 w-full lg:w-auto'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <li className='className="h-[16px] w-[45px]"'>
                    </li>
                ))
                }
            </ul>



        </>
    )
}
