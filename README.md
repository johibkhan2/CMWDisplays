# got to client folder and install the dependencies
npm install

#Please run below commond to install webpack dev server if npm install does not install it
npm install --save webpack-dev-server

#start the webpack dev server it is running on 8080 port

npm start

#http://localhost:8080/


#start the json server
node ./node_modules/json-server/bin/index.js --watch ./data/data.json --port 3001