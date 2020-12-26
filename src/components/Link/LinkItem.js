import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getDomain } from "../../utils"; // getDomain is a function to make the url desplay pretter  in the link component
import distanceInWordsToNow from "date-fns/distance_in_words_to_now"; // formatting the timestamp  from library called date functions
import FirebaseContext from "../../firebase/context";

function LinkItem({ link, index, showCount, history }) {
  // in order to update firestore database we need a refercnce to the firebase instance--> we'll bring that in by using context
  // well destructur both firebase and the current user data
  const { firebase, user } = React.useContext(FirebaseContext);

  function handleVote() {
    //which users will cloik on in order to upvote a given link
    if (!user) {
      history.push("/login"); // to history we need to import  withRouter from react-router-dom and to warp the export default withRouter(LinkItem) after we need to d structure from out props the history object
    } else {
      console.log("linkitem ", user);
      ///////////////////////////////UPDATE PATTERN ///////////////////////////////////////////
      const voteRef = firebase.db().collection("links").doc(link.id); // creating a reference
      voteRef.get().then((doc) => {
        // doing get on the voteRef --> get()  return a promise so we could make  this an async function but this time will just add then --> and the callback to then we get access to our returnd document
        if (doc.exists) {
          // exists is a property that's made available by firestore on documents --> it fives the value true if it was able to be found successfully
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes });
        }
      });
    }
  }

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}</span>}
        <div className="vote-button" onClick={handleVote}>
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          {link.description}{" "}
          <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes by {link.postedBy.name}{" "}
          {distanceInWordsToNow(link.created)}
          {" | "}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0
              ? `${link.comments.length} comments`
              : "discuss"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
