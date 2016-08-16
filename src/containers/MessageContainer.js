import React, { Component } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import LoginForm from '../components/LoginForm';
import NotificationList from '../components/NotificationList';

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

		this.handleLoginTextChange = this.handleLoginTextChange.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
		this.handlePost = this.handlePost.bind(this);
		this.handleMessageTextChange = this.handleMessageTextChange.bind(this);
		this.handleIncomingNotification = this.handleIncomingNotification.bind(this);
	}

	handleIncomingNotification (note) {
		this.setState({
			notifications: this.state.notifications.concat([ note ])
		}, () => {
			setTimeout(() => {
				// remove note after 5 seconds
			}, 5000);
		});
	}

	handleLoginTextChange (e) {
		this.setState({
			loginText: e.target.value
		});
	}

	handleMessageTextChange (e) {
		this.setState({
			messageText: e.target.value
		})
	}

	handlePost () {
		this.setState({
			messages: this.state.messages.concat([{
				msg: this.state.messageText,
				author: this.state.username
			}])
		}, () => {
			this.setState({
				messageText: ''
			});
		});
	}

	handleJoin () {
		this.setState({
			username: this.state.loginText
		}, () => {
			this.setState({
				loginText: ''
			});
		});
	}

	render () {
		const { loginText, messageText } = this.state;
		const { handleJoin, handlePost, handleLoginTextChange, handleMessageTextChange } = this;
		const input = this.state.username ? 
			<MessageInput onPost={ handlePost } value={ messageText } onChange={ handleMessageTextChange }/> :
			<LoginForm onJoin={ handleJoin } value={ loginText } onChange={ handleLoginTextChange }/>;

		return (
			<div>
				<NotificationList notifications={ this.state.notifications }/>
				<MessageList messages={ this.state.messages }/>
				{ input }
			</div>
		);
	}
}
