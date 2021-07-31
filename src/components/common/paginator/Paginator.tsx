import React, {useState} from "react";
import style from './Paginator.module.css'

export let Paginator = (props: PaginatorType) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return <div className={style.spanPage}>
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>
            back</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={props.currentPage === p ? style.selectedPage : style.usersPage}
                             onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                                 props.onPageChange(p)
                             }}
                             style={{cursor: 'pointer'}}
                >{p}</span>
            })}
        {portionCount > portionNumber && <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>next</button>}
    </div>
}

//type
type PaginatorType = {
    portionSize: number
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (p: number) => void
}
