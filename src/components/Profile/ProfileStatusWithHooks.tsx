import React, {ChangeEvent, useEffect, useState} from "react";

export const ProfileStatusWithHooks: React.FC<ProfileStatusType> = ({status, updateStatusProfile}) => {
    let [editMode, setEditMode] = useState(false)
    let [localStatus, setLocalStatus] = useState(status)

    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatusProfile(localStatus)
    }
    const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.select()
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }
    const addStatusKeyPress = (e: any) => {
        if (e.key === "Enter") {
            deactivateEditMode()
        }
    }

    return <div>
        {!editMode &&
        <div>
            <span onDoubleClick={activateEditMode}>{status || " --- "}</span>
        </div>
        }
        {editMode &&
        <div>
            <input onFocus={handleFocus}
                   autoFocus={true}
                   onBlur={deactivateEditMode}
                   value={localStatus}
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
