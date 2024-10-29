import { useHistory } from 'react-router-dom';

export const useRedirect = () => {
    const history = useHistory();

    const redirectTo = (path: string): void => {
        history.push(path);
    };

    return { redirectTo };
};