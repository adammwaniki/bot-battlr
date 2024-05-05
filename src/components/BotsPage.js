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
* Step 5. We now add the event handler functions that will handle these actions so that we can pass them in to be rendered by just calling their names instead of the full function

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
  // Add the selected bot to YourBotArmy
  // First confirming that the bot has bot been selected before so that it can be added to the army
  if (!yourBotArmy.some(bot => bot.id === selectedBot.id)) {
    setYourBotArmy([...yourBotArmy, selectedBot]);
  }

  // Clear the selected bot and hide the BotSpecs
  setSelectedBot(null);
  setShowBotSpecs(false);
  
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
      {showBotSpecs ? (
        <BotSpecs bot={selectedBot} onGoBack={handleGoBack} onEnlist={handleEnlistBot} />
      ) : (
      <div>
        <YourBotArmy bots={yourBotArmy} onRemoveBot={handleRemoveBot} />
        <BotCollection bots={bots} onSelectBot={handleBotSelect} />
      </div>
    )}
    </div>
      
  )
}

export default BotsPage;
