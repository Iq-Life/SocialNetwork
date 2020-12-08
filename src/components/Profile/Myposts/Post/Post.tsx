import React from "react";
import s from './Post.module.css';

export type PostType = {
    id: number
    message: string
    like: number
}

function Post(props:PostType) {
    return <div>
        <div className={s.item}>
            <img src='https://img3.goodfon.ru/wallpaper/nbig/4/99/neytiri-avatar.jpg' alt={"Avatar"}/>
            {props.message}
            <div><span>like</span>  {props.like}</div>
        </div>
    </div>
}

export default Post;