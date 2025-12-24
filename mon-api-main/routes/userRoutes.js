const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:email', userController.getUserByEmail);
router.put('/:email', userController.updateUserByEmail);
router.patch('/:email', userController.patchUserByEmail);
router.delete('/:email', userController.deleteUserByEmail);

module.exports = router;