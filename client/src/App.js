import React, { Component } from 'react';
import TopItems from './topItems/topItems'
import AvgTweetsPerSecond from './avgTweetsPerSecond/avgTweetsPerSecond';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      top10Users: [],
      top10Words: [],
      top10Hashtags: []
    };
  }

  componentDidMount = () => {
    this.timer = setInterval(()=> {
      this.getTop10Users();
      this.getTop10Words();
      this.getTop10Hashtags();
      this.getAvgTweetPerSecond();
    }, 1000);
  }
  
  componentWillUnmount = () => {
    this.timer = null;
  }
  
  getTop10Users = () => {
    fetch("http://localhost:8000/tweets/top/users")
    .then(result => result.json())
    .then(result => {
      this.setState({ top10Users: result });
    })
    .catch(e => {
      console.log(e)
    });
  }
  
  getTop10Words = () => {
    fetch("http://localhost:8000/tweets/top/words")
    .then(result => result.json())
    .then(result => {
      this.setState({ top10Words: result });
    })
    .catch(e => {
      console.log(e)
    });
  }
  
  getTop10Hashtags = () => {
    fetch("http://localhost:8000/tweets/top/hashtags")
    .then(result => result.json())
    .then(result => {
      this.setState({ top10Hashtags: result });
    })
    .catch(e => {
      console.log(e)
    });
  }

  getAvgTweetPerSecond = () => {
    fetch("http://localhost:8000/tweets/avg")
    .then(result => result.json())
    .then(result => {
      this.setState({ avgTweets: result })
    })
    .catch(e => {
      console.log(e)
    });

  }

  render() {
    return (
      <div>
        <div className="results">RESULTS</div>
        <div className="titles">
          <div className="title">Top 10 users</div>
          <div className="title">Top 10 Words</div>
          <div className="title">Top 10 Hashtags</div>
        </div>
        <div className="allTopItems">
          <TopItems items={this.state.top10Users} />
          <TopItems items={this.state.top10Words} />
          <TopItems items={this.state.top10Hashtags} />
        </div>
        <AvgTweetsPerSecond avg={this.state.avgTweets} />
      </div>
    );
  }
}

export default App;
