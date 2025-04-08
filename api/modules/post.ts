import http from "@/api";
import { Post } from "@/types";
import { ReqPostListParams, ResPage } from "../interface";
import { ReactionType } from "@/enums";

/**
 * @name GetPost module
 */
// * Post interface
export const getPostList = (params: ReqPostListParams) => {
	return http.get<ResPage<Post>>('post', params);
};

/**
 * @name ReactPost module
 */
// * Post interface
export const reactPost = (params: {
	postId : string,
	userId : string,
	reactionType : ReactionType
}) => {
	return http.post<string>('post/react', params);
};

/**
 * @name SavePost module
 */
// * Post interface
export const savePost = (params: {
	userId : string,
	postId : string
}) => {
	return http.post<string>('post/save', params);
};