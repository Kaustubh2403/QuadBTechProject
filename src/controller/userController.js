const db = require('../database/connection/mysqlServer')
const usersModel = db.model("users")
const moment = require('moment')

const getUserByUserId = async function(req, res) {
    const userId = req.params.userId;
    console.log(userId);
    try {
      const user = await usersModel.findOne({ where: { "user_id": userId } });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllUser = async function(req, res) {

    try {
      const user = await usersModel.findAll();
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateUserByUserId = async function(req, res) {
    const userId = req.body.userId;
    if(userId == undefined || userId == null){
        return res.status(404).json({ error: 'UserId not given' });

    }
    let allKeys = Object.keys(req.body)
    try {
      const user = await usersModel.findOne({ where: { "user_id": userId },raw:true});
      console.log({allKeys,user});
      if (user) {
        for(let obj of allKeys){
            if(user[obj] == undefined){
               return res.status(404).json({ error: `Given wrong ${obj} field` });
            }
        }
        await usersModel.update(req.body, {
            where: {
              userId
            }
          })
        res.json({"messege":"details updated succesfully"});
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getUserImageByUserId = async function(req, res) {
    const userId = req.params.userId;
    try {
      const user = await usersModel.findOne({ where: { "user_id": userId }, attributes: ["user_image"] });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const insertUser = async function(req, res){
    try {
        let date = new Date()
        date = moment(date).format("YYYY-MM-DD HH:mm:ss")
        let userDetails  = req.body
        req.body['createdAt'] = date
        req.body['updatedAt'] = date
        const user = await usersModel.create(userDetails);
        if (user) {
          res.json({messege:"data insered successfully"});
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const deleteUserById = async function(req, res){
    try {
        const userId = req.params.userId;
        const user = await usersModel.destroy({
            where: {
              user_id: userId
            }
          })
        if (user) {
          res.json({messege:"user deleted successfully"});
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {getUserByUserId, getUserImageByUserId, insertUser, updateUserByUserId, deleteUserById, getAllUser}