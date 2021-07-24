import {profileReducer, addPost, deletePost, ProfilePageType} from "../redux/profile-reducer";

let startState: ProfilePageType
beforeEach(()=>{
    startState={
        posts: [
            {id: 1, message: "Hi, how are you?", like: 56},
            {id: 2, message: "It's my first post", like: 434},
            {id: 3, message: "Blabla", like: 44},
            {id: 4, message: "I lick banana", like: 4554}
        ],
        profile: null,
        status: ""
    }
})
it("new post should be added", ()=>{

    const endState = profileReducer(startState, addPost("new text post"))

    expect(endState.posts.length).toBe(5)
})
it("message of new post should be correct", ()=>{

    const endState = profileReducer(startState, addPost("new text post"))

    expect(endState.posts[0].message).toBe("new text post")
})
it("delete post should be correct", ()=>{

    const endState = profileReducer(startState, deletePost(2))

    expect(endState.posts.length).toBe(3)
})