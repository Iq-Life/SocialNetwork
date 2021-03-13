import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {addPost, updateNewPostText} from "../../../redux/profile-reducer";

export type PostsType = {
    id: number
    message: string
    like: number
}

type IMapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
}
type IMapDispatchToProps = {
    addPost: (newPostText: string) => void
    updateNewPostText: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const MyPostsContainer = connect<IMapStateToPropsType, IMapDispatchToProps, {}, AppStateType>
(mapStateToProps, {addPost, updateNewPostText})(MyPosts);
export default MyPostsContainer;
