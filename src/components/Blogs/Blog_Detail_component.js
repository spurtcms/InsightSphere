"use client";
import React from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import Header_component from "@/app/component/Header";
import { useRouter } from "next/navigation";
import { image_url } from "@/app/api/url";

const sanitizeHTML = (html) => {
  const sanitized = DOMPurify.sanitize(html, {
    // FORBID_TAGS: ['h1', 'img'], // Remove <h1> and <img> tags
    FORBID_ATTR: ["style"], // Remove inline styles for consistency
  });
  // Remove first <img> tag found in the sanitized HTML
  return sanitized
    .replace(/<br>/g, " ") // Replace <br> with spaces
    .replace(/<div className="card[^"]*"(.*?)<\/div>/g, "") // Remove specific <div> tags
    .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
    .replace(/<img[^>]*>/, ""); // Remove the first <img> tag, regardless of where it is
};

const Blog_Detail_component = ({ postes, Total_Blogs_api_result, params }) => {
  const Detail_Result = postes.ChannelEntryDetail;
  const total_blogs_arr =
    Total_Blogs_api_result?.ChannelEntriesList?.channelEntriesList;

  console.log("Total_Blogs_api_result", Detail_Result);

  let see_all_other_blogs = total_blogs_arr.filter(
    (item) => item.slug !== params
  );

  let currentIndex = total_blogs_arr.findIndex((item) => item.slug === params);

  // Find previous and next data
  let previousData = null;
  let nextData = null;

  // If currentIndex is not the first item, we can get the previous data
  if (currentIndex > 0) {
    previousData = total_blogs_arr[currentIndex - 1];
  }

  // If currentIndex is not the last item, we can get the next data
  if (currentIndex < total_blogs_arr.length - 1) {
    nextData = total_blogs_arr[currentIndex + 1];
  }

  console.log("Previous", previousData, nextData?.title); // Show previous data

  console.log("see_all_other_blogs", see_all_other_blogs);

  const router = useRouter();
  const currentURL = `https://spurtcms.com${router.asPath}`; // Replace with your actual domain

  // Social share URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentURL)}`,
    instagram: `https://www.instagram.com/?url=${encodeURIComponent(
      currentURL
    )}`, // Note: Instagram doesn't support direct sharing URLs
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentURL
    )}`,
  };

  return (
    <>
      <div>
        <Header_component />
        <section>
          <div className="mx-auto px-[16px] pt-[58px] max-[650px]:pt-[40px] pb-[50px] max-[750px]:pb-[40px] max-w-[1280px]">
            <div className="flex max-[750px]:flex-col justify-between items-start max-[750px]:items-center space-x-[16px] max-[750px]:space-x-[unset] max-[750px]:space-y-[32px]">
              <div className="flex flex-col items-start">
                <div className="flex flex-wrap gap-[6px] mb-[14px]">
                  {Detail_Result?.categories?.[0]?.map((val, i) => (
                    <>
                      {val?.categoryName == "Blog" ? (
                        <></>
                      ) : (
                        <>
                          <span className="flex justify-center items-center bg-[#EFEEF0] px-[12px] rounded-[50px] h-[28px] font-medium text-[#120B14] text-sm">
                            {val?.categoryName}
                          </span>
                        </>
                      )}
                    </>
                  ))}
                  {/* <span
                                        className="flex justify-center items-center bg-[#EFEEF0] px-[12px] rounded-[50px] h-[28px] font-medium text-[#120B14] text-sm">Idea</span>
                                    <span
                                        className="flex justify-center items-center bg-[#EFEEF0] px-[12px] rounded-[50px] h-[28px] font-medium text-[#120B14] text-sm">Review</span> */}
                </div>
                <h3 className="mb-[22px]  max-[750px]:max-w-full font-[700] text-[#120B14] text-[60px] max-[650px]:text-[32px] leading-[76px] max-[650px]:leading-[unset]">
                  {Detail_Result?.title}
                </h3>
                {/* <p className="mb-[51px] max-w-[50%] max-[750px]:max-w-full font-medium text-[#151618] text-[20px]">
                                    Nullam vel lectus vel
                                    velit pellentesque dignissim nec id
                                    magna. Cras molestie ornare quam at semper. Proin a ipsum
                                    ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet
                                    at sodales a, sollicitudin nec risus.</p> */}
                <div className="flex items-center space-x-[10px]">
                  <div className="flex items-center -space-x-4">
                    <div className="border-white border border-solid rounded-full w-[50px] h-[50px]">
                      <img
                        src={
                          image_url +
                            Detail_Result?.authorDetails.profileImagePath ||
                          "/img/no-image.png"
                        }
                        alt={Detail_Result?.title}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                          currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                        }}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                    {/* <div className="border-white border border-solid rounded-full w-[50px] h-[50px]">
                                            <img src="/img/stack-4.png" alt="" className="w-full h-full object-center" />
                                        </div> */}
                  </div>
                  <div className="flex flex-col space-y-[1px]">
                    <p className="font-normal text-[#151618] text-[13px]">
                      {`${Detail_Result?.authorDetails?.firstName} ${Detail_Result?.authorDetails?.lastName}`}
                    </p>
                    <p className="font-normal text-[#151618] text-[13px]">
                      {moment(Detail_Result?.createdOn).format("MMM DD, YYYY")}{" "}
                      - {Detail_Result?.readingTime}{" "}
                      {Detail_Result?.readingTime > 1 ? "minutes" : "minute"}{" "}
                      read
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="max-w-[417.5px]">
                

                                <img src={Detail_Result?.coverImage} alt={Detail_Result?.title}
                                    className="rounded-[20px] w-full h-auto"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                        currentTarget.src = "/img/no-image.png";  // Fallback to a default image
                                    }}
                                    style={{ width: "418px", height: "501px" }}
                                />

                            </div> */}
            </div>
          </div>

          <div className="border-[#1516183D] mx-auto mb-[93px] max-[650px]:mb-[40px] px-[16px] max-w-[1073px]">
            <div>
              <div
                className="pr-[12px] max-[700px]:pr-0 "
                style={{ color: "black" }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(Detail_Result?.description),
                }}
              ></div>
            </div>

            {/* <div className="flex flex-col items-start">
              <p className="mb-[19px] font-medium text-[#151618] text-sm">
                Share this post
              </p> */}
            {/* <div className="flex items-center bg-[#EFEEF0] rounded-[13px]">
                                <a href={shareUrls.twitter} target='_blank'
                                    className="flex justify-center items-center bg-transparent hover:bg-[#c9c9c9] hover:rounded-[13px] w-[59.61px] h-[59.61px]">
                                    <img src="/img/share-link-1.svg" alt="" className='w-[16px] h-[16px]' />
                                </a>
                                <a href={shareUrls.facebook} target='_blank'
                                    className="flex justify-center items-center bg-transparent hover:bg-[#c9c9c9] hover:rounded-[13px] w-[59.61px] h-[59.61px]"

                                >
                                    <img src="/img/share-link-2.svg" alt="" className='w-[16px] h-[16px]' />
                                </a>
                                <a href={shareUrls.instagram} target='_blank'
                                    className="flex justify-center items-center bg-transparent hover:bg-[#c9c9c9] hover:rounded-[13px] w-[59.61px] h-[59.61px]">
                                    <img src="/img/share-link-3.svg" alt="" className='w-[16px] h-[16px]' />
                                </a>
                                {/* <a href="#"
                                    className="flex justify-center items-center bg-transparent hover:bg-[#c9c9c9] hover:rounded-[13px] w-[59.61px] h-[59.61px]">
                                    <img src="/img/share-link-4.svg" alt="" />
                                </a> */}
            {/* </div>  */}
            {/* </div> */}
          </div>

          <div className="flex max-[650px]:flex-col justify-between items-center gap-[24px] border-y mx-auto px-[16px] py-[60px] border-solid max-w-[1280px]">
            {previousData && (
              <>
                <a
                  href={`/blog/${previousData?.slug}`}
                  className="flex items-center gap-[34px] group mr-auto"
                >
                  <div className="max-w-[156px]">
                    <img
                      src={previousData?.coverImage}
                      alt={previousData?.title}
                      className="rounded-[16px] w-full h-auto "
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                        currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                      }}
                      style={{ width: "160px", height: "180px" }}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="mb-[10px] font-medium text-[#120B14] text-sm">
                      Previous blog
                    </h3>
                    <p className="line-clamp-4 max-w-[319px] font-[700] text-[#120B14] text-[26px] group-hover:underline">
                      {previousData?.title}
                    </p>
                  </div>
                </a>
              </>
            )}
            {nextData && (
              <>
                <a
                  href={`/blog/${nextData?.slug}`}
                  className="flex flex-row-reverse items-center gap-[34px] group ml-auto"
                >
                  <div className="max-w-[156px]">
                    <img
                      className="rounded-[16px] w-full h-auto"
                      src={nextData?.coverImage}
                      alt={nextData?.title}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                        currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                      }}
                      style={{ width: "160px", height: "180px" }}
                    />
                  </div>
                  <div className="flex flex-col items-end">
                    <h3 className="mb-[10px] font-medium text-[#120B14] text-sm">
                      Next blog
                    </h3>
                    <p className="line-clamp-4 max-w-[319px] font-[700] text-[#120B14] text-[26px] text-end group-hover:underline">
                      {nextData?.title}
                    </p>
                  </div>
                </a>
              </>
            )}
          </div>
          <div className="border-[#1516183D] mx-auto px-4 pt-[24px] pb-[43px] border-b border-solid max-w-[1280px]">
            <h3 className="mb-[34px] font-[500] text-[#120B14] text-[18px]">
              You might <span className="font-[700]">also like</span>
            </h3>
            <div className="gap-[13px] grid grid-cols-5 max-[410px]:grid-cols-1 max-[560px]:grid-cols-2 max-[860px]:grid-cols-3 mb-[84px] max-[500px]:mb-[32px]">
              {/* <a href="#" className="group">
                                <div className="mb-[27px] rounded-[24px] w-full overflow-hidden">
                                    <img src="/img/blog-banner-1.png" alt=""
                                        className="group-hover:scale-[1.1] rounded-[24px] transition-all" />
                                </div>
                                <h3 className="font-[700] text-[#151618] text-[18px]">The trick to getting more done is to have the
                                    freedom to roam around</h3>
                            </a> */}

              {see_all_other_blogs.slice(0, 5)?.map((val, i) => (
                <>
                  <a href={`/blog/${val?.slug}`} className="group">
                    <div className="mb-[27px] rounded-[24px] w-full overflow-hidden">
                      {/* <img src="img/blog-banner-1.png" alt=""
                                                className="group-hover:scale-[1.1] grop-hover:scale-50 rounded-[24px] transition-all" /> */}

                      <img
                        src={val?.coverImage}
                        alt={val?.title}
                        className="group-hover:scale-[1.1] grop-hover:scale-50 rounded-[24px] transition-all"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                          currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                        }}
                        style={{ width: "240px", height: "278px" }}
                      />
                    </div>
                    <h3 className="font-[700] text-[#151618] text-[18px]">
                      {val?.title}
                    </h3>
                  </a>
                </>
              ))}
            </div>
            <div className="flex max-[680px]:flex-col justify-between items-center max-[680px]:items-start gap-4">
              <h3 className="max-w-[479px] font-light text-[#151618] text-[56px] max-[500px]:text-[32px]">
                See what we’ve
                <span className="font-[700]">written lately</span>
              </h3>
              <div className="relative w-full max-w-[360px] max-[680px]:max-w-full h-[56px]">
                <input
                  type="text"
                  className="border-0 bg-[#EBEBEB] focus:shadow-[unset] px-6 pr-[38%] rounded-[50px] rounded-[50px] focus:ring-[transparent] w-full w-full h-full h-full font-normal text-[#0000008F] text-base focus:outline-[transparent]"
                  placeholder="Your email address"
                />
                <a
                  href="#"
                  className="top-0 right-0 absolute flex justify-center items-center bg-[#120B14] hover:bg-[#382f3b] px-8 rounded-[50px] h-full font-[600] text-base text-white"
                >
                  Subscriber
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Blog_Detail_component;
