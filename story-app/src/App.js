import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userStory, setUserStory] = useState('');

  const handleGenerateStory = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-story', {
        userStory
      });

      setUserStory(userStory + response.data.generatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Collaborative Storytelling App</h1>
      <div>
        <textarea
          className='story'
          rows="10"
          cols="75"
          placeholder="Start the story..."
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button onClick={handleGenerateStory}>Continue the Story</button>
      </div>
    </div>
  );
}

export default App;