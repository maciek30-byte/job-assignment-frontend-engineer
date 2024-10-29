import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useLoginMutation, LoginError } from '../../hooks/useLoginMutation';
import { NavBar } from '../shared/NavBar';
import { Footer } from '../shared/Footer';

export default function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const history = useHistory();
    const { login } = useAuth();
    const loginMutation = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            const response = await loginMutation.mutateAsync({ email, password });
            login(response.user);
            history.push('/');
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'errors' in error) {
                const loginError = error as LoginError;
                const errorMessages = Object.entries(loginError.errors)
                    .map(([key, messages]) => `${key} ${messages.join(', ')}`)
                    .join('; ');
                setErrorMessage(errorMessages);
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign in</h1>
                            <p className="text-xs-center">
                                <a href="/#/register">Need an account?</a>
                            </p>

                            {errorMessage && (
                                <ul className="error-messages">
                                    <li>{errorMessage}</li>
                                </ul>
                            )}

                            <form onSubmit={handleSubmit}>
                                <fieldset disabled={loginMutation.isLoading}>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </fieldset>
                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                        disabled={loginMutation.isLoading}
                                    >
                                        {loginMutation.isLoading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}