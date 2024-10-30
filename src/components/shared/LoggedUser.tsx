import React from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export const LoggedUserNavBar = (): JSX.Element | null => {
    const { user, logout } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/#">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                    <li className="nav-item">
                        <a className="nav-link active" href="/#">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#/editor">
                            <i className="ion-compose"></i>
                            &nbsp;New Article
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#/settings">
                            <i className="ion-gear-a"></i>
                            &nbsp;Settings
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/#">
                            <i className="ion-person"></i>
                            &nbsp;{user.username}
                        </a>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={logout}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.425rem 0.8rem',
                            }}
                        >
                            <i className="ion-log-out"></i>
                            &nbsp;Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};