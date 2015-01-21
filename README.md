##### README ######

##### About #####
This is mongodb search demo with socket.io and node js.

#### Installation ####
1. Clone the repo.
2. Make sure mongodb is running.
3. Edit the app.js file and change:
   3.1 MONGO_DB to mongoDB name
   3.2 MONGO_COLLECTION to mongoDB collection in which we want to search
   3.3 `title` in find command to key/field of document you want to search. eg. I want to search my document for `title` field (String).
4. run `npm install`
5. run `node app.js`
6. Now it should be working on http://localhost:3000
