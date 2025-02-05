import React from 'react'

export const Skeletonloader_homePage_layout3 = () => {
    return (
        <>
            <div
                class="gap-[13px] grid grid-cols-5 max-[410px]:grid-cols-1 max-[560px]:grid-cols-2 max-[860px]:grid-cols-3 mb-[84px] max-[1280px]:mb-[32px]">

                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse w-full">
                        <div className="bg-gray-300 rounded-[24px] w-full h-[278px]"></div>
                        <div className="h-[20px] bg-gray-300 rounded w-3/4 mt-4"></div>

                    </div>
                ))
                }
            </div>

        </>
    )
}
