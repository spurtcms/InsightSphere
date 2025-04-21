"use client";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  header_slug_Reduc_function,
  Header_api_result_redux_function,
  Header_keyword_redux_function,
  Header_logo_api_result_redux_function,
} from "@/StoreConfiguration/slices/customer";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { channelName, image_url, logo_url } from "../api/url";
import { Login_token, NameString, UniqueId } from "../api/clientactions";
import { fetchGraphQl } from "../api/graphicql";
import {
  GET_HEADER_LOGO_QUERY,
  GET_POSTS_CHANNELLIST_QUERY,
  GET_POSTS_LIST_QUERY,
  GET_USER_DETAILS,
} from "../api/query";

function Header_component() {
  const [login_Header, setLogin_Header] = useState(false);
  const pathname = usePathname();
  const getToken = Login_token();
  const [token, setToken] = useState("");
  const profile_image = image_url;
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [registered, setRegistered] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [profileData, setProfileData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const imagUrl = image_url;
  const nameStringData = NameString();

  const Id = UniqueId();
  useEffect(() => {
    const fetchData = async () => {
      let variable = {
        id: Id,
      };
      try {
        if (Id !== null) {
          const data = await fetchGraphQl(GET_USER_DETAILS, variable);
          setUserDetails(data?.MemberProfileDetails?.profileImagePath);
          setProfileData(data?.MemberProfileDetails);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setErrorMessage(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setRegistered(getToken);
  }, []);

  useEffect(() => {
    const loginPath = [
      "/auth/signup",
      "/auth/signin",
      "/auth/reset-password",
      "/auth/forgot-password",
      "/auth/change-password",
      "/change-password",
    ];
    setLogin_Header(loginPath.includes(pathname));
  }, [pathname]); // Determines login header state

  const [menuToggle, setMenuToggle] = useState(false);

  const dispatch = useDispatch();

  const header_slug = useSelector((s) => s.customerRedux.header_slug);
  const headerapi_result_redux = useSelector(
    (s) => s.customerRedux.header_api_result_redux
  );
  const header_logoapi_result_redux = useSelector(
    (s) => s.customerRedux.Header_logo_api_result_redux
  );

  const router = useRouter();

  // Memoized state for fetched data
  const [Blogs_list_api_result, setBlogs_list_api_result] = useState([]);
  const memoizedBlogsList = useMemo(
    () => Blogs_list_api_result,
    [Blogs_list_api_result]
  );

  // Memoized state for header API results
  const [header_api_result, setheader_api_result] = useState(null);
  const memoizedHeaderApiResult = useMemo(
    () => header_api_result,
    [header_api_result]
  );

  // Memoized state for logo
  const [header_logo_result, setheader_logo_result] = useState(null);
  const memoizedHeaderLogoResult = useMemo(
    () => header_logo_result,
    [header_logo_result]
  );

  // Memoized error state
  const [error, setError] = useState(null);
  const memoizedError = useMemo(() => error, [error]);

  // Memoized category slug
  const [header_categorySlug, setheader_categorySlug] = useState();
  const memoizedCategorySlug = useMemo(
    () => header_categorySlug,
    [header_categorySlug]
  );

  // Memoized blog keyword
  const [blog_keyword, setblog_keyword] = useState("");
  const memoizedBlogKeyword = useMemo(() => blog_keyword, [blog_keyword]);

  // Memoized clicked value
  const [clickedValue, setClickedValue] = useState("");
  const memoizedClickedValue = useMemo(() => clickedValue, [clickedValue]);

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
  useEffect(() => {
    const fetchCategoryList = async () => {
      let variable_category = {
        categoryFilter: {
          categoryGroupSlug: "blog",
          excludeGroup: true,
          hierarchyLevel: 2,
        },
      };

      try {
        const fetchedCategoryList = await fetchGraphQl(
          GET_POSTS_CHANNELLIST_QUERY,
          variable_category
        );

        setheader_api_result(fetchedCategoryList?.CategoryList?.categorylist);
        dispatch(
          Header_api_result_redux_function(
            fetchedCategoryList?.CategoryList?.categorylist
          )
        );
      } catch (err) {
        console.error("Error fetching category list:", err);
      }
    };

    fetchCategoryList();
  }, []); // Fetch the category list only once on component mount

  useEffect(() => {
    const fetchData = async () => {
      let variable_list = {
        entryFilter: {
          categorySlug: "blog",
          ChannelName: channelName,
        },
        commonFilter: {
          // limit: 10,
          // offset: 0,
          keyword: blog_keyword,
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
        tenantId: header_api_result?.[0]?.tenantId,
      };

      try {
        const fetchedCategoryList = await fetchGraphQl(
          GET_HEADER_LOGO_QUERY,
          variable_category
        );

        setheader_logo_result(fetchedCategoryList);
        fetchedCategoryList &&
          dispatch(Header_logo_api_result_redux_function(fetchedCategoryList));
      } catch (err) {
        console.error("Error fetching category list:", err);
        setError(err.message);
      }
    };

    fetchCategoryList();
  }, [header_api_result]); // Fetch the category list only once on component mount

  const handleClick_headerlist = (e, val) => {
    e.preventDefault();

    dispatch(header_slug_Reduc_function(val?.categorySlug));
    setheader_categorySlug(val?.categoryName);
    dispatch(Header_keyword_redux_function(""));
    setblog_keyword("");
  };

  const handleclick_logoimage = (e) => {
    e.preventDefault();
    dispatch(header_slug_Reduc_function("blog"));
    router.push(`/`);
    dispatch(Header_keyword_redux_function(""));
    setblog_keyword("");
  };

  const handlechange_blog_keyword = (e) => {
    e.preventDefault();
    setblog_keyword(e.target.value);
    dispatch(Header_keyword_redux_function(e.target.value)); // Dispatch action correctly
  };

  const handleClick_keyword = (e, val) => {
    router.push(`/blog/${val.slug}`);
  };

  const handleClick_signup = (e) => {
    router.push("/auth/signup");
  };

  const handleProfile = () => {
    router.push("/auth/my-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRegistered("");
    localStorage.removeItem("Id");
    localStorage.removeItem("NameString");
    router.push("/");
  };

  return (
    <>
      <header className="p-[36px_16px] h-[120px] max-md:h-[68px] max-xl:h-[79px]  max-xl:p-[16px] bg-white">
        <div
          className={`flex justify-between items-center mx-auto gap-4  ${
            login_Header
              ? "max-w-[90%] max-[1400px]:max-w-full"
              : "max-w-[1280px]"
          } `}
        >
          <div className="flex items-center space-x-6 w-full">
            {/* <Link href={`/`} legacyBehavior> */}
            <a
              onClick={(e) => handleclick_logoimage(e)}
              style={{ cursor: "pointer" }}
            >
              {/* <img src={"/img/SpurtCMS-logo.svg"}
                                alt="" /> */}

              {header_logo_result != null ? (
                <img
                  src={
                    logo_url + header_logo_result?.GeneralInformation?.logoPath
                  }
                  alt={"companylogo"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                    currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                  }}
                  style={{
                    width: "120px",
                    height: "30px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <img
                  src={
                    logo_url +
                    header_logoapi_result_redux?.GeneralInformation?.logoPath
                  }
                  alt={"companylogo"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // Prevent infinite loop if fallback fails
                    currentTarget.src = "/img/no-image.png"; // Fallback to a default image
                  }}
                  style={{
                    width: "120px",
                    height: "30px",
                    objectFit: "contain",
                  }}
                />
              )}
            </a>

            {/* </Link> */}

            <div
              className="relative w-full max-w-[623px] h-[47px] max-sm:hidden max-md:h-[36px]"
              ref={divRef}
            >
              <input
                type="text"
                className="border-0 bg-[#EBEBEB] focus:shadow-[unset] px-8 rounded-[50px] focus:ring-[transparent] w-full h-full font-normal text-[#0000008F] text-base focus:outline-[transparent]"
                placeholder="search"
                value={blog_keyword}
                onChange={(e) => handlechange_blog_keyword(e)}
              />
              {clickedValue && (
                <>
                  <div className="w-full z-[999] relative min-h-[64px]  mt-2 rounded-[6px]  p-[16px] flex flex-col items-center justify-start shadow-xl max-h-[300px] overflow-auto bg-white custom-scroll ">
                    <ul className="rounded m-auto ">
                      {Blogs_list_api_result.length > 0 ? (
                        <>
                          <li className="text-[12px] text-[#919090] font-medium mb-[10px]">
                            BLOGS
                          </li>
                          {Blogs_list_api_result?.map((val, i) => (
                            <Fragment key={i}>
                              {/* <Link href={`/blog/${val?.slug}`} legacyBehavior> */}

                              <li
                                className="text-[14px] font-medium mb-[10px] cursor-pointer last-of-type:mb-0"
                                // onClick={(e) => handleClick_keyword(e, val)}
                              >
                                <Link href={`/blog/${val.slug}`}>
                                  {val?.title}
                                </Link>
                              </li>
                              {/* </Link> */}
                            </Fragment>
                          ))}
                        </>
                      ) : (
                        <>
                          <li className="text-[12px] text-[#919090] text-center flex items-center space-x-2 mb-0">
                            No data found
                          </li>
                        </>
                      )}
                    </ul>
                    {/* <p className='text-[#555555] text-center flex items-center space-x-2'> No data found</p> */}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-[36px] max-xl:space-x-4">
            <div
              className={`${
                menuToggle ? "left-0" : "left-[-100%]"
              } top-0  z-10 lg:z-0 lg:static fixed flex flex-col lg:items-center gap-[1.5vw] bg-white lg:bg-[transparent] px-5 lg:px-0 py-5 lg:py-0 w-[50%] lg:w-auto max-sm:w-full h-full lg:h-auto duration-500 navLinks`}
            >
              <ul className="flex lg:flex-row flex-col gap-[30px] max-lg:gap-[16px] p-0 w-full lg:w-auto">
                <li className="flex justify-end lg:hidden w-full">
                  <a
                    onClick={(e) => setMenuToggle(!menuToggle)}
                    className="ml-auto w-4 text-[30px] cursor-pointer"
                  >
                    <img src="/img/modal-close.svg" alt="" />
                  </a>
                </li>

                {[undefined, null, ""].includes(header_api_result) ? (
                  <>
                    {headerapi_result_redux?.map((val, i) => (
                      <Fragment key={i}>
                        {val?.categoryName == "Best stories" ? (
                          <> </>
                        ) : (
                          <>
                            <li onClick={(e) => handleClick_headerlist(e, val)}>
                              <Link href={`/${val?.categorySlug || ""}`}>
                                <p
                                  className={
                                    val?.categorySlug == header_slug
                                      ? "font-medium text-[#cc1e33] text-lg leading-[27px] active"
                                      : "font-medium text-[#120B14] text-base leading-[27px]"
                                  }
                                >
                                  {val.categoryName}
                                </p>
                              </Link>
                            </li>
                          </>
                        )}
                      </Fragment>
                    ))}
                  </>
                ) : (
                  <>
                    {header_api_result?.map((val, i) => (
                      <React.Fragment key={i}>
                        {val?.categoryName == "Best stories" ? null : (
                          <li onClick={(e) => handleClick_headerlist(e, val)}>
                            <Link href={`/${val?.categorySlug || ""}`}>
                              <p
                                className={`font-medium text-[#120B14] leading-[27px] ${
                                  val?.categorySlug === header_slug
                                    ? "text-lg text-[#F33151] active"
                                    : "text-base"
                                }`}
                              >
                                {val.categoryName}
                              </p>
                            </Link>
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </ul>
            </div>

            <div className="relative inline-block text-center">
              {registered === "" ||
              registered === null ||
              registered === undefined ? (
                <button
                  onClick={handleClick_signup}
                  className="flex justify-center items-center bg-[#120B14]  hover:bg-[#28282c] px-[32px] max-[700px]:px-4 rounded-[50px] h-[47px] font-[700] text-base text-white whitespace-nowrap"
                >
                  Join Now
                </button>
              ) : (
                <>
                  <div>
                    {userDetails ? (
                      <button
                        type="button"
                        className="inline-flex w-12 h-12 justify-center  rounded-md    shadow-xs   hover:bg-gray-50"
                        id="menu-button"
                        aria-expanded={isPopoverVisible}
                        aria-haspopup="true"
                        onClick={() => setPopoverVisible((prev) => !prev)}
                      >
                        <img
                          src={imagUrl + userDetails}
                          alt="profile"
                          className="w-12 h-12 rounded-full"
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-12 h-12 bg-[#DD5B15] hover:bg-[#823e19] rounded-full text-2xl font-semibold text-white flex items-center justify-center "
                        onClick={() => setPopoverVisible((prev) => !prev)}
                      >
                        {profileData?.NameString}
                      </button>
                    )}
                  </div>

                  {isPopoverVisible && (
                    <div
                      className="absolute right-0 z-auto mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="px-3 py-2 bg-gray-50 border-gray-700 rounded-lg">
                        <button
                          type="button" // Changed to button
                          className="flex items-center space-x-2 mb-4 w-full h-full text-left text-[14px] font-normal leading-[17px] text-[#120B14] hover:bg-[#F1F1F1] rounded-lg"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-profile" // Unique ID
                          onClick={handleProfile}
                        >
                          <img src="/img/profile1.svg" alt="profile" />
                          My Profile
                        </button>

                        <button
                          type="button" // Changed to button
                          className="flex items-center ml-1 space-x-2 w-full h-full text-left text-[14px] font-normal leading-[17px] text-[#120B14] hover:bg-[#F1F1F1] rounded-lg"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-logout" // Unique ID
                          onClick={handleLogout}
                        >
                          <img src="/img/logout.svg" alt="logout" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header_component;
