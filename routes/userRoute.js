const express = require('express');
const router = express.Router()
const {registerUser, loginUser, home,testUser} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')


router.get('/testUser', testUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/home', protect, home);


module.exports = router