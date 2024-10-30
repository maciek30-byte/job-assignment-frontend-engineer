import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import React from "react";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import { AuthorProfilePage } from "./pages/AuthorProfilePage";
import Settings from "./Settings";
import {Layout} from "./components/Layout/Layout";


function App(): JSX.Element {
  return (
      <Layout>
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/profile/:username" exact component={AuthorProfilePage} />
          <Route path="/:slug" exact component={ArticleDetailsPage} />
          <Route path="/" component={ArticlesPage} />
      </Switch>
    </Router>
      </Layout>

  );
}

export default App;
