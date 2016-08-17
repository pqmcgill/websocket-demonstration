import React, { Component } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import LoginForm from '../components/LoginForm';
import NotificationList from '../components/NotificationList';
import socket_conn from '../util/socket_conn';
import * as types from '../constants/MessageTypes';

export default class MessageContainer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loginText: '',
			messageText: '',
			notifications: [{
				title: 'uh oh!',
				msg: 'spaghetti-o!'
			}],
			messages: [{
				msg: 'foobar',
				author: 'yo momma'
			},
			{
				msg: 'barfoo',
				author: 'bitch, please!'
			}]
		};

		socket_conn.subscribeTo(types.MESSAGE_ADDED, this.addMessage);
	}

	handleLoginTextChange = (e) => {
		this.setState({
			loginText: e.target.value
		});
	}

	handleMessageTextChange = (e) => {
		this.setState({
			messageText: e.target.value
		});
	}

	addMessage = message => {
		console.log('adding message');
		return new Promise(resolve => {
			this.setState({
				messages: this.state.messages.concat([ message ])
			}, resolve);
		});
	}

	handlePost = () => {
		socket_conn.emit('NEW_MESSAGE', {
			msg: this.state.messageText,
			author: this.state.username
		});
		this.setState({
			messageText: ''
		});
	}

	handleJoin = () => {
		this.setState({
			username: this.state.loginText
		}, () => {
			socket_conn.emit('LOGIN', { username: this.state.username });
			this.setState({
				loginText: ''
			});
		});
	}

	render () {
		const input = this.state.username ? 
			<MessageInput onPost={ this.handlePost } 
				value={ this.state.messageText } 
				onChange={ this.handleMessageTextChange }
			/> :
			<LoginForm onJoin={ this.handleJoin } 
				value={ this.state.loginText } 
				onChange={ this.handleLoginTextChange }
			/>;

		const welcome = this.state.username ?
			<h2>Welcome, { this.state.username }</h2> :
		 	<h2>Enter username to join the conversation</h2>;	

		return (
			<div>
				{ welcome }
				<MessageList messages={ this.state.messages }/>
				{ input }
			</div>
		);
	}
}
