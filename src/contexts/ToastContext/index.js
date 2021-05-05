import { createContext, useState, useCallback, useEffect } from 'react';

import Toasts from '../../components/Toasts';

export const ToastContext = createContext();

const getNextId = allToasts => {
    const ids = allToasts.map(({ id }) => id);

    return ids.length > 0 ? Math.max(...ids) + 1 : 0
};

const ToastContextProvider = ({ children }) => {
    const [ toasts, setToasts ] = useState([]);

    const addToast = useCallback((toast) => {
        setToasts(allToasts => ([
            ...allToasts, { ...toast, id: getNextId(allToasts) }
        ]));
    }, [setToasts]);

    const handleToastsChange = () => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => setToasts((toasts) => toasts.slice(1)), 5000);
            
            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        handleToastsChange();
    }, [toasts]);

    return(
        <ToastContext.Provider value={ addToast }>
            { children }

            <Toasts toasts={ toasts } />
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;