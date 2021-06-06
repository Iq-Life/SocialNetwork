import React, {FormEvent} from "react";
import s from './MyPosts.module.css';
import Post, {PostType} from "./Post/Post";
import {PostsType} from "../../../redux/profile-reducer";
import  {Field, InjectedFormProps, reduxForm} from "redux-form";

type MyPostsType = {
    addPost: (newPostText: string) => void
    posts: Array<PostsType>
}

function MyPosts(props: MyPostsType) {

    let postsElements = props.posts
        .map((post: PostType) => <Post id={post.id} message={post.message} like={post.like} key={post.id}/>)

    let newAddPost = (values:any) => {
        props.addPost(values.newPostBody)
    }

    /*const addPostKeyPress = (e: any) => {
        if (e.key === "Enter") {
            onAddPost()
        }
    }*/

    return (
        <div className={s.allPost}>
            <h3>My post</h3>
            <div>
                <MyPostReduxForm onSubmit={newAddPost}/>
                <div className={s.item}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

type MyPostFormType = {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const MyPostForm: React.FC<InjectedFormProps<MyPostFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Enter Your post"} name={"newPostBody"} component={"textarea"}/>
        </div>
        <div>
            <button>add post</button>
        </div>
    </form>

}

const MyPostReduxForm = reduxForm<MyPostFormType>({form:"newPostBody"})(MyPostForm)
export default MyPosts;