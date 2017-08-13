# HackerNews Data Analysis Interface
---

This project is a web interface for interacting with the data collected from [HackerNews](https://news.ycombinator.com/) and utilizes the analysis from [this](https://github.com/workofart/HackerNews) project

### Demo:
![Demo](https://raw.githubusercontent.com/workofart/HN-data-analysis/master/other/demo_v2.gif)

### Languages & Frameworks:

- Javascript
- Node.js
- Express.js
- React.js
- Semantic UI
- HTML/CSS
- [Create-react-app](https://github.com/facebookincubator/create-react-app)

### Dependencies
  - [MongoDB](https://docs.mongodb.com/manual/installation/) should be running on **localhost:27017**
  - [ZeroMQ](http://zeromq.org/)
  - Python
  - [ZeroRPC](http://www.zerorpc.io/) for Python and Node.js

### To Run

`npm start`

- Server will be running on **http://localhost:3001/**
- UI/Client will be running on **http://localhost:3000/**

`python api\controller\py_script.py`

- ZeroRPC python service will be listening to tcp://0.0.0.0:4242, *assuming python service is on the same machine as the node server*

### Other commands (create-react-app)

Please visit [here](https://github.com/facebookincubator/create-react-app/blob/master/README.md)

Due to the size of the database, I won't deploy this project on a hosting server. Feel free to clone the repo and run it.