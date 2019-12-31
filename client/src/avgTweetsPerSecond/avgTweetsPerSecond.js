import React from 'react';
import './avgTweetsPerSecond.css';

const AvgTweetsPerSecond = ({ avg }) => {
  return (
    <div className="avg-tweets-container">
      <div class="avg-tweets-title">avg. Tweets per second:</div>
      {avg || "Loading..."}
    </div>
  )
}

export default AvgTweetsPerSecond;