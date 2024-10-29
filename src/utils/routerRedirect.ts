import { useHistory } from "react-router-dom";

export const redirectTo = (path: string): void => {
    const history = useHistory();
    history.push(path);
};

