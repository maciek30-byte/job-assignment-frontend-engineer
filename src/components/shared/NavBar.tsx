import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useRedirect } from '../../hooks/useRedirect';
export const NavBar = (): JSX.Element => {
    const { user, logout } = useAuth();

    const { redirectTo } = useRedirect();

    const handleLogout = () => {
        logout();
        redirectTo('/');
    };

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/#">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <a className="nav-link active" href="/#">
                            Home
                        </a>
                    </li>

                    {user ? (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/#/editor">
                                    <i className="ion-compose" />
                                    &nbsp;New Article
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#/settings">
                                    <i className="ion-gear-a" />
                                    &nbsp;Settings
                                </a>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link"
                                    onClick={handleLogout}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/#/login">
                                    Sign in
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#/register">
                                    Sign up
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};