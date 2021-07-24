import React, {ChangeEvent, useEffect, useState} from "react";

export const ProfileStatusWithHooks = (props: ProfileStatusType) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusProfile(status)
    }
    const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.select()
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    const addStatusKeyPress = (e: any) => {
        if (e.key === "Enter") {
            deactivateEditMode()
        }
    }

    return <div>
        {!editMode &&
        <div>
            <span onDoubleClick={activateEditMode}>{props.status || " --- "}</span>
        </div>
        }
        {editMode &&
        <div>
            <input onFocus={handleFocus}
                   autoFocus={true}
                   onBlur={deactivateEditMode}
                   value={status}
                   onChange={onStatusChange}
                   onKeyPress={addStatusKeyPress}
            />
        </div>
        }
    </div>
}

//type
type ProfileStatusType = {
    status: string
    updateStatusProfile: (status: string) => void
}
