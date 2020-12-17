import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//switch component to make sure all of our routes are put within a single chile component
//route component declaring each route
import CreateLink from "./Link/CreateLink";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import SearchLinks from "./Link/SearchLinks";
import LinkList from "./Link/LinkList";
import LinkDetail from "./Link/LinkDetail";
import Header from "./Header";
// user auth and context
import useAuth from "./Auth/useAuth"; // from this we get user data// to provide this the user data throughout our entire app with react context ---> will do that by create a context to pass it our data @t within the @@@@@firebase folder
import firebase, { FirebaseContext } from "../firebase"; //to use the provider property and to create this provider within router tags <FirebaseContext
 



//FirebaseContext.Provider can have in the value={only one value} so we give it an object to hold more than one 
// we need from the firebase the (מידי)instantiated firebase class
// then we can consume the user and the firebase class with consumer from context 
// we are going to uses them first in the ---> Header.js
function App() {
  const user = useAuth();
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }} >
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/new/1" />} />
              <Route path="/create" component={CreateLink} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/search" component={SearchLinks} />
              <Route path="/top" component={LinkList} />
              <Route path="/new/:page" component={LinkList} />
              <Route path="/link/:linkId" component={LinkDetail} />
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;

//    <Route exact path="/" render={() => <Redirect to="/new/1" />} />
// this line will redirect to the new dinamic route path="/new/:page"
