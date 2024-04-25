const express = require('express');
const UsersController = require('../controllers/users');
const router = express.Router();

router.post('/', UsersController.createUser);
router.get("/:id", UsersController.getUser);



module.exports = router;