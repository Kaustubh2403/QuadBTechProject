const express = require("express");
const router = express.Router();
const {getUserByUserId, getUserImageByUserId, insertUser, updateUserByUserId, deleteUserById, getAllUser} = require('../controller/userController')

router.get("/datails/:userId", getUserByUserId)

router.put("/update", updateUserByUserId)

router.get("/image/:userId", getUserImageByUserId)

router.post("/insert/", insertUser)

router.delete("/delete/:userId", deleteUserById)

router.get("/details", getAllUser)

module.exports = router
