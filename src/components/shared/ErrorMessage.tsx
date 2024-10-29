import React from 'react';

interface ErrorMessageProps {
    message: string | React.ReactNode;
    className?: string;
}

export const ErrorMessage = ({ message, className = '' }: ErrorMessageProps): JSX.Element => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className={`alert alert-danger text-center ${className}`} role="alert">
                <i className="ion-close-circled"></i>
                <span className="ml-2">{message}</span>
            </div>
        </div>
    );
};