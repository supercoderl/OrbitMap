import http from "@/api";
import { PhotoPost, ReqPostListParams, ResPage } from "../interface";
import { PhotoPost as PhotoPostType, Storage } from "@/types";

/**
 * @name GetPhotoPost module
 */
// * Photo Post interface
export const getPhotoPostList = (params: ReqPostListParams) => {
    return http.get<ResPage<PhotoPostType>>('photoPost', params);
};

/**
 * @name CreatePhotoPost module
 */
// * Photo post create interface
export const createPhotoPost = (params: PhotoPost.ReqCreatePhotoPostForm) => {
    return http.post<string>('photoPost', params);
};

/**
 * @name GetStorage module
 */
// * Photo Post interface
export const getStorage = () => {
    return http.get<Storage[]>('photoPost/storage');
};