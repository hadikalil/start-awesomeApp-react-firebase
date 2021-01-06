import React from "react";
import LinkItem from "./LinkItem";
import FirebaseContext from "../../firebase/context";

// ,,&@@@@@@@@@@@@@@&&&&&&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ,,&@@@@@@@@@@@@&&&&&&&&&&&@@@@@@@@&%###((((###%&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ,,&@@@@@@@@@@@&&&&&&&&&&&&@@@&%((/////////(((((###%&@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ,,&@@@@@@@@@&&&&&&&&&&&&&&&#(//***********////(((((###%@@@@@@@@@@@@@@@@@@@@@@@@@
// ..&@@@@@@@@&&&&&&&&&&&&&%#(/*****************/////(((##%%@@@@@@@@@@@@@@@@@@@@@@@
// ..&@@@@@@&&&&&&&&&&&&&&%(/****,,*,,**,,,,,*,****//((((##%%@@@@@@@@@@@@@@@@@@@@@@
// ..&@@@@@&&&&&&&&&&&&&%%(/****,,,,,,,,,,,,,,,,,***//(((##%%&@@@@@@@@@@@@@@@@@@@@@
// ..&@@@@&&&&&&&&&&&&&%%%//*,,,,,,,,,,,,,,,,,,,,***////(###%%@@@@@@@@@@@@@@@@@@@@@
// ..%@@@&&&&&&&&&&&&%%%%#/****,,,,,,,,...,,,,,,,****///((##%%&@@@@@@@@@@@@@@@@@@@@
// ..%@@&&&&&&&&&&&&&%%%%(/*,,,,,,*,,,,,.,,,,,,,,*,**///(####%&&&&&@@@@@@@@@@@@@@@@
// ..%@&&&&&&&&&&&&%%%(///(*,*/#%&&&&&&&&%(*,,**(%%&&&&@@@&%#%&##&&@@@@@@@@@@@@@@@@
// . %&&&&&&&&&&&&%%%((/*#/*,,,*(#&#%%&&%(*,.,/#&&@@&&@@&%###%&%%%%@@@@@@@@@@@@@@@@
//   %&&&&&&&&&&&&%%%(/*/%/*,,,,,***///(/,,,,,/#(((((((##((((#&&###&@@@@@@@@@@@@@@@
//   %&&&&&&&&&&&%%%%#*/(&(*,,,,,,...,,,,,,,,*/((/**,,*****/(#&&#(%&@@@@@@@@@@@@@@@
//   %&&&&&&&&&&%%%%%%**#&%*,,,,,,,,,,..,,,,,*/(((/**,,****/(%@@##&&&@@@@@@@@@@@@@@
//   %&&&&&&&&&%%%%%%%%/#&&#,,,,,,,,,,,*,,,,,,*(((/*,,***//(#&@&%&&&&@@@@@@@@@@@@@@
//   %&&&&&&&&%%%%%%%%%%&@&%*,,,,,,,,**,*,,,,*/##((/*,***/(#%@@@@&&@@@@@@@@@@@@@@@@
//   %&&&&&&&&%%%%%%%%%%@@&&/*,,,,,**,,,,*#%@@@@%#(/****/((#&@@@@&&@@@@@@@@@@@@@@@@
//   %&&&&&&&&%%%%%%%%%&@@@&#*,,,*(#%&&%%%%&&&&%&&&&&&%(/((#&@@@@@&@@@@@@@@@@@@@@@@
//   %&&&&&&&%%%%%%%&%&&@@@&&#/(%%&@&&&&&@&&&&%&&&&&&&&@&##&@@@@@&&@@@@@@@@@@@@@@@@
//   %&&&&&&&%%%%%%%%&&&@@@@@&&&@@@@&&#(/***///((##%&&@@@&@@@@@@@@&&&&@@@@@@@@@@@@@
//   %&&&&&&&%%%%%%%&&@@@@@@@&@@@@@&&&&%%&%#&%%%&%%%&&@@@@@@@@@@@@@&&&&@@@@@@@@@@@@
//   %&&&&&&&%%%%&&@@@@@@@@@&@&&@&&@@&&&&&@@@@&&&@&&&@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@
//   %&&&&&&&%%&@&@@@@@@@@@@&&@&&&&&@@&&&&&&&@&&@&&&&&&%#&&&@@@@@@@@@@@@@@@@@@@@@@@
//   %&&&&&&%%&&@@@@@@@@@@&%&&@&&@&&@@&&@@@&&&&@&&@&&&&&&%%&&&@@@@@@@@@@@@@@@@@@@@@
//   %&&&&&&&&&@@@@@@@@@@&&&&@@&&@@&&&&&&@&&&&@&&&&&&%%&&&&%&@@@@@@@@@@@@@@@@@@@@@@
//   %&&&&&&@&&@@@@@@@@@@@%&@&&&&&@@@&&&&&&&@@&&&%%%%&&&%&&&%&&@@@@@@@@@@@@@@@@@@@@
//   %&&&&@&&&@&&@@@@@@@@@&&&&&%%&@&&@&&@@@&@@@&&&&&&&&@&@%&&&@@@@@@@@@@&&&&@@@@@@@
//   &@@@@@@@&@&%&@@@@@@@@@@&&&&%&&&&@&&@@&%&@@&&&%%%&&@@@&@&@@@@@@@&&&&&&&@@@@@@@@
//   %@@@&@@@@@@@&&@@@@@@@@@@&%%&&%&&&&&&@&@&&@&@&&&%&@&@@@@@@@@@@@@@@@&@@@&&@@@@@@
//   %@@@@@@@@@@@%@@&@@@@@@@@@@@@&@@@&@&@&@&&@@@@@@@&&&@@@@@@@@@@@@@@@@@@&&&@&@@@@@
//   &@&@@@&@@@@@&@&%@@@@@@@@@@@@@@@@@@@@&@@@@@@@@@&@@@@@@@@@@@@@@@@@@@@@@@@&&&@@@@

function SearchLinks() {
  const { firebase } = React.useContext(FirebaseContext);
  const [filteredLinks, setFilteredLinks] = React.useState([]); //filteredLinks
  const [links, setLinks] = React.useState([]); // the links from firebase
  const [filter, setFilter] = React.useState(""); //THE search input

  React.useEffect(() => {
    // to import the links
    getInitialLinks();
  }, [links]);


  function getInitialLinks() {
    // gitting the links from firebase
    // //*********** .onSnapshot() method to get the data ==> it sets up an active listener - like the onAuthStateChanged() listener that we used at useAuth.js
     // .onSnapshot() method it's going to listen for any changes with the collection // so when we add new link it's going to be immediately fetched and update the  Links
    firebase
      .db()
      .collection("links")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }; // id:doc.id, will add to the object the collection-link-id
        });
        setLinks(links);
      });
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase(); //change the input search to lowerCase
    const matchedLinks = links.filter((link) => {
      // filter by description/url/postedBy
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={(event) => setFilter(event.target.value)} />
          <button>OK</button>
        </div>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem
          key={filteredLink.id}
          showCount={false}
          link={filteredLink}
          index={index}
        />
      ))}
    </div>
  );
}

export default SearchLinks;
