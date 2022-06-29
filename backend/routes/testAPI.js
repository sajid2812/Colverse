var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
let userArray;

const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      // console.log(listUsersResult.users);
      userArray = listUsersResult.users;
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

router.get("/", function (req, res, next) {
  res.send(userArray);
});

module.exports = router;
