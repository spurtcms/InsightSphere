import React from 'react'

export const Skeletonloader_homePage_layout2 = () => {
    return (
        <>
            <div
                class="gap-[22px] grid grid-cols-3 max-[530px]:grid-cols-1 max-[680px]:grid-cols-2 mb-[74px] max-[1280px]:mb-[32px]">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse w-full">
                        <div className="bg-gray-300 rounded-[24px] w-full h-[418px]"></div>
                        <div className="h-[20px] bg-gray-300 rounded w-3/4 mt-4"></div>
                        <div className="h-[16px] bg-gray-300 rounded w-2/3 mt-2"></div>
                    </div>
                ))
                }
            </div>

        </>
    )
}
