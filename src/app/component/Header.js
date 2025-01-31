"use client"
import React, { useEffect, useRef, useState } from 'react';
import { fetchGraphQl } from '../api/graphicql';
import { GET_HEADER_LOGO_QUERY, GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '../api/query';
import { header_slug_Reduc_function, Header_api_result_redux_function, Header_keyword_redux_function } from '@/StoreConfiguration/slices/customer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { image_url, logo_url } from '../api/url';



function Header_component({ }) {

    const [header_api_result, setheader_api_result] = useState(null);
    const [header_categorySlug, setheader_categorySlug] = useState()
    const [blog_keyword, setblog_keyword] = useState(""); // Error state

    const dispatch = useDispatch()

    const header_slug = useSelector((s) => s.customerRedux.header_slug)
    const headerapi_result_redux = useSelector((s) => s.customerRedux.header_api_result_redux)

    const router = useRouter()

    const [Blogs_list_api_result, setBlogs_list_api_result] = useState([]); // To store fetched data
    const [error, setError] = useState(null);      // To handle errors
    const [header_logo_result, setheader_logo_result] = useState(null);

    const [clickedValue, setClickedValue] = useState(""); // Stores event value
    const divRef = useRef(null); // Reference for the div


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setClickedValue(false);
            } else {
                setClickedValue(true);
            }
        };

        // Attach event listener
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };


    }, []);


    console.log("239823hj", Blogs_list_api_result)

    useEffect(() => {
        const fetchData = async () => {
            let variable_list = {
                entryFilter: {
                    categorySlug: "blog",

                },
                commonFilter: {
                    // limit: 10,
                    // offset: 0,
                    keyword: blog_keyword
                },
                AdditionalData: {
                    categories: true,
                    authorDetails: true,
                },
            };

            try {
                const data = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                setBlogs_list_api_result(data?.ChannelEntriesList?.channelEntriesList); // Update state with fetched data
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err); // Handle errors
            }
        };

        fetchData();
    }, [blog_keyword]); // Empty dependency array ensures this runs only once after the component mounts

    useEffect(() => {
        const fetchCategoryList = async () => {
            const variable_category = {
                tenantId: Blogs_list_api_result?.[0]?.tenantId

            };

            try {
                const fetchedCategoryList = await fetchGraphQl(GET_HEADER_LOGO_QUERY, variable_category);
                setheader_logo_result(fetchedCategoryList);
            } catch (err) {
                console.error("Error fetching category list:", err);
                setError(err.message);
            }
        };

        fetchCategoryList();
    }, [Blogs_list_api_result]); // Fetch the category list only once on component mount



    useEffect(() => {
        const fetchCategoryList = async () => {
            let variable_category = {
                "categoryFilter": {
                    "categoryGroupSlug": "blog",
                    "excludeGroup": true,
                    "hierarchyLevel": 2

                }
            }

            try {
                const fetchedCategoryList = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category);
                setheader_api_result(fetchedCategoryList?.CategoryList?.categorylist);
                dispatch(Header_api_result_redux_function(fetchedCategoryList?.CategoryList?.categorylist))
            } catch (err) {
                console.error("Error fetching category list:", err);
            }
        };

        fetchCategoryList();
    }, []); // Fetch the category list only once on component mount

    console.log("header_api_result", header_api_result)
    const handleClick_headerlist = (e, val) => {

        e.preventDefault();
        console.log("ewewe223", val)

        dispatch(header_slug_Reduc_function(val?.categorySlug))
        setheader_categorySlug(val?.categoryName)
        dispatch(Header_keyword_redux_function(""));
        setblog_keyword("");
    }

    const handleclick_logoimage = (e) => {
        e.preventDefault();
        dispatch(header_slug_Reduc_function("blog"))
        router.push(`/`)
        dispatch(Header_keyword_redux_function(""));
        setblog_keyword("");
    }

    const handlechange_blog_keyword = (e) => {
        e.preventDefault();
        setblog_keyword(e.target.value);
        dispatch(Header_keyword_redux_function(e.target.value)); // Dispatch action correctly

    };

    const handleClick_keyword = (e, val) => {
        router.push(`/blog/${val.slug}`);

    }


    console.log("clickedValue", clickedValue)

    return (
        <>
            <header>
                <div
                    class="flex justify-between items-center mx-auto px-[16px] max-w-[1280px] h-[120px] max-[1280px]:h-[60px]">
                    <div class="flex items-center space-x-6">
                        {/* <Link href={`/`} legacyBehavior> */}
                        <a onClick={(e) => handleclick_logoimage(e)} style={{ cursor: "pointer" }}>
                            {/* <img src={"/img/SpurtCMS-logo.svg"}
                                alt="" /> */}

                            <img src={logo_url + header_logo_result?.GeneralInformation?.logoPath}
                                alt={"companylogo"}

                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;  // Prevent infinite loop if fallback fails
                                    currentTarget.src = "/img/no-image.png";    // Fallback to a default image
                                }}
                                style={{ width: "120px", height: "30px" }}

                            />

                        </a>

                        {/* </Link> */}

                        <div class="relative w-full max-w-[400px] h-[47px]" ref={divRef}>
                            <input type="text"
                                class="border-0 bg-[#EBEBEB] focus:shadow-[unset] px-8 rounded-[50px] focus:ring-[transparent] w-full h-full font-normal text-[#0000008F] text-base focus:outline-[transparent]"
                                placeholder="search"
                                value={blog_keyword}
                                onChange={(e) => handlechange_blog_keyword(e)}
                            />
                            {clickedValue && <>
                                <div className='w-full z-[999] relative min-h-[64px] border border-[#cdcdcd70]  mt-2 rounded  p-[16px] flex flex-col items-center justify-start shadow-xl max-h-[300px] overflow-auto bg-white ' >
                                    <ul className='rounded '>

                                        {Blogs_list_api_result.length > 0 ? <>
                                            <li className='text-[12px] text-[#919090] mb-[10px]'>BLOGS</li>
                                            {Blogs_list_api_result?.map((val, i) => (
                                                <>
                                                    {/* <Link href={`/blog/${val?.slug}`} legacyBehavior> */}

                                                    <li className='text-[14px] mb-[10px] cursor-pointer'
                                                        onClick={(e) => handleClick_keyword(e, val)}
                                                    >{val?.title}</li>
                                                    {/* </Link> */}
                                                </>
                                            ))}
                                        </> : <>
                                            <li className='text-[12px] text-[#919090] mb-[10px] text-center flex items-center space-x-2'>No data found</li>
                                        </>}
                                    </ul>
                                    {/* <p className='text-[#555555] text-center flex items-center space-x-2'> No data found</p> */}
                                </div>
                            </>}
                        </div>
                    </div>
                    <div class="flex items-center space-x-[36px] max-[700px]:space-x-4">
                        <div
                            class="top-0 left-[-100%] z-10 lg:z-0 lg:static lg:static fixed flex flex-col lg:items-center gap-[1.5vw] bg-white lg:bg-[transparent] px-5 lg:px-0 py-5 lg:py-0 w-[50%] lg:w-auto max-[400px]:w-full h-full lg:h-auto duration-500 navLinks">
                            <ul class="flex lg:flex-row flex-col gap-[30px] lg:py-[20px] w-full lg:w-auto">
                                <li class="flex justify-end lg:hidden w-full">
                                    <a onclick="onMenuToggle(this)" class="ml-auto w-4 text-[30px] cursor-pointer">
                                        <img src="img/modal-close.svg" alt="" />
                                    </a>
                                </li>

                                {[undefined, null, ""].includes(header_api_result) ? <>

                                    {headerapi_result_redux?.map((val, i) => (
                                        <>

                                            {val?.categoryName == "Best stories" ? <></> : <>

                                                <li onClick={(e) => handleClick_headerlist(e, val)}>
                                                    <Link href={`/`} legacyBehavior>

                                                        <a
                                                            class={val?.categorySlug == header_slug ? "font-medium text-[#120B14] text-lg leading-[27px] active" : "font-medium text-[#120B14] text-base leading-[27px]"} >
                                                            {val.categoryName}</a>
                                                    </Link>
                                                </li>
                                            </>}
                                        </>
                                    ))}


                                </> : <>
                                    {header_api_result?.map((val, i) => (
                                        <>
                                            {val?.categoryName == "Best stories" ? <></> : <>
                                                <li onClick={(e) => handleClick_headerlist(e, val)}>
                                                    <Link href={`/`} legacyBehavior>

                                                        <a
                                                            class={val?.categorySlug == header_slug ? "font-medium text-[#120B14] text-lg leading-[27px] active" : "font-medium text-[#120B14] text-base leading-[27px]"} >
                                                            {val.categoryName}</a>
                                                    </Link>
                                                </li>
                                            </>}

                                        </>
                                    ))}
                                </>}
                            </ul>
                        </div>
                        <a href="#"
                            class="flex justify-center items-center bg-[#120B14] hover:bg-[#382f3b] px-[32px] max-[700px]:px-4 rounded-[50px] h-[47px] font-[700] text-base text-white whitespace-nowrap">
                            join now
                        </a>
                        <a onclick="onMenuToggle(this)"
                            class="lg:hidden mr-[20px] w-[24px] max-[500px]:w-[16px] text-[30px] cursor-pointer">
                            <img src="img/menu-black.svg" alt="" />
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header_component;


