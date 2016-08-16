import React from 'react';
import Message from './Message';

export default (props) => {
	const renderedMessages = props.messages.map((message, i) => (
		<Message key={ i } { ...message } />
	));
	return (
		<ul>
			{ renderedMessages }
		</ul>
	);
}
