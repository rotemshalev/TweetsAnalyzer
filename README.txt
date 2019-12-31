################################################################
#----- Testr Assignment - Analyzing a live Twitter stream -----#
#------------------------ Rotem Shalev ------------------------#
################################################################

- Introduction
  Backend service that analyze a Twitter stream, and gives the bellow information:
  * Top 10 words with their count
  * Top 10 users with their tweet count
  * Top 10 hashtags with their count
  * Avg. tweets per second
  I've used these tools: Node.js, Express(), ES6

- RUN INSTRUCTIONS
  1. npm install
  2. cd client -> npm install
  3. go back to the project root directory (from client) and then run: npm start

- Assumptions:
  1. The stream sends data continuously, and each chunk that is received doesn't have to be a full valid json object that represent
     a tweet, it can send the data part by part.
  2. The client side need to interact with the server side, request for the analyzed data and to show it.
  3. the Server side analyze the data immediately when receiving a new tweet.
  

DESIGN
  * Backend - Node.js, ES6, Express()
  * Frontend - React, ES6 (Babel), HTML, CSS3
  
  Backend service is connected to the stream as soon as the app is running, and analyzing it by parsing each chunk of
  data to a valid json object, that represents a tweet. When finishing to parse the chunk to a valid tweet object, the backend service
  start to count the users, their words frequency and their hashtags frequency.

  The Frontend service is asking for one of the three - users, words or hashtags frequency and the backend service sends it the requested
  data. 

DATA STRUCTURE
  The users, words and hashtags frequency are being counted with HashMap (Object{} in Javascript), with an insertion efficiency of O(n):
  {
    'debilu2': 18,
    'golden40s': 10,
    'debilu2': 2,
    'monkeyface__': 7,
    'emhstewart': 9,
    'Anyonebuttrump3': 15
  }

  To sort the object we convert it to array and then we sort it by the key's numeric value.
  we sends back an Array of arrays, like this: (Example After 18min of analyzing)
  
  Usernames freq:
  [
    [ 'DsOchoa', 17 ],
    [ 'Honeste82021993', 17 ],
    [ 'kimhalliburton', 18 ],
    [ 'peteach65', 19 ],
    [ 'debilu2', 20 ],
    [ 'golden40s', 20 ],
    [ 'monkeyface__', 24 ],
    [ 'KelCampy', 25 ],
    [ 'Anyonebuttrump3', 35 ],
    [ 'emhstewart', 37 ]
  ]

  Words freq:
  [
    [ 'for', 2823 ],
    [ 'in', 3032 ],
    [ 'and', 3120 ],
    [ 'a', 4338 ],
    [ 'is', 4376 ],
    [ 'of', 4750 ],
    [ 'Trump', 5859 ],
    [ 'to', 6439 ],
    [ 'the', 8278 ],
    [ 'RT', 12150 ]
  ]

  HashTags freq:
  [
    [ 'IMPOTUS', 16 ],
    [ 'Mulvaney', 17 ],
    [ 'PresidentSanders', 17 ],
    [ 'Giuliani', 18 ],
    [ 'MAGA', 21 ],
    [ 'ImpeachAndRemoveTrump', 21 ],
    [ 'AsimRiaz', 25 ],
    [ 'DonTheCon', 26 ],
    [ 'MondayThoughts', 77 ],
    [ 'Trump', 158 ]
  ]

  The continues data in the Frontend is arriving by polling with fetch(), in an interval of 1000ms (1s).
  The Backend is analyzing the data immediately when it pull tweets, with no delay time.

PRODUCTION THOUGHTS & POINTS TO CHANGE
  - We need to think what would be compatible for a large scale operations.
    First, we need to separate the Frontend and the Backend to a separated servers, to dedicate more resources to each side.
    Backend-wise:  1. Spread the countObjects of the usernames/words/hashtags into multiple variables, to gain more memory.
                   2. If we have hundreds of users openning the app, we should move the sortion method to the client side - so we only count
                      the usernames/words/hashtags on the server side, and due to the sortion efficiency O(n^2), we will sort the data on the
                      client side (so many users can open the app without having our server slowly processing).
    Frontend-wise: 1. Add use of Webpack to concentrate all Js files into a single file, to improve performence.
                   2. Create a graph/chart for each top 10 data, to visualize the proportions.
                   3. Add Sass/Less libraries.