import React from "react";
import {PostsType, ActionTypes} from "../../../redux/state";
import {changeNewTextAC} from "../../../redux/dialogs-reducer";
import {addPostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

type MyPostsContainerType = {
    posts: Array<PostsType>
    dispatch: (action: ActionTypes) => void
    newPostText: string
}

function MyPostsContainer (props: MyPostsContainerType) {


    let addPost = () => {
        props.dispatch(addPostAC(props.newPostText))
    }

    let onPostChange = (newPostText: string) => {
        props.dispatch(changeNewTextAC(newPostText))
    }

    return <MyPosts addPost={addPost}
                    updateNewPostText={onPostChange}
                    posts={props.posts}
                    newPostText={props.newPostText}
    />

}

export default MyPostsContainer;