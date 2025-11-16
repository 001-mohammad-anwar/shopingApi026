const express = require('express');
const router = express.Router();
const authController = require('../controler/auth-controller.js')
const signupSchema = require('../validator/auth-validator')
const validate = require('../midelware/validate-middleware');
// const authMiddleware = require('../midelware/auth-middleware');
// Home route (GET)
router.route('/').get(authController.home);
router.route('/registration').get(authController.registration);
router.route('/registration').post(validate(signupSchema) , authController.registration);
// // router.route('/login').get(authController.login);
// router.route('/login').post(authController.login);
// router.route('/user').get(authMiddleware,  authController.user);
// // Export the router
module.exports = router; 