import Image from "next/image";
import Blog_Index from "../app/blog/page";
import { fetchGraphQl } from "./api/graphicql";
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from "./api/query";

export default async function Home() {



  // let variable_category = {
  //   "categoryFilter": {
  //     "categoryGroupSlug": "blog",
  //     "excludeGroup": true,
  //     "hierarchyLevel": 2

  //   }
  // }
  // const headerdata = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category)


  // let variable_list = {
  //   "entryFilter": {
  //     "categorySlug": "blog"
  //   },
  //   "commonFilter": {
  //     // "limit": 10,
  //     // "offset": 0
  //   },
  //   "AdditionalData": {
  //     "categories": true,
  //     "authorDetails": true
  //   },
  //   "sort": {
  //     "sortBy": "en.created_on",
  //     "order": 1
  //   }

  // }

  // const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)



  // let variable_all_other_stories = {
  //   "entryFilter": {
  //     "categorySlug": "blog"
  //   },
  //   "commonFilter": {
  //     "limit": 10,
  //     "offset": 0
  //   },
  //   "AdditionalData": {
  //     "categories": true,
  //     "authorDetails": true
  //   },
  //   "sort": {
  //     "sortBy": "en.created_on",
  //   }


  // }

  // const all_other_stories = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_all_other_stories)



  let variable_home_des = {
    "categoryFilter": {
      "categoryGroupSlug": "blog",
      "hierarchyLevel": 1

    }
  }
  const home_page_description = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_home_des)



  return (
    <>
      <Blog_Index home_page_description={home_page_description} />

    </>
  );
}
