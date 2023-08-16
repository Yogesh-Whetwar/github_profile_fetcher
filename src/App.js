import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [githubData, setGithubData] = useState(null);
  const [linkedinData, setLinkedinData] = useState(null);

  const fetchGithubProfile = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}`);
      const data = await response.json();
      setGithubData(data);
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
    }
  };

  const fetchLinkedinProfile = async () => {
    try {
      // You might need an authentication token for the LinkedIn API
      const response = await fetch(`https://api.linkedin.com/v2/me`, {
        headers: {
          Authorization: 'Bearer YOUR_LINKEDIN_ACCESS_TOKEN',
        },
      });
      const data = await response.json();
      setLinkedinData(data);
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
    }
  };

  return (
    <div className="profile-fetcher">
      <div>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
        />
        <button onClick={fetchGithubProfile}>Fetch GitHub Profile</button>
      </div>
      {githubData && (
        <div className="profile-card">
          <h2>GitHub Profile</h2>
          <img src={githubData.avatar_url} alt="GitHub Avatar" />
          <p>Username: {githubData.login}</p>
          <p>Followers: {githubData.followers}</p>
        </div>
      )}

      {/* Similar logic for LinkedIn */}
    </div>
  );
};

export default App;

