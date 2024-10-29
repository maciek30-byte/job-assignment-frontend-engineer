import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useLoginMutation, LoginError } from '../../hooks/useLoginMutation';
import { NavBar } from '../shared/NavBar';
import { Footer } from '../shared/Footer';
import { useRedirect } from '../../hooks/useRedirect';
import { FormField } from './FormField';

export default function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { redirectTo } = useRedirect();
    const { login } = useAuth();
    const loginMutation = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            const response = await loginMutation.mutateAsync({ email, password });
            login(response.user);
            redirectTo('/');
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
                                    <FormField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <FormField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
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