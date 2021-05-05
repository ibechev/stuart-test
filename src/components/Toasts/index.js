import './index.css';

const Toasts = ({ toasts }) => {
    return (
        <div className='toasts-container'>
            { 
                toasts.map(({ id, ...rest }) => (
                    <div className='toast' key={ id }>{ rest.text }</div>
                )) 
            }
        </div>
    );
};

export default Toasts;