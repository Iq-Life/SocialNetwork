import React from "react";
import s from './MyPosts.module.css';
import Post, {PostType} from "./Post/Post";
import {PostsType, ActionTypes} from "../../../redux/state";
import {changeNewTextAC} from "../../../redux/dialogs-reducer";
import {addPostAC} from "../../../redux/profile-reducer";

type MyPostsType = {
    posts: Array<PostsType>
    dispatch: (action:ActionTypes) => void
    newPostText:string
}

function MyPosts(props: MyPostsType) {

    let postsElements = props.posts
        .map((post: PostType) => <Post id={post.id} message={post.message} like={post.like}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    let addPost =  () => {
        props.dispatch(addPostAC(props.newPostText))
    }

    let onPostChange = () => {
        if(newPostElement.current){
            let newPostText = newPostElement.current.value
            props.dispatch(changeNewTextAC(newPostText))
            newPostElement.current.value = ""
        }
    }

    const addPostKeyPress = (e: any) => {
        if (e.key === "Enter") {
            addPost()
        }
    }

    return (
        <div className={s.allPost}>
            <h3>My post</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        ref={newPostElement}
                        value={props.newPostText}
                        onKeyPress={addPostKeyPress}
                    >
                    </textarea>
                </div>
                <div>
                    <button onClick={addPost}>add post</button>
                </div>
                <div className={s.item}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;