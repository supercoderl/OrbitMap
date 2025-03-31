import http from "@/api";
import { Post } from "@/types";
import { ReqListParams, ResPage } from "../interface";

/**
 * @name GetPost module
 */
// * Post interface
export const getPostList = (params: ReqListParams) => {
	return http.get<ResPage<Post>>('post', params);
};