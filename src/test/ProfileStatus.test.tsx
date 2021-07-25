import React from 'react';
import {ProfileStatus} from "../components/Profile/ProfileStatus";
import renderer from 'react-test-renderer';



describe('ProfileStatus component', () => {
    test('status from props.should be in the state', () => {
        const component = renderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatusProfile={()=>{}}/>)
        const instance = component.getInstance()
    // @ts-ignore
        expect(instance.state.status).toEqual("it-kamasutra.com");
});
});
describe('after creation <span> should be displayed', () => {
    test('status from props.should be in the state', () => {
        const component = renderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatusProfile={()=>{}}/>)
        const instance = component.getInstance()
    // @ts-ignore
        expect(instance.state.status).toEqual("it-kamasutra.com");
});
});
