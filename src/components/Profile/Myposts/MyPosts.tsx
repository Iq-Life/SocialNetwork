import React from "react";
import s from './MyPosts.module.css';
import Post, {PostType} from "./Post/Post";
import {PostsType} from "../../../redux/state";


type MyPostsType = {
    addPost: () => void
    updateNewPostText: (newPostText:string)=>void
    posts: Array<PostsType>
    newPostText:string
}

function MyPosts(props: MyPostsType) {

    let postsElements = props.posts
        .map((post: PostType) => <Post id={post.id} message={post.message} like={post.like}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = () => {
        if(newPostElement.current){
        let newPostText = newPostElement.current.value;
        props.updateNewPostText(newPostText)
            newPostElement.current.value = ""
    }
}

const addPostKeyPress = (e: any) => {
    if (e.key === "Enter") {
        onAddPost()
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
                <button onClick={onAddPost}>add post</button>
            </div>
            <div className={s.item}>
                {postsElements}
            </div>
        </div>
    </div>
)
}

export default MyPosts;