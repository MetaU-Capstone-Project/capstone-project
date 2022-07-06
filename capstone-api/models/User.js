// const {storage} = require('../data/storage');
var Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'tW3HTz0fUSdMPmk1hE4qA8c9FbZqcerL3iY1kejp';
const PARSE_JAVASCRIPT_KEY = '1wbQ5EOY8c7z8jTSyfXVNblyphvMEvvXVLfXXOTq';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY); 
Parse.serverURL = 'https://parseapi.back4app.com/';

// TODO 
// const {BadRequestError} = require('../utils/errors')

class User {

    constructor() {
        this.super();
    }

    static getCurrentUser() {
        Parse.User.enableUnsafeCurrentUser();
        let currentUser = Parse.User.current();
        return currentUser;
    }

    static async logUserIn(usernameValue, passwordValue) {
        Parse.User.enableUnsafeCurrentUser();
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        return loggedInUser;
    }

    // static async registerUser(userValue) {
    //     let {usernameRegister, passwordRegister, emailRegister} = userValue;
    //     let user = new Parse.User();
  
    //     user.set("username", usernameRegister);
    //     user.set("password", passwordRegister);
    //     user.set("email", emailRegister);

    //     console.log('user register');
    //     console.log(user);
  
    //     try{
    //         await user.signUp();
    //         return "User created!";
    //     } catch (error) {
    //         return error.message;
    //     }
    // }

    static async registerUser(userValue) {
        let {usernameRegister, passwordRegister} = userValue;
        let user = new Parse.User();
  
        user.set("username", usernameRegister);
        user.set("password", passwordRegister);

        console.log('user register');
        console.log(user);
  
        try{
            await user.signUp();
            return "User created!";
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = User;