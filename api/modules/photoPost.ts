import http from "@/api";
import { PhotoPost } from "../interface";

/**
 * @name CreatePhotoPost module
 */
// * Photo post create interface
export const createPhotoPost = (params: PhotoPost.ReqCreatePhotoPostForm) => {
    return http.post<string>('PhotoPost', params);
};