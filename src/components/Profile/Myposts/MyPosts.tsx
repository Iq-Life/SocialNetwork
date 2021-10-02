import React, {FormEvent} from "react";
import s from './MyPosts.module.css';
import Post, {PostType} from "./Post/Post";
import {PostsType} from "../../../redux/profile-reducer";
import  {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formControls/FormsControls";

type MyPostsType = {
    addPost: (newPostText: string) => void
    posts: Array<PostsType>
}

const MyPosts = React.memo((props: MyPostsType) => {

    let postsElements = props.posts
        .map((post: PostType) => <Post id={post.id} message={post.message} like={post.like} key={post.id}/>)
//todo types
    let newAddPost = (values:any) => {
        props.addPost(values.newPostText)
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
})

type MyPostFormType = {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const maxLength25 = maxLengthCreator(25)

const MyPostForm: React.FC<InjectedFormProps<MyPostFormType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Enter Your post"} name={"newPostText"} component={Textarea}
            validate={[required, maxLength25]}/>
        </div>
        <div>
            <button>add post</button>
        </div>
    </form>

}

const MyPostReduxForm = reduxForm<MyPostFormType>({form:"newPostText"})(MyPostForm)
export default MyPosts;