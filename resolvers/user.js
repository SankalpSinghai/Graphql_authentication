const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { combineResolvers } = require('graphql-resolvers');
const { users , tasks } = require('../constants');
const User = require('../database/models/user');   
//const { isAuthenticated } = require('./middleware');

module.exports = {
    Query : {
       
        users : () => users,
        user : (_ , { id } , { email }) => {
            console.log('Hello', id);
            
            console.log('===',email);
            
            if(!email){
                throw new Error('Access Denied! Please login to continue');
            }
            return users.find(user =>  user.id === id)
         } 
    } ,
    Mutation : {
        signup : async (_ , {input}) => {
            try{
                const user = await User.findOne({email : input.email});
                if(user){
                    throw new Error('Email already in use')
                }
                const hashPassword  = await bcrypt.hash(input.password , 12);
                const newUser = new User({...input , password : hashPassword});
                const result = await newUser.save()
                return result;
            }
            catch(error){
                console.log(error);
                throw error;
            }
        } , 
        login : async(_,{input}) => {
            try{
                const user = await User.findOne({email : input.email});
                if(!user){
                    throw new Error('User not found');
                }
                const isPasswordValid = await bcrypt.compare(input.password , user.password);
                if(!isPasswordValid){
                    throw new Error('Incorrect Password');
                }
                const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
                const token = jwt.sign({email : user.email} , secret , {expiresIn : '1d'})
                return {token};
            } catch(error){
                console.log(error);
                throw error;
            }
        }
    } ,
     
    User : {
        task : ({ id }) => tasks.filter(task => task.id === id)
    }
}