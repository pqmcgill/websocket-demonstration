import React, { Component } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import LoginForm from '../components/LoginForm';

export default class MessageContainer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loginText: '',
			messageText: '',
			messages: []
		};
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
		return new Promise(resolve => {
			this.setState({
				messages: this.state.messages.concat([ message ])
			}, resolve);
		});
	}

	handlePost = () => {
		this.addMessage({
			msg: this.state.messageText,
			author: this.state.username
		}).then(() => {
			this.setState({
				messageText: ''
			});
		});
	}

	handleJoin = () => {
		this.setState({
			username: this.state.loginText
		}, () => {
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
