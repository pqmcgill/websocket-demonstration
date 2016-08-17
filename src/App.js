import React, { Component } from 'react';
import MessageContainer from './containers/MessageContainer';
import NotificationContainer from './containers/NotificationContainer';

export default class App extends Component {
	render () {
		return (
			<div>
				<NotificationContainer />
				<h1>Message Board</h1>
				<MessageContainer />
			</div>
		);
	}
}
