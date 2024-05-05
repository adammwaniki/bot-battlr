import React from "react";
import BotCard from "./BotCard";

// Algorithm
/*
* Step 1. Start by passing in bots as props
* Step 2. Use the map method to iterate over the list of bot items we received from the json data
* Step 3. These bot items will be passed as props into the BotCard component using the bot id as the key
* Step 4. Pass in onSelectBot and onRemoveBot as props so that when someone clicks on the BotCard, the event is triggered
*/

function BotCollection({bots, onSelectBot, onRemoveBot }) { // Step 1
  // Your code here
  // Step 2 and Step 3 will be handled here
  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} 
          onSelect={onSelectBot} // Pass onSelect prop to handle bot selection
          onRemove={onRemoveBot} // Pass onRemove prop to handle bot removal
          />
        ))}
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;
