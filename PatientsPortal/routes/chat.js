var express = require('express');
var { sendmessage,conversationquery,conversations} = require("../controller/chat");
const { doctorrequireSignIn }= require('../controller/auht');
var router = express.Router();

router.get("/conversations", conversations);
router.get("/conversation/query/:sender/:reciever" ,conversationquery);
router.post("/sendmessage",sendmessage);



module.exports = router;