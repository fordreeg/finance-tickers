
## Display price tickers data on the UI in realtime (price data is available from a locally running service).

### Application functionality:

* application connect to the locally running service
* application render price changes for some tickers in real time
* the possibility to switch on/off tickers by user
* the possibility to specify interval time by user
* the possibility to add/remove ticker from watching group


The following technologies were used:
- React
- Redux, Redux-Thunk 
- Socket.io
- UI library ANT Design

## Running the local service
1. Open a new bash shell
2. ```cd server```
3. ```npm install``` or ```yarn install```
4. ```npm run start``` or ```yarn start```
5. You can visit [http://localhost:4000](http://localhost:4000) to check that the service is working correctly and inspect the data it produces.

## Run your application
1. Open a new bash shell
2. ```cd client```
3. ```npm install``` or ```yarn install```
4. ```npm run start``` or ```yarn start```

