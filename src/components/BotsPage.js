import React, {useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";


// Algorithm 
/*
* Step 1. We start by initialising the state variables for use with the useState hook. In this case bots and setBots. Initialize as an empty array
* Step 2. We then use the useEffect hook to fetch the bots from the API.
* Step 3. We now pass the bots as props to the BotCollection component so that it can be rendered there
* We now add some more state variables to help us handle what happens when we click on the buttons
* Step 4. We add some state variables to handle selecting the bot, enlisting the bot and showing the bot specs
* Step 5. We now add the event handler functions that we can pass as props to the other components

*/

function BotsPage() {
  //start here with your code for step one
  // Step 1
  const [bots, setBots] = useState([]) // Initializing it as an empty array
  // Step 4
  const [yourBotArmy, setYourBotArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [showBotSpecs, setShowBotSpecs] = useState(false);

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

  // Step 5
  // Function to handle selecting a bot
const handleBotSelect = (bot) => {
  setSelectedBot(bot);
  setShowBotSpecs(true);
};

// Function to handle enlisting a bot
const handleEnlistBot = () => {
   if (selectedBot) { // We start by checking to see if a bot has been selected
    // Add the selected bot to YourBotArmy
    // First confirming that the bot has bot been selected before so that it can be added to the army
    // Here we can implement the some() method
    // Notes on the some() method:
    // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. if false it doesn't modify the array
    if (!yourBotArmy.some(bot => bot.id === selectedBot.id)) {
      setYourBotArmy([...yourBotArmy, selectedBot]);
    }

  // Clearing the selected bot and hide the BotSpecs once we select a bot so that it shows the botcollection
  setSelectedBot(null);
  setShowBotSpecs(false);
   }
};
// Function to handle go back
const handleGoBack = () => {
  setSelectedBot(null);
  setShowBotSpecs(false);
};
// Function to remove bot from the army
const handleRemoveBot = (botId) => {
  const updatedBots = yourBotArmy.filter(bot => bot.id !== botId);
  setYourBotArmy(updatedBots);
};


  // Step 3
  // Passing the bots as props to the BotCollection component

  return (
    <div>
      <YourBotArmy bots={yourBotArmy} onRemoveBot={handleRemoveBot} />
      {showBotSpecs ? (
        <BotSpecs bot={selectedBot} onGoBack={handleGoBack} onEnlist={handleEnlistBot} />
      ) : (
        <BotCollection bots={bots} onSelectBot={handleBotSelect} />
    )}
    </div>
      
  )
}

export default BotsPage;
