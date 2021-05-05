import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ToastContextProvider from './contexts/ToastContext';

ReactDOM.render(
    <React.StrictMode>
        <ToastContextProvider>
            <App />
        </ToastContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
