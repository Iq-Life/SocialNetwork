import React from "react";
import {ProfilePageType} from "../../../redux/state";
import {changeNewTextAC} from "../../../redux/dialogs-reducer";
import {addPostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";

type MyPostsContainerType = {
    // posts: Array<PostsType>
    // dispatch: (action: ActionTypes) => void
    // newPostText: string
}

function MyPostsContainer() {

    let PostPage = useSelector <AppStateType, ProfilePageType>(state => state.profilePage)

    let dispatch = useDispatch()

    let addPost = () => {
        dispatch(addPostAC(PostPage.newPostText))
    }

    let onPostChange = (newPostText: string) => {
        dispatch(changeNewTextAC(newPostText))
    }


    return (
        <MyPosts addPost={addPost}
                 updateNewPostText={onPostChange}
                 posts={PostPage.posts}
                 newPostText={PostPage.newPostText}
        />
    )
}

export default MyPostsContainer;