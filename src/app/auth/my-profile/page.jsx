"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Header_component from "../../component/Header";
import { fetchGraphQl } from "../../api/graphicql";
import { GET_MEMBERDETAILS_QUERY, UPDATE_MEMBERDETAILS_MUTATION } from "../../api/query";

const MyProfilePage = () => {
  const [profileDetail, setProfileDetail] = useState(null);
  console.log(profileDetail, "jdjshdjsd");
  useEffect(() => {
    const MemberProfileDetailsApi = async () => {
      let variables = {
        id: 3,
      };
      console.log(variables, "varsdkjsdkfjs");
      const res = await fetchGraphQl(GET_MEMBERDETAILS_QUERY, variables);
      setProfileDetail(res);
      console.log(res, "response");
    };
    MemberProfileDetailsApi();
  }, []);

const handleUpdateDetail=async()=>{
let variables={
  "input": {
    "Id": 19,
    "firstName": "thaya",
    "lastName": "thiya"
     
  }
}
const response =await fetchGraphQl(UPDATE_MEMBERDETAILS_MUTATION,variables)

  
}

  return (
    <>
      <head>
        <title>Profile</title>
      </head>
      <Header_component />
      <section className="bg-white p-[84px_16px] border-t border-solid border-[#EEEEEE] max-md:p-[24px_16px]">
        <div className="border border-solid border-[#EBEBEB] p-[50px] max-md:p-4 bg-[#FBFCFD] rounded-[12px] max-w-[700px] m-auto w-full">
          <div className="max-sm:flex-col flex items-center space-x-5 max-sm:space-y-5 max-sm:space-x-0 max-sm:items-start pb-[40px] mb-[40px] max-md:pb-[24px] max-md:mb-[24px] border-b border-solid border-[#EAEAEA]">
            <div className="w-[90px] h-[90px] min-w-[90px] bg-[#DD5B15] rounded-full text-[42px] font-semibold leading-[48px] text-white grid place-items-center">
              K
            </div>
            <div>
              <div className="flex items-center space-x-1 mb-[14px]">
                <div className="bg-[#F1F1F1] hover:bg-[#81818145] rounded-[8px] p-[12px_20px] relative w-fit ">
                  <input
                    type="file"
                    name=""
                    id=""
                    className="left-0 top-0 opacity-0 w-full h-full absolute cursor-pointer text-[0px]"
                  />
                  <p className="text-[14px] font-medium leading-[17px] text-[#120B14]">
                    Upload Image
                  </p>
                </div>
                <a
                  href=""
                  className="inline-block bg-transparent rounded-[8px] p-[12px_20px] relative w-fit hover:underline text-[14px] font-medium leading-[17px] text-[#FF3B30] "
                >
                  Remove
                </a>
              </div>
              <p className="text-[14px] font-normal leading-[17px] text-[#1516188F]">
                Only PNG or JPG images are allowed. Maximum file size: 10MB.
              </p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-[20px] items-center last-of-type:mb-0">
              <label
                htmlFor=""
                className="text-[14px] font-medium leading-[17px] text-[#000000]"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="h-[48px] text-[#120B14] focus:border-[#120B14] border border-solid border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] text-[14px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full "
              />
            </div>
            <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-[20px] items-center last-of-type:mb-0">
              <label
                htmlFor=""
                className="text-[14px] font-medium leading-[17px] text-[#000000]"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="h-[48px] text-[#120B14] focus:border-[#120B14] border border-solid border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] text-[14px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full "
              />
            </div>
            <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-[20px] items-center last-of-type:mb-0">
              <label
                htmlFor=""
                className="text-[14px] font-medium leading-[17px] text-[#000000]"
              >
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter your Email"
                className="h-[48px] text-[#120B14] focus:border-[#120B14] border border-solid border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] text-[14px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full "
              />
            </div>
            <div className="grid grid-cols-[1fr_1.5fr] gap-4 max-sm:grid-cols-1 mb-[20px] items-center last-of-type:mb-0">
              <label
                htmlFor=""
                className="text-[14px] font-medium leading-[17px] text-[#000000]"
              >
                Mobile Number
              </label>
              <div className="h-[48px] text-[#120B14] focus:border-[#120B14] border border-solid border-[#E9E9E9] p-[15.5px_14px] rounded-[4px] flex items-center bg-white ">
                {/* <Select
                  options={codeOptions}
                  value={selectedCode}
                  onChange={setSelectedCode}
                  placeholder="Select"
                  isSearchable={false}
                  // components={{
                  //   DropdownIndicator: CustomDropdownIndicator,
                  //   IndicatorSeparator: CustomIndicatorSeparator,
                  // }}
                  styles={customStyles}
                  classNames={customClassNames(155)}
                /> */}
                <input
                  type="text"
                  placeholder="00000 00000"
                  className="text-[14px] font-normal leading-[17px] placeholder:text-[#1516188F] w-full border-none p-0 "
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-[10px] mt-[50px] justify-end max-md:mt-[24px]">
            <button className="bg-[#F1F1F1] hover:bg-[#81818145] rounded-[4px] p-[8px_20px] relative w-fit text-[14px] font-normal leading-[17px] text-[#120B14] ">
              Discard
            </button>
            <button className="bg-[#120B14] hover:bg-[#28282c]  rounded-[4px] p-[8px_20px] relative w-fit text-[14px] font-normal leading-[17px] text-[#FFFFFF] " onClick={handleUpdateDetail}>
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default MyProfilePage;
