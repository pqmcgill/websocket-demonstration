import React from 'react';

export default (props) => {
	const { onChange, onJoin, value } = props;
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			onJoin();
		}
	};
	return (
		<div>
			<input type="text" 
				onKeyDown={ handleKeyDown }
				onChange={ onChange }
				value={ value }
				autoFocus
			/>
			<button onClick={ onJoin }>Join</button>
		</div>
	);
}
