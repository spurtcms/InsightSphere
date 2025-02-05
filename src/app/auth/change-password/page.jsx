 "use client"
 import { fetchGraphQl } from "@/app/api/graphicql";
import { GET_POSTS_LIST_QUERY, GET_RESET_NEW_PASSWORD } from "@/app/api/query";
import Auth_Header from "@/components/Header/page";
import Link from "next/link";
import React, {  useState,useEffect } from "react";


 const NewPassword=()=>{

const [newSetPassword,setNewSetPaasword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [hidePassword,setHidePassword]=useState(false);
const [signupTenantId, setSignupTenantId] = useState("");
const [signupUserId, setSignupUserId] = useState("");
const [memberId,setMemberId]=useState("");
const [submit,setSubmit]=useState(0);
const [passwordError,setPasswordError]=useState("");
const [errorPasswordShow,setErrorPasswordShow]=useState("");
const PasswordRegex=  {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
}


useEffect(() => {
    const fetchData = async () => {
        const variable_list = {
            "entryFilter": {
                "categorySlug": "best-stories"
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


const validate_Password = () => {
    let isValid = true;

    if (newSetPassword !== '') {
        if (!PasswordRegex.password.test(newSetPassword)) {
            setPasswordError("Password must be more than 8 characters");
            setErrorPasswordShow(true);
            isValid = false;
        } else {
            setPasswordError("");
            setErrorPasswordShow(false);
        }
    } else {
        setPasswordError("Password is required.");
        setErrorPasswordShow(true);
        isValid = false;
    }

    return isValid;
};

useEffect(()=>{
if(submit===1){
    validate_Password()
}

},[newSetPassword])






const handleClick=()=>{
setSubmit(1)
if(validate_Password()){
    const NewPasswordData=async()=>{

        let setNewPassword_Params= {
      "input": {
      "newPassword": newSetPassword,
      "confrimPassword": confirmPassword,
      "memberId": memberId,
      "tenantId": signupTenantId
    }
        }
    
        try {
            const res = await fetchGraphQl(GET_RESET_NEW_PASSWORD, setNewPassword_Params);
            console.log(res,"whatDAtata")
            const statusCode = res.status || 200;
            if (statusCode === 200) {
                console.log("MailRecived:", res);
    
                router.push('/')
            } else {
               
                // console.log({type:error , message:forgotPass_Call?.data?.message},"kjaweiusncskdf")
                console.error(`Error: Received status code ${statusCode}`);
            }
    
        } 
        catch (err) {
           
           
            console.log(err, "Password Error")
    
        }
    
    
    
    
    }
    
    NewPasswordData()
}


}


const handlePasswordChange=(e)=>{
const {id,value}=e.target

if(id=="newPassword"){
    setNewSetPaasword(value)
}
else if(id=="confrimPassword"){
    setConfirmPassword(value)
}

}

// check if the password matches confirm password, 
const checkPassword = (val) => {
    if(val.newSetPassword === val.confirmPassword) {
        setPasswordError("Passwords match");
        
    } else if(val.newSetPassword !== val.confirmPassword) {
        setPasswordError("Passwords don't match")

    } else {
        setPasswordError("")
    }
}

// useEffect(()=>{
// checkPassword(newSetPassword&&confirmPassword)
// },[newSetPassword,confirmPassword])


return(
    <div>
{/* new password */}
<Auth_Header/>
                    <div className='max-w-[394px] mx-auto mb-[24px]'>
                        <h1 className='text-[36px] font-semibold leading-[43px] text-[#1D1D1F] text-center mb-[17px] max-sm:text-[28px]'>Set New Password</h1>
                        <p className='text-base font-medium leading-[17px] text-[#83838D] text-center mb-[40px] max-[1300px]:mb-[16px]'>Your new password must be different to previously passwords </p>
                        <div className='bg-[#FFFFFF] border border-[#E9E9E9] p-[30px] rounded-[12px] max-w-[394px] mx-auto max-[1300px]:p-[16px]'>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[16px]'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Password</label>
                                <div className='relative flex items-center'>
                                    <input 
                                    className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] text-black ' 
                                    onChange={handlePasswordChange}
                                    value={newSetPassword}
                                    id="newPassword"
                                    type={`${hidePassword?"password":"text"}`}
                                    />
                                    {/* <button onClick={setHidePassword(!hidePassword)}>
                                    <img src="/img/hide-password.svg" alt="password" />
                                    </button> */}
                                      
                                    
                                </div>
                                { 
                                    errorPasswordShow&&
                                    <div className=' absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>
                                        {passwordError}
                                         </p></div>}
                                {/* <p className='text-[12px] font-medium leading-[14px] text-[#1516188F] mt-[10px]'>Must be less than 8 characters</p> */}
                            </div>

                            <div className='mb-[24px] last-of-type:mb-0 max-[1300px]:mb-[16px]'>
                                <label className='text-[14px] font-medium leading-[16px] text-[#1D1D1F] block mb-[5px]'>Confirm password</label>
                                <div className='relative flex items-center'>
                                    <input type="text" 
                                id="confrimPassword"
                                    className='border border-[#00000029] rounded-[4px] h-[42px] p-[6px_36px_6px_10px] outline-none block w-full text-[14px] font-normal leading-[16px] placeholder:text-[#1516188F] text-black'
                                    value={confirmPassword}
                                    onChange={handlePasswordChange}

                                    />
                                    <a href="#" className='absolute right-[10px]'>
                                        <img src="/img/hide-password.svg" alt="password" />
                                    </a>

                                   
                                </div>
                                {/* { 
                                    errorPasswordShow&&
                                    <div className=' absolute flex items-start space-x-[4px] mt-[5px]'><img src="/img/error.svg" alt="error" /> <p className='text-[10px] font-normal leading-[12px] text-[#EC1919]'>
                                        {passwordError}
                                         </p></div>} */}
                            </div>

                            <Link href="#" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[24px] rounded-[4px] text-center hover:bg-[#28282c]' onClick={handleClick}>Reset password</Link>
                        </div>
                        <div className="flex items-center space-x-[4px] mt-[30px] justify-center max-[1300px]:mt-[16px]"><p className="text-[12px] font-medium leading-[14px] text-[#1516188F]">Back to</p><Link href="/auth/signin" className="text-[12px] font-semibold leading-[14px] hover:underline text-[#1D1D1F]">Login</Link></div>

                    </div>
    </div>
)

 }
 
 
 export default NewPassword
 
 
 
 
 