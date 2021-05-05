import './index.css';

const InputWithIcon = ({ icon, status, ...props }) => {
	return (
		<div className='input-wrapper'>
			<img src={ icon } alt='input' />
			<input { ...props } />
		</div>
	);
};

export default InputWithIcon;