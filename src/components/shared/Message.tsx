import React from 'react';

type MessageType = 'success' | 'info' | 'warning' | 'danger';

interface MessageProps {
    type: MessageType;
    message: string | React.ReactNode;
    className?: string;
}

const iconMap: Record<MessageType, string> = {
    success: 'ion-checkmark-circled',
    info: 'ion-information-circled',
    warning: 'ion-alert-circled',
    danger: 'ion-close-circled'
};

export const Message = ({
    type,
    message,
    className = ''
}: MessageProps): JSX.Element => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className={`alert alert-${type} text-center ${className}`} role="alert">
                <i className={iconMap[type]}></i>
                <span className="ml-2">{message}</span>
            </div>
        </div>
    );
};