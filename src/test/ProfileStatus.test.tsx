import React from 'react';
import {ProfileStatus} from "../components/Profile/ProfileStatus";
import {create} from 'react-test-renderer';



describe('ProfileStatus component', () => {
    test('status from props.should be in the state', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatusProfile={()=>{}}/>)
        const root = component.root
        expect(root.instance.state.status).toEqual("it-kamasutra.com")
})
    test('after creation <span> should be display', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatusProfile={()=>{}}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span).not.toBeNull()
});
    test('after creation <input> should be display with correct status', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatusProfile={()=>{}}/>)
        const root = component.root
        expect(()=>{
            let input = root.findByType("input")
        }).toThrow()
});
    test('after creation <span> should be display with correct status', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatusProfile={()=>{}}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span.children[0]).toBe("it-kamasutra.com")
});
    test('input should be display in editMode instead of span', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatusProfile={()=>{}}/>)
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe("it-kamasutra.com")
});
});
