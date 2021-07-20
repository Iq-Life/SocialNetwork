import {UserType} from "../../redux/users-reducer";

export const updateObjectInArray = (items: Array<UserType>, itemId: number,
                                    objPropName: any, newObjProps: any) => {
    return items.map(u => {
        // @ts-ignore
        if (u[objPropName] === itemId) {
            // @ts-ignore
            return {...u, ...newObjProps}
        } else {
            return u
        }
    })
}