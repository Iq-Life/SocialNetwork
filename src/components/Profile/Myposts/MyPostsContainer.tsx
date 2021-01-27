import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import store, {AppStateType} from "../../../redux/redux-store";
import {PostsType} from "../../../redux/state";
import {addPostAC, changeNewMessagePostTextAC} from "../../../redux/profile-reducer";

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
let mapDispatchToProps = () => {
    return {
        addPost: (newPostText: string) => {
            store.dispatch(addPostAC(newPostText))
        },
        updateNewPostText: (newPostText: string) => {
            store.dispatch(changeNewMessagePostTextAC(newPostText))
        }
    }
}

const MyPostsContainer = connect<IMapStateToPropsType, IMapDispatchToProps, {}, AppStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;
