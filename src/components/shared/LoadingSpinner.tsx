import React from 'react';

interface LoadingSpinnerProps {
    text?: string;
    className?: string;
}

export const LoadingSpinner = ({
    text = 'Loading...',
    className = ''
}: LoadingSpinnerProps): JSX.Element => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className={`text-center ${className}`}>
                <i className="ion-load-c ion-spin" style={{ fontSize: '3rem' }}></i>
                <p className="text-muted mt-3" style={{ fontSize: '1.2rem' }}>{text}</p>
            </div>
        </div>
    );
};