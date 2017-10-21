# go to CMWDisplays folder and install the dependencies
npm install

#Please run below commond to install webpack dev server if npm install does not install it
npm install --save webpack-dev-server

#if u are getting an error regarding prop-types,then execute below command
npm install --save prop-types

#start the webpack dev server it is running on 8080 port..this is for development

npm start

#http://localhost:8080/


#start the json server
node ./node_modules/json-server/bin/index.js --watch ./data/data.json --port 3001


#prod build
 npm run build