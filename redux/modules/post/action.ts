import * as types from "@/redux/mutation-types";
import { Dispatch } from "react";
import { Visibility } from "@/enums";
import { getPostList } from "@/api/modules/post";

interface PostProps {
	postId: string;
    userId: string;
    title: string;
    content: string;
    thumbnailUrl?: string | null;
    visibility: Visibility;
    createdAt: Date;
}
// * redux-thunk
export const getPostListActionThunk = () => {
	return async (dispatch: Dispatch<PostProps>) => {
		const res = await getPostList();
        console.log(res);
		// dispatch(res.data);
	};
};

// * redux-promise《async/await》
export const getPostListAction = async (): Promise<any> => {
	const res = await getPostList();
	return [];
};

// * redux-promise《.then/.catch》
// export const getPostListActionPromise = (): Promise<PostProps> => {
// 	return getPostList().then((res: { data: any; }) => {
//         console.log(res);
// 		return res.data || [];
// 	});
// };