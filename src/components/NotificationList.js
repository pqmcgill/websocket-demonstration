import React from 'react';
import Notification from './Notification';

export default (props) => {
	const notifications = props.notifications.map((notification, i) => {
		return <Notification key={ i } { ...notification } />;
	});
	return (
		<ul style={{ float: 'right' }}>
			{ notifications }
		</ul>
	);
}
