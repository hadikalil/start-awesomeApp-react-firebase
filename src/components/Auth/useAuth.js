import React from "react";
// import the firebase instance :-
import firebase from "../../firebase";

// onAuthStateChanged listner ==> it's going to detect whethher a user is logged in or created an account 
// create a hook for the sake of listening as to whether we have an authenticated user or not 

function useAuth() {
    const [authUser, setAuthUser] = React.useState(null);
    // within use effect there is listener . we want to remove it whenever we've unbounded whenever we don't need to use this hook 
    // so we made the unsubscribe varibal and to get rid of it at he bottom 
    // we return a function to clean up if necessarly 
    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => unsubscribe(); // so now we're not executing our listener unnecessarily
    }, []);

    return authUser;
    // thake that user and provide it to the rest of our app
}

export default useAuth;


// to see how it works go to LinkList.js