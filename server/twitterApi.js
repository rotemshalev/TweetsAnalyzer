const Router = require('express').Router();
const Request = require('request');
const parseJsonStream = require('parse-json-stream');

const config = require('../config');
let usersCount = {};
let wordsCount = {};
let hashtagsCount = {};
let countSeconds = new Date();
let tweetCounter = 0;
let avgTweetsPerSecond = 0;

Router.get('/top/users', (req, res) => {
  let sortedUsernamesCount = sortObject(usersCount);
  let top10Users = sortedUsernamesCount.slice(Math.max(sortedUsernamesCount.length - 10, 1));
  res.send(top10Users);
})

Router.get('/top/words', (req, res) => {
  let sortedWordsCount = sortObject(wordsCount);
  let top10Words = sortedWordsCount.slice(Math.max(sortedWordsCount.length - 10, 1));
  res.send(top10Words);
})

Router.get('/top/hashtags', (req, res) => {
  let sortedHashtagsCount = sortObject(hashtagsCount);
  let top10Hashtags = sortedHashtagsCount.slice(Math.max(sortedHashtagsCount.length - 10, 1));
  res.send(top10Hashtags);
})

Router.get('/avg', (req, res) => {
  res.send(avgTweetsPerSecond);
})

Request(config.urls.twitter).on('data', (chunk) => {
  parseInstance.parse(chunk);
})

let parseInstance = new parseJsonStream((err, latestTweet) => {
  if (latestTweet) {
    avgTweetsPerSecond = (++tweetCounter / ((new Date() - countSeconds)/1000)).toFixed(2);
    countUsername(latestTweet.user.screen_name);
    countWords(latestTweet.text);
    countHashtags(latestTweet.entities.hashtags);
  }
});

let countUsername = (username) => {
  usersCount[username] ? usersCount[username]++ : usersCount[username] = 1;
}

let countWords = (tweetText) => {
  words = tweetText.split(' ');
  for (let i=0; i<words.length; i++) {
    wordsCount[words[i]] ? wordsCount[words[i]]++ : wordsCount[words[i]] = 1;
  }
}

let countHashtags = (hashtags) => {
  for (let i=0; i<hashtags.length; i++) {
    hashtagsCount[hashtags[i].text] ? hashtagsCount[hashtags[i].text]++ : hashtagsCount[hashtags[i].text] = 1;
  }
}

let sortObject = (obj) => {
  let newSortedObj = [];
  for (let item in obj) {
   newSortedObj.push([item, obj[item]]);
  }
  newSortedObj.sort((user, nextUser) => {
    return user[1] - nextUser[1];
  })
  return newSortedObj;
}

module.exports.router = Router;