import React from 'react';

export default (props) => {
	const { title, msg } = props;
	const notificationStyle = {
		border: 'solid 2px red',
		color: 'red',
		padding: '5px'
	};
	return (
		<li style={ notificationStyle }>
			<h3>{ title }</h3>
			<p>{ msg }</p>
		</li>
	);
}
