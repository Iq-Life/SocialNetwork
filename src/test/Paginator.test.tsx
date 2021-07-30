import {create} from "react-test-renderer";
import React from "react";
import {Paginator} from "../components/common/paginator/Paginator";

describe('Paginator component', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = create(<Paginator onPageChange={() => {
        }} totalItemsCount={11}
                                            pageSize={1} portionSize={10} currentPage={1}/>)
        const root = component.root
        let spans = root.findByType("span")
        expect(spans).toBe(10)
    })
    test('if pages count is more then 10 button NEXT should be present', () => {
        const component = create(<Paginator onPageChange={() => {
        }} totalItemsCount={11}
                                            pageSize={1} portionSize={10} currentPage={1}/>)
        const root = component.root
        let button = root.findByType("button")
        expect(button).toBe(1)
    })

});