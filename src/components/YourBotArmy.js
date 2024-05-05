import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({bots, onRemoveBot}) {
  //your bot army code here...
  
  // Function to handle bot removal
  const handleRemoveBot = (botId) => {
    // Filter out the bot with the specified ID
    const updatedBots = bots.filter((bot) => bot.id !== botId);
    // Call the onRemoveBot function passed as a prop
    onRemoveBot(updatedBots);
  };

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
        {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} onRemove={handleRemoveBot} />
          ))}
          Your Bot Army
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
