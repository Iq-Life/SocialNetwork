import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {addPost} from "../../../redux/profile-reducer";

export type PostsType = {
    id: number
    message: string
    like: number
}

type IMapStateToPropsType = {
    posts: Array<PostsType>
}

type IMapDispatchToProps = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<IMapStateToPropsType, IMapDispatchToProps, {}, AppStateType>
(mapStateToProps, {addPost})(MyPosts);
export default MyPostsContainer;
