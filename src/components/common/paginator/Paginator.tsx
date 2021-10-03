import React, {useState} from "react";
import style from './Paginator.module.css'

export let Paginator: React.FC<PaginatorType> = ({
                                                     portionSize, totalItemsCount,
                                                     pageSize, currentPage, onPageChange
                                                 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={style.spanPage}>
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>
            back</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={currentPage === p ? style.selectedPage : style.usersPage}
                             onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                                 onPageChange(p)
                             }}
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
