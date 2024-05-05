import React, {useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

// Algorithm 
/*
* Step 1. We start by initialising the state variables for use with the useState hook. In this case bots and setBots. Initialize as an empty array
* Step 2. We then use the useEffect hook to fetch the bots from the API.
* Step 3. We now pass the bots as props to the BotCollection component so that it can be rendered there

*/

function BotsPage() {
  //start here with your code for step one
  // Step 1
  const [bots, setBots] = useState([]) // Initializing it as an empty array

  // Step 2
  // Using the useEffect hook for GET request
  useEffect(() => {
    fetch("http://localhost:8002/bots")
    .then(res => res.json())
    .then(data => setBots(data)) // Updating the state variable with the fetched data
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []) // Remember the empty dependency array so that the fetch only runs once on mount

  // Step 3
  // Passing the bots as props to the BotCollection component

  return (
    <div>
      <YourBotArmy />
      <BotCollection bots={bots} />
    </div>
  )
}

export default BotsPage;
