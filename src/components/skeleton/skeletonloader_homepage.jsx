// components/SkeletonLoader.js
const SkeletonLoader_homepage = () => {
    return (

        <div class="flex space-x-[28px] scroll-invisible overflow-hidden">

            {[...Array(3)].map((_, index) => (
                <div key={index} className="w-[360px]">
                    <div className="h-[200px] bg-gray-300 rounded-[24px] mb-4" style={{ width: "360px", height: "418px" }}></div>
                    <div className="h-[20px] bg-gray-300 rounded-full w-1/2 mb-2"></div>
                    <div className="h-[16px] bg-gray-300 rounded-full w-full mb-2"></div>
                    <div className="h-[16px] bg-gray-300 rounded-full w-3/4"></div>
                </div>
            ))}

        </div>
    );
};

export default SkeletonLoader_homepage;
