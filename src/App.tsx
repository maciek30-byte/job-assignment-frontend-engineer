import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Profile from "./Profile";
import LoginForm from "./components/LoginForm/LoginForm";


import ArticlesPage from "pages/ArticlesPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import { AuthorProfilePage } from "./pages/AuthorProfilePage";
function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        {/* <Route path="/editor" exact component={Editor} />
        <Route path="/editor/:slug" exact component={Editor} />
      
        <Route path="/logout" exact component={Logout} />
        
        <Route path="/profile/:username/favorites" exact component={Profile} />
        <Route path="/register" exact component={LoginRegister} />
        <Route path="/settings" exact component={Settings} /> */}
        <Route path="/login" exact component={LoginForm} />
        <Route path="/settings" exact component={Profile} />
        <Route path="/profile/:username" exact component={AuthorProfilePage} />
        <Route path="/:slug" exact component={ArticleDetailsPage} />
        <Route path="/" component={ArticlesPage} />
      </Switch>
    </Router>

  );
}

export default App;
