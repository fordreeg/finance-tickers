'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  {ticker: 'AAPL', status: true, exchange: 'NASDAQ'}, // Apple
  {ticker: 'GOOGL', status: true, exchange: 'NASDAQ'}, // Alphabet
  {ticker: 'MSFT', status: true, exchange: 'NASDAQ'}, // Microsoft
  {ticker: 'AMZN', status: true, exchange: 'NASDAQ'}, // Amazon
  {ticker: 'FB', status: true, exchange: 'NASDAQ'}, // Facebook
  {ticker: 'TSLA', status: true, exchange: 'NASDAQ'}, // Tesla
];

let newTicker = [...tickers],
    NEW_FETCH_INTERVAL = FETCH_INTERVAL;


function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {

  const quotes = newTicker.map(ticker => {
    if (ticker.status) {
      return {
        ticker: ticker.ticker,
        exchange: ticker.exchange,
        price: randomValue(100, 300, 2),
        change: randomValue(0, 200, 2),
        change_percent: randomValue(0, 1, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
        status: ticker.status
      }
    } else {
      return {
        ticker: ticker.ticker,
        exchange: ticker.exchange,
        price: null,
        change: null,
        change_percent: null,
        dividend: null,
        yield: null,
        last_trade_time: null,
        status: ticker.status
      }
    }
  });

  socket.emit('ticker', quotes);
  socket.emit('TICKER:SET_INTERVAL', {NEW_FETCH_INTERVAL});
}

let timerID;

function trackTickers(socket, resetTimer = false) {
  
  resetTimer ? clearInterval(timerID) : getQuotes(socket);
  
  timerID = setInterval(function() {
    getQuotes(socket);
  }, NEW_FETCH_INTERVAL);
  
  if (resetTimer) {
    getQuotes(socket);
  }

  socket.on('disconnect', function() {
    clearInterval(timerID);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
  
  socket.on('TICKER:STATUS_TOGGLE', ({nameTicker, status}) => {
    newTicker = tickers.map(ticker => {
      if (ticker.ticker === nameTicker) {
        ticker.status = status;
      }
      return ticker
    })
    trackTickers(socket, true);
  });
  
  socket.on('TICKER:SET_INTERVAL', ({interval}) => {
    NEW_FETCH_INTERVAL = interval;
    trackTickers(socket, true);
  });
  
  socket.on('TICKER:REMOVE', ({nameTicker}) => {
    newTicker = tickers.filter(ticker => ticker.ticker !== nameTicker)
    trackTickers(socket, true);
  });
  
  socket.on('TICKER:ADD', ({nameTicker, exchange}) => {
    newTicker.push({
      ticker: nameTicker,
      exchange: exchange,
      status: true,
    })
    trackTickers(socket, true);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
