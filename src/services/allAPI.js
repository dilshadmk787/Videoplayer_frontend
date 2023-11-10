import { serverURL } from "./serverURL"
import commonAPI from "./commonAPI"


export const uploadAllVideo = async(reqBody)=>{
    return await commonAPI ('POST',`${serverURL}/videos`,reqBody)
}

 //get all video from json server

 export const getAllVideos = async()=>{
    return await commonAPI('GET',`${serverURL}/videos`,'')
} 

//api to delete a video
export const deleteAVideo = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/videos/${id}`,{})
}  
export const addtoHistory = async(videodetails)=>{
    return await commonAPI('POST',`${serverURL}/history`,videodetails)
}
export const getAllHistory = async()=>{
    return await commonAPI('GET',`${serverURL}/history`,"")
}
export const addToCategory = async(body)=>{
    return await commonAPI('POST',`${serverURL}/categories`,body)
}

//api to delete history
export const deleteAHistory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/history/${id}`,{})
}
//api to get category
export const getAllCategory = async(body)=>{
    return await commonAPI('GET',`${serverURL}/categories`,body)}

//api to delete category
export const deleteCategory = async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/categories/${id}`,{})
}
export const getvideo =async(id)=>{
    return await commonAPI('GET',`${serverURL}/videos/${id}`,"")
}

//api to update categorty
export const updatecategory = async (id,body)=> {
    return await commonAPI('PUT',`${serverURL}/categories/${id}`,body);
}
