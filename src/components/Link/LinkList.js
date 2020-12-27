// after we did the creatLink and we have the data at the fire base we need to get it to the linklist
import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkList(props) {
  // first we need the firebase instins so we need to consume from FirebaseContext ----// we need the firebase instance in order to make a reqest to the database
  const { firebase } = React.useContext(FirebaseContext);

  // second after fitching the data with onSnapshot() ---> we need to display it --> so -->>
  // so we need a state for our links to live in
  const [links, setLinks] = React.useState([]); // this will be an empty array --> set by  handleSnapshot()

  // making a request when linkList component mounts
  React.useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    //firebase.db().collection('links').get() *********get returns a promise  and we can await the promise
    firebase.db().collection("links").onSnapshot(handleSnapshot); //*********** .onSnapshot() method to get the data ==> it sets up an active listener - like the onAuthStateChanged() listener that we used at useAuth.js
    // .onSnapshot() method it's going to listen for any changes with the collection // so when we add new link it's going to be immediately fetched and desplayd in LinkList
  }

  function handleSnapshot(snapshot) {
    // .onSnapshot() we get a callback function where we can work with all of the documents on a given collection **> snapshot.docs is an array
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }; // id:doc.id, will add to the object the collection-link-id
    });
    setLinks(links);
    

  }

  return (
    <div>
    { links.map((link, index) => (
      <LinkItem
        key={link.id}
        showCount={true}
        link={link}
        index={index + 1}
      /> 
    ))}
    </div>
  );
}

export default LinkList;