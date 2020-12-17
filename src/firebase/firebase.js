//import he firebase things
import app from "firebase/app"
import "firebase/auth";
//import the config from the other file 
import firebaseConfig from './config'


// register\login
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth;
    }

    async register(name, email, password) {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(
            email,
            password
        );
        return await newUser.user.updateProfile({
            displayName: name
        });
    }

    async login(email, password) {
        return await firebase.auth().signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await firebase.auth().signOut()
            // we will consome this from the context @ header in the on click function 
    }

    async resetPassword(email) {
        await firebase.auth().sendPasswordResetEmail(email)
    }
}

const firebase = new Firebase();
//firebase.analytics();

export default firebase