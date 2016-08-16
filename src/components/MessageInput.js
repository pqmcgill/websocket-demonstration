import React from 'react';

export default (props) => {
	const { value, onPost, onChange } = props;
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			onPost();
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
			<button onClick={ onPost }>post</button>
		</div>
	);
}
