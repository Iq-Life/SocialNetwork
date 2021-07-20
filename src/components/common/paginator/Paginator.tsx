import React from "react";
import style from './Paginator.module.css'

export let Paginator = (props: PaginatorType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={style.spanPage}>{pages.map(p => {
        return <span className={props.currentPage === p ? style.selectedPage : style.usersPage}
                     onClick={(e) => {
                         props.onPageChange(p)
                     }}
                     style={{cursor: 'pointer'}}
        >{p}</span>
    })}
    </div>
}

//type
    type PaginatorType = {
        totalUsersCount: number
        pageSize: number
        currentPage: number
        onPageChange: (p: number) => void
    }
