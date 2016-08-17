import React, { Component } from 'react';

import NotificationList from '../components/NotificationList';

export default class NotificationContainer extends Component {
	constructor (props) {
		super(props);
		let num = 1;
		this.state = {
			notifications: []
		};
	}

	addNotification = (note) => {
		return new Promise(resolve => {
			this.setState({
				notifications: this.state.notifications.concat([ note ])
			}, resolve);
		});
	}

	removeNotification = id => {
		var ids = this.state.notifications.map(note => note.id);
		console.log('removing at index ', + ids.indexOf(id));
		return new Promise(resolve => {
			this.setState({
				notifications: [
					...this.state.notifications.slice(0, ids.indexOf(id)),
					...this.state.notifications.slice(ids.indexOf(id) + 1, ids.length)
				]
			}, resolve);
		});
	}

	handleIncomingNotification = note => {
		let { id } = note;
		this.addNotification(note).then(() => {
			setTimeout(() => {
				this.removeNotification(id).then(() => {
				});
			}, 5000);
		});
	}

	render () {
		return <NotificationList notifications={ this.state.notifications }/>;
	}
}
