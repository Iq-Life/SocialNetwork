import React, { ChangeEvent, KeyboardEvent } from "react";

export class ProfileStatus extends React.Component<ProfileStatusType> {
	state = {
		editMode: false,
		status: this.props.status
	}

	activateEditMode = () => {
		this.setState({ editMode: true })
	}
	deactivateEditMode = () => {
		this.setState({ editMode: false })
		this.props.updateStatusProfile(this.state.status)
	}
	handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
		event.target.select()
	}
	onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({ status: e.currentTarget.value })
	}
	addStatusKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			this.deactivateEditMode()
		}
	}

	componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>) {
		if (prevProps.status !== this.props.status)
			this.setState({
				status: this.props.status
			})
	}

	render() {
		return <div>
			{!this.state.editMode &&
				<div>
					<span onDoubleClick={this.activateEditMode}>{this.props.status || " --- "}</span>
				</div>
			}
			{this.state.editMode &&
				<div>
					<input onFocus={this.handleFocus}
						autoFocus={true}
						onBlur={this.deactivateEditMode}
						value={this.state.status}
						onChange={this.onStatusChange}
						onKeyPress={this.addStatusKeyPress}
					/>
				</div>
			}
		</div>
	}
}

//type
type ProfileStatusType = {
	status: string
	updateStatusProfile: (status: string) => void
}
