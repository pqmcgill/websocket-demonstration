import React, { Component } from 'react';
import MessageContainer from './containers/MessageContainer';

export default class App extends Component {
	render () {
		return (
			<div>
				<h1>Message Board</h1>
				<MessageContainer />
			</div>
		);
	}
}
