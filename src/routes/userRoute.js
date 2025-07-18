const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/userController');
const accessControl = require('../middlewares/permission.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

console.log('Signup route loaded');
router.post('/signup' , authMiddleware, accessControl('users', 'signup'), signup); // for signing up 
router.post('/signin', signin); // for signing in 

module.exports = router;