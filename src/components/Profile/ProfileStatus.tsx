import React, {ChangeEvent} from "react";

type ProfileStatusType = {
    status: string
    updateStatusProfile: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatusProfile(this.state.status)
    }
    handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.select()
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return <div>
            {!this.state.editMode &&
            <div>
                <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input onFocus={this.handleFocus}
                       autoFocus={true}
                       onBlur={this.deactivateEditMode}
                       value={this.state.status}
                       onChange={this.onStatusChange}
                />
            </div>
            }
        </div>
    }
}