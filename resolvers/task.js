const { tasks, users } = require('../constants')
const uuid = require('uuid');
const Task = require('../database/models/task');
const User = require('../database/models/user');
const { isAuthenticated } = require('./middleware');
const { combineResolvers } = require('graphql-resolvers');

module.exports = {
    Query : {
         
        tasks : () => {return tasks } , 
        task : (_ , {id} ) => {
          
            return tasks.find(task => task.id === id)
        },
        
    } ,
    Mutation : {
        createTask : combineResolvers(isAuthenticated , async (_ , { input } , { email }) => {
            try{
                const user = await User.findOne({email});
                const task = new Task({...input , user: user.id }) ;
                const result = await task.save();
                user.tasks.push(result.id);
                await user.save();
                return result
            }
            catch(error){
                console.log(error);
                throw error;
                
            }
        })
    } ,
    Task : {
        user : ({ userId }) => {
            return users.find(user => user.id === userId) 
        }
    }  
    
}