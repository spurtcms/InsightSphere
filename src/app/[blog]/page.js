"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  GET_AUTHOR_LIST_QUERY,
  GET_POSTS_CHANNELLIST_QUERY,
  GET_POSTS_LIST_QUERY,
} from "../api/query";
import { fetchGraphQl } from "../api/graphicql";
import Header_component from "../component/Header";
import moment from "moment";
import { channelName, image_url } from "../api/url";
import { useSelector } from "react-redux";
import { loadManifestWithRetries } from "next/dist/server/load-components";
import SkeletonLoader_homepage from "@/components/skeleton/skeletonloader_homepage";
import { useRouter } from "next/router";
import { Skeletonloader_homePage_layout2 } from "@/components/skeleton/Skeletonloader_homePage_layout2";
import { Skeletonloader_homePage_layout3 } from "@/components/skeleton/Skeletonloader_homePage_layout3";
import useCarousel from "@/components/customComponent/useCarousel";
import Head from "next/head";

const Blog_Index = ({ home_page_description }) => {
  // const BlogCards_layout2_data = Listdata?.ChannelEntriesList?.channelEntriesList
  // const All_other_blogs_api_data = all_other_stories?.ChannelEntriesList?.channelEntriesList;

  const [BlogCards_layout2_data, setBlogCards_layout2_data] = useState([]); // Hydration state
  const [All_other_blogs_api_data, setAll_other_blogs_api_data] = useState([]); // Hydration state

  const [Best_stories_api_result, setBest_stories_api_result] = useState([]); // Hydration state
  const [page_loader, setpage_loader] = useState(false);
  const [page_loader_layout_2, setpage_loader_layout_2] = useState(false);
  const [page_loader_layout_3, setpage_loader_layout_3] = useState(false);

  // State definitions
  const [startIndex, setStartIndex] = useState(0); // For pagination or load more (if needed)
  const visibleCount = 3; // Number of items to show per load (adjust as needed)

  const [visibleCount_for_list, setvisibleCount_for_list] = useState(5); // Initially show 5 blogs

  const [isHydrated, setIsHydrated] = useState(false); // Hydration state

  const [Authors_api_result, setAuthors_api_result] = useState([]); // API result storage
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const { sliderRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useCarousel();

  const header_slug = useSelector((s) => s.customerRedux.header_slug);

  useEffect(() => {
    setpage_loader(true);
    const fetchData = async () => {
      const variable_list = {
        entryFilter: {
          categorySlug: "best-stories",
          ChannelName: channelName,
        },
        commonFilter: {
          // "limit": 10,
          // "offset": 0
        },
        AdditionalData: {
          categories: true,
          authorDetails: true,
        },
      };

      try {
        const Best_stories = await fetchGraphQl(
          GET_POSTS_LIST_QUERY,
          variable_list
        );
        setBest_stories_api_result(
          Best_stories?.ChannelEntriesList?.channelEntriesList
        );
        setpage_loader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setpage_loader(false);
      }
    };

    fetchData();
  }, []);

  // Fetch author list on component mount
  useEffect(() => {
    setIsHydrated(true);

    const fetchAuthors = async () => {
      setLoading(true); // Indicate loading has started

      const variable_get_authors_list = {
        id: BlogCards_layout2_data?.[0]?.tenantId,
      };

      try {
        const response = await fetchGraphQl(
          GET_AUTHOR_LIST_QUERY,
          variable_get_authors_list
        );

        setAuthors_api_result(response); // Update state with the response
      } catch (err) {
        console.error("Error fetching authors:", err);
        setError(err.message); // Store the error message
      } finally {
        setLoading(false); // Indicate loading has ended
      }
    };
    if (BlogCards_layout2_data?.[0]?.tenantId) {
      fetchAuthors();
    }
  }, [BlogCards_layout2_data]);

  useEffect(() => {
    setpage_loader_layout_3(true);
    const fetchData = async () => {
      try {
        let variable_list = {
          entryFilter: {
            categorySlug: header_slug || "blog",
            ChannelName: channelName,
          },
          commonFilter: {
            limit: 10,
            offset: 0,
          },
          AdditionalData: {
            categories: true,
            authorDetails: true,
          },
          sort: {
            sortBy: "en.created_on",
          },
        };

        const data = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);

        setAll_other_blogs_api_data(
          data?.ChannelEntriesList?.channelEntriesList
        ); // Set the fetched data into state
        setpage_loader_layout_3(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setpage_loader_layout_3(false);
      }
    };
    if (header_slug) {
      fetchData();
    }
  }, [header_slug]); // Empty dependency array to run on component mount

  useEffect(() => {
    const fetchData = async () => {
      setpage_loader_layout_2(true);

      const variable_list = {
        entryFilter: {
          categorySlug: header_slug || "blog",
          ChannelName: channelName,
        },
        commonFilter: {
          limit: 10,
          offset: 0,
        },
        AdditionalData: {
          categories: true,
          authorDetails: true,
        },
        sort: {
          sortBy: "en.created_on",
          order: 1,
        },
      };

      try {
        const Best_stories = await fetchGraphQl(
          GET_POSTS_LIST_QUERY,
          variable_list
        );
        setBlogCards_layout2_data(
          Best_stories?.ChannelEntriesList?.channelEntriesList
        );

        setpage_loader_layout_2(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (header_slug) {
      fetchData();
    }
  }, [header_slug]);

  if (!isHydrated) return null; // Avoid rendering until hydration

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    setvisibleCount_for_list((prevCount) => prevCount + 3); // Load next 5
  };

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <div>
        <Header_component />

        <section>
          {/* <div className="border-[#1516183D] mx-auto px-[16px] pt-[41px] pb-[68px] max-[1280px]:pb-[32px] border-b border-solid max-w-[1280px]">
            <h1 className="mb-[61px] max-w-[1005px] font-light text-[#151618] text-[80px] max-[500px]:text-[48px] leading-[100px] max-[500px]:leading-[normal]">
              <span className="font-[700]">
                {
                  home_page_description?.CategoryList?.categorylist?.[0]
                    ?.description
                }
              </span>
            </h1>
          </div> */}
          <div className="mx-auto mb-[105px] max-[998px]:mb-[28px] px-[16px] max-w-[1295px]">
            <h2 className="font-normal text-[66px] max-[500px]:text-[28px] max-[998px]:text-[48px] leading-[1.2]">
              {/* <span className="font-[700]">This is SpurtCMS.</span> We are a community
                            that celebrates contemporary <span className="font-[700]">culture
                                focused</span> on technology, design, art and
                            web. */}
              {/* <span className="font-[700] ">{homePageDescription?.CategoryList?.categorylist?.[0]?.description}</span> */}
              <span className="font-[700]">This is SpurtCMS. </span>
              We are cummunity that celebrates contemporary,{" "}
              <span className="font-[700]">
                Culture focused on technology, design, art and web.
              </span>
              {/* {
                  home_page_description?.CategoryList?.categorylist?.[0]
                    ?.description
                } */}
            </h2>
          </div>

          <div className="border-[#1516183D] mx-auto px-[16px] pt-[21px] max-[1440px]:pr-0 pb-[107px] max-[1280px]:pb-[40px] border-b border-solid max-w-[1280px]">
            <div className="flex justify-between items-center mb-[40px]">
              <h4 className="font-normal text-[#151618CC] text-[18px]">
                Get Started with our{" "}
                <span className="font-[700]">Best Stories</span>
              </h4>
              <div
                className="flex items-center space-x-1 max-[1440px]:pr-[16px] max-sm:hidden"
                style={{
                  display: Best_stories_api_result?.length > 1 ? "" : "none",
                }}
              >
                <a
                  onClick={scrollLeft}
                  className={`cursor-pointer ${
                    !canScrollLeft && "pointer-events-none"
                  }`}
                >
                  <img
                    src={
                      canScrollLeft
                        ? "img/arrow-left-line.svg"
                        : "img/arrow-left-disable.svg"
                    }
                    alt="Previous"
                  />
                </a>

                <a
                  onClick={scrollRight}
                  className={`cursor-pointer ${
                    !canScrollRight && "pointer-events-none"
                  }`}
                >
                  <img
                    src={
                      canScrollRight
                        ? "img/arrow-right-line.svg"
                        : "img/arrow-right-disable.svg"
                    }
                    alt="Next"
                  />
                </a>
              </div>
            </div>

            {Best_stories_api_result?.length == 0 ? (
              <div className="flex space-x-[28px] scroll-invisible overflow-hidden justify-center">
                <div className="flex space-x-[28px] items-center justify-center">
                  <p className="text-xl font-semibold text-[#151618CC] text-center">
                    No data found
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="flex space-x-[28px] scroll-invisible overflow-hidden max-sm:overflow-auto"
                ref={sliderRef}
              >
                <div className="flex space-x-[28px] transition-transform duration-300">
                  {Best_stories_api_result?.map((val, i) => (
                    <a
                      key={i}
                      href={`/blog/${val?.slug}`}
                      className="w-[360px] min-w-[360px]  group max-sm:w-[300px] max-sm:min-w-[300px] "
                    >
                      <div className="relative mb-[35px] rounded-[24px] w-full overflow-hidden">
                        <img
                          src={val?.coverImage}
                          alt={val?.title}
                          className="group-hover:scale-[1.1] rounded-[24px] w-full transition-all h-[418px] object-cover"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/img/no-image.png";
                          }}
                        />
                        <div className="bottom-[15px] left-[15px] absolute flex items-center -space-x-3">
                          <div className="inline-block relative border-2 border-white rounded-full w-[28px] h-[28px] object-center object-cover">
                            <img
                              src={
                                image_url + val?.authorDetails?.profileImagePath
                              }
                              alt={`${val?.firstName} ${val?.lastName}`}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/img/no-image.png";
                              }}
                              style={{ borderRadius: "50%" }}
                            />
                          </div>
                        </div>
                      </div>
                      <h3 className="mb-[12px] font-[700] text-[24px] text-[#151618]">
                        {val?.title}
                      </h3>
                      {val?.description && (
                        <p
                          className="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                          dangerouslySetInnerHTML={{
                            __html:
                              val?.description
                                ?.replaceAll("<br>", " ")
                                ?.replace(/<\/?[^>]+(>|$)/g, "")
                                ?.split(/\s+/)
                                ?.slice(0, 35)
                                ?.join(" ") + "...",
                          }}
                        ></p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-[#1516183D] mx-auto px-4 pt-[49px] pb-[74px] max-[1280px]:pb-[32px] border-b border-solid max-w-[1280px]">
            <div className="flex max-md:flex-col justify-between items-center max-md:items-start gap-4 mb-[45px]">
              <h3 className="max-[560px]:mr-auto max-w-[500px] font-light text-[#151618] text-[56px] max-[500px]:text-[32px]">
                See what
                <p>
                  we’ve<span className="font-[700]"> written lately</span>
                </p>
              </h3>
              <div className="flex flex-col items-end space-y-[9px]">
                <div className="flex items-center -space-x-5">
                  {Authors_api_result?.TopAuthorsList?.slice(0, 5).map(
                    (val, i) => (
                      <a
                        key={i}
                        // href="#"
                        className="inline-block relative z-[5] border-2 border-white rounded-full w-[80px] h-[80px] object-center object-cover"
                      >
                        {/* <img
                                                src="img/stack-1.png"
                                                alt="" /> */}

                        <img
                          src={image_url + val?.profileImagePath}
                          alt={`${val?.firstName} ${val?.lastName}`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                            currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                          }}
                          style={{
                            width: "76px",
                            height: "76px",
                            borderRadius: "50%",
                          }}
                        />
                      </a>
                    )
                  )}
                </div>
                <p className="font-medium text-[#151618CC] text-sm">
                  Meet our top authors
                </p>
              </div>
            </div>
            {page_loader_layout_2 ? (
              <>
                <Skeletonloader_homePage_layout2 />
              </>
            ) : (
              <>
                {[undefined, null, 0, ""].includes(
                  BlogCards_layout2_data?.length
                ) ? (
                  <>
                    <div className="flex space-x-[28px] scroll-invisible overflow-hidden justify-center">
                      <div className="flex items-center justify-center ">
                        <p className="text-xl font-semibold text-[#151618CC] text-center">
                          No data found
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="gap-[22px] grid grid-cols-3 max-[530px]:grid-cols-1 max-[680px]:grid-cols-2 mb-[74px] max-[1280px]:mb-[32px]">
                      {BlogCards_layout2_data?.slice(
                        0,
                        visibleCount_for_list
                      )?.map((val, index) => (
                        <Fragment key={index}>
                          <a
                            href={`/blog/${val?.slug}`}
                            className="w-full group"
                          >
                            <div className="relative mb-[35px] rounded-[24px] w-full overflow-hidden">
                              <img
                                src={val?.coverImage}
                                alt={val?.title}
                                className="group-hover:scale-[1.1] rounded-[24px] w-full transition-all h-[418px] object-cover"
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                                  currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                                }}
                              />

                              <div className="bottom-[15px] left-[15px] absolute flex items-center -space-x-3">
                                <div className="inline-block relative border-2 border-white rounded-full w-[40px] h-[40px] object-center object-cover ">
                                  <img
                                    src={
                                      image_url +
                                      val?.authorDetails?.profileImagePath
                                    }
                                    alt={`${val?.firstName} ${val?.lastName}`}
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                                      currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                                    }}
                                    style={{ borderRadius: "50%" }}
                                  />
                                </div>
                                {/* <div
                                                    className="inline-block relative border-2 border-white rounded-full w-[40px] h-[40px] object-center object-cover">
                                                    <img src="img/stack-3.png" alt="" />
                                                </div> */}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-[6px] mb-[18px]">
                              {val?.categories?.[0]?.map((val, i) => (
                                <Fragment key={i}>
                                  {val?.categoryName == "Blog" ? (
                                    <></>
                                  ) : (
                                    <>
                                      <div className="flex items-center bg-[#EFEEF0] px-[12px] rounded-[50px] h-[28px]">
                                        <span className="font-normal text-[#120B14] text-sm">
                                          {val?.categoryName}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </Fragment>
                              ))}
                            </div>
                            <h3 className="mb-[12px] font-[700] text-[24px] text-[#151618]">
                              {val?.title}
                            </h3>

                            {val?.description ? (
                              <p
                                className="line-clamp-4 font-inter font-normal text-[#131313] text-base leading-[24px]"
                                dangerouslySetInnerHTML={{
                                  __html: val?.description
                                    ?.replaceAll("<br>", " ") // Replace <br> tags with spaces
                                    .replaceAll(
                                      /<div className="card[^"]*"(.*?)<\/div>/g,
                                      ""
                                    ) // Remove specific <div> tags
                                    .replaceAll(/<img[^>]*>/g, "") // Remove all <img> tags
                                    .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
                                    .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
                                    .split(/\s+/) // Split text into words
                                    .slice(0, 35) // Limit to the first 100 words
                                    .join(" ") // Join the words back into a string
                                    .concat("..."), // Add ellipsis if text is truncated
                                  // .substring(0, 100) // Take the first 1000 characters (approx. for 100 words)
                                }}
                              ></p>
                            ) : (
                              <></>
                            )}
                          </a>
                        </Fragment>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            <div className="flex justify-center">
              {visibleCount_for_list < BlogCards_layout2_data?.length && (
                <a
                  className="flex justify-center items-center bg-[#120B14] hover:bg-[#382f3b] px-[32px] rounded-[50px] h-[47px] font-[600] text-base text-white cursor-pointer"
                  onClick={handleLoadMore}
                >
                  Load more
                </a>
              )}
            </div>
          </div>

          <div className="border-[#1516183D] mx-auto px-4 pt-[24px] pb-[43px] border-b border-solid max-w-[1280px]">
            <h3 className="mb-[32px] font-[700] text-[#120B14] text-[20px]">
              Recommended
            </h3>
            {page_loader_layout_3 ? (
              <>
                <Skeletonloader_homePage_layout3 />
              </>
            ) : (
              <>
                {[undefined, null, 0, ""].includes(
                  All_other_blogs_api_data?.length
                ) ? (
                  <>
                    <div className="flex space-x-[28px] scroll-invisible overflow-hidden justify-center">
                      <div className="flex items-center justify-center ">
                        <p className="text-xl font-semibold text-[#151618CC] text-center">
                          No data found
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="gap-[13px] grid grid-cols-5 max-[410px]:grid-cols-1 max-[560px]:grid-cols-2 max-[860px]:grid-cols-3 mb-[84px] max-[1280px]:mb-[32px]">
                      {All_other_blogs_api_data?.slice(0, 5)?.map((val, i) => (
                        <Fragment key={i}>
                          <a href={`/blog/${val?.slug}`} className="group">
                            <div className="mb-[27px] rounded-[24px] w-full overflow-hidden">
                              <img
                                src={val?.coverImage}
                                alt={val?.title}
                                className="group-hover:scale-[1.1] grop-hover:scale-50 rounded-[24px] transition-all"
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                                  currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                                }}
                                style={{
                                  width: "240px",
                                  height: "278px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <h3 className="font-[700] text-[#151618] text-[18px]">
                              {val?.title}
                            </h3>
                          </a>
                        </Fragment>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog_Index;
