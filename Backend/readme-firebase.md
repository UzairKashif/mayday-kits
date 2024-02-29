Go to firebase console and create a project

Copy the configurations from there after registering your web app

Run in backend:

npm install -g firebase-tools

firebase init (select functions)

cd functions
npm install firebase-admin firebase-functions axios

modify the index.js as per your cloud functions and deploy the index.js using:
firebase deploy --only functions

similarly to deploy a new function
run 
firebase init functions
then give name to new codespace and then again while deploying it do:

cd (whatever name you gave to codespace/directory)
npm install firebase-admin firebase-functions axios

After deploying, you can run (firebase functions:log) to check the logs for debugging