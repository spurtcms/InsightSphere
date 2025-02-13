// "use client"
import { fetchGraphQl } from "@/app/api/graphicql";
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from "@/app/api/query";
import Blog_Detail_component from "@/components/Blogs/Blog_Detail_component";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
    title: {
        default: "Blog",
    },

}



const Greeting = async ({ params }) => {

    let variable_slug = { "slug": params?.detail, "AdditionalData": { "authorDetails": true, "categories": true } };

    const postes = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)
    if (!postes) {
        return notFound();
    }

    console.log("postes", postes)


    let variable_list = {
        "entryFilter": {
            "categorySlug": "blog"
        },
        "commonFilter": {
            "limit": 10,
            "offset": 0
        },
        "AdditionalData": {
            "categories": true,
            "authorDetails": true
        }

    }

    const Total_Blogs_api_result = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)

    return (
        <>

            <Blog_Detail_component postes={postes} Total_Blogs_api_result={Total_Blogs_api_result} params={params.detail} />

        </>
    );
};

export default Greeting;
