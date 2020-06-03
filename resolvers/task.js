const { tasks, users } = require('../constants')
const uuid = require('uuid');

module.exports = {
    Query : {
         
        tasks : () => tasks , 
        task : (_ , args ) => {
          
            return tasks.find(task => task.id === id)
        },
        users : () => users,
        user : (_ , {id}) => users.find(user => user.id === id) 
    } ,
    Mutation : {
        createTask : (_ , { input }) => {
            const task = {...input , id: uuid.v4() }
            tasks.push(task);
            return task;

        }
    } ,
    Task : {
        user : ({ userId }) => {
            return users.find(user => user.id === userId) 
        }
    }  
    
}