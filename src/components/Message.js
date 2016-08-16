import React from 'react';

export default (props) => {
	const { msg, author } = props;
	return <li>{ author } said: { msg }</li>;
}
