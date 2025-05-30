"use client"
import { GET_HEADER_FORGOT_PASSWORD_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query';
import Auth_Header from '@/components/Header/page';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// import { ToastMessage } from '@/utilities/toast';
import { fetchGraphQl } from '@/app/api/graphicql';
import { data } from 'autoprefixer';
import { useRouter } from 'next/navigation';
import { channelName, local_Url } from '@/app/api/url';
import Header_component from '@/app/component/Header';

const Forgot_Password = () => {
    const [emailId, setEmailId] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState("")
    const [validcheck, setValidate] = useState("");
    const [emailErrorshow, setEmailErrorShow] = useState("");
    const [successMsgShow, setSuccessMsgShow] = useState(false)
    const [emailError, setEmailError] = useState("");
    //  const [userErrorShow,setErrorShow]=useState("");
    const [emailSubmit, setEmailSubmit] = useState(0);
    const [sucesMsg, setSucesMsg] = useState("");
    const [getErrorMsg, setGetErrorMsg] = useState("");
    const [errorMsgShow, setErrorMsgShow] = useState(false);
    const router = useRouter();
    const EmailRegex = {
        email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    };
    const [signupTenantId, setSignupTenantId] = useState("");
    const [signupUserId, setSignupUserId] = useState("");
    const [url, setUrl] = useState(null);
    
    useEffect(() => {
        setUrl(window.location)
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            const variable_list = {
                "entryFilter": {
                    "categorySlug": "best-stories",
                    "ChannelName": channelName
                },
                "commonFilter": {
                    // "limit": 10,
                    // "offset": 0
                },
                "AdditionalData": {
                    "categories": true,
                    "authorDetails": true
                }
            };

            try {

                const FetchValue = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
                setSignupTenantId(FetchValue?.ChannelEntriesList?.channelEntriesList[0].tenantId)
                setSignupUserId(FetchValue?.ChannelEntriesList?.channelEntriesList[0].createdBy)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    const handleVerifyMailId = () => {
     
        setEmailSubmit(1);
        if (validateMailId()) {
            const ForgotPasswordData = async () => {
                let password_params = {

                    "input": {
                        "email": emailId,
                        "tenantId": signupTenantId,
                        "url": url?.origin
                    }
                }

                try {
                    const forgotPass_Call = await fetchGraphQl(GET_HEADER_FORGOT_PASSWORD_QUERY, password_params);
                  
                    if (forgotPass_Call == null) {
                        setGetErrorMsg("you are not regitered with us");
                        setErrorMsgShow(true);
                      
                    }
                    else {
                        setSucesMsg(forgotPass_Call?.forgotPassword?.message)
                        setSuccessMsgShow(true)
                    
                    }
                }
                catch (error) {

                    if (error == null) {
                    
                    }

                }
            };
            ForgotPasswordData();
        }
        else {
          
            setEmailError(" Please enter your mail")
        }
    }
    useEffect(() => {
        if (emailSubmit === 1) {
            validateMailId();
        }
    }, [emailId]);

    const validateMailId = () => {
        let isValid = true;


        if (emailId !== '') {
            if (!EmailRegex.email.test(emailId)) {
                setEmailError("please Enter valid Eamil");
                setEmailErrorShow(true);
                isValid = false;
            } else {
                setEmailError("");
                setEmailErrorShow(false);
            }
        } else {
            setEmailError("Email is required.");
            setEmailErrorShow(true);
            isValid = false;
        }

        return isValid;
    };

    const handleTypingChange = (e) => {
        // setEmailId(e);
        const { id, value } = e.target;
        if (id == "email") {
            setEmailId(value)
        }
        setSuccessMsgShow(false)
        setErrorMsgShow(false);
        // else if (id == "tenantId") {
        //     setSignupTenantId(value)
        // }
    }

    return (
        <>
            <head>
                <title>Forgot Password</title>
            </head>

            <Header_component />
            <section className='bg-[#FAFAFA] min-h-[calc(100vh-120px)] p-[26px_16px] flex flex-col max-md:min-h-[calc(100vh-68px)] max-[1300px]:min-h-[calc(100vh-79px)] max-[1300px]:p-[16px]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full mb-auto'>
                    <ul className='flex space-x-1 mb-[55px] max-[1300px]:mb-[24px] items-center'>
                        <li>
                            <Link href="/">
                                <img src="/img/home.svg" alt="home" />
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <Link href="/auth/signin" className='text-[14px] font-normal leading-4 text-[#151618CC] hover:underline'>
                                Login
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <p className='text-[14px] font-semibold leading-4 text-[#120B14] '>
                                Forgot password
                            </p>
                        </li>
                    </ul>
                </div>
                <div className='w-[90%] mx-auto max-[1400px]:w-full mb-auto'>

                    <div className='max-w-[394px] mx-auto mb-[24px]'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Forgot Password ?</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px] max-[1300px]:mb-[16px]'>No worries, we will send reset instruction</p>
                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-w-[394px] mx-auto'>
                            <div className='mb-[24px] last-of-type:mb-0'>
                                <input placeholder='Enter your registered Email ID '
                                    // type="text" 
                                    className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] text-black'
                                    value={emailId}
                                    id="email"

                                    onChange={handleTypingChange} />

                                {emailErrorshow &&
                                    <div className='absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{emailError} </p></div>}


                                {
                                    successMsgShow &&
                                    <div className='absolute flex items-start space-x-[4px] mt-[5px]'> <p className='text-[10px] font-normal leading-[12px] text-[green]'>{sucesMsg} </p></div>}

                                {
                                    errorMsgShow &&
                                    <div className='absolute flex items-start space-x-[4px] mt-[5px]'> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>{getErrorMsg} </p></div>}

                            </div>

                            <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c]' onClick={(e) => handleVerifyMailId(e)}>Verify</Link>
                        </div>
                        <div className='flex items-center space-x-[4px] mt-[30px] justify-center'>
                            <p className='text-[12px] font-medium leading-[14px] text-[#1516188F]'>Back to</p>
                            <Link href="/auth/signin" className='text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]'>Login</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Forgot_Password;
