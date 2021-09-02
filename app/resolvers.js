//https://medium.com/swlh/populate-subdocument-in-graphql-4e7f9ede5a1c

const User = require('./user-model')
const Tool = require('./tool-model')

const resolvers = {
    Query: {
        users (parent, args, context, info) {
            return User.find()
                .then (user => {
                    return user.map (u => ({ ...u._doc }))
                })
                .catch (err => {
                    console.error(err)
                })
        },
        user : async (parent, args, context, info) => {
            console.log('Args in mongoose',args)
            try{
                const found_user = await User.findOne({username: args.username})
                console.log('Found user: ',found_user)
                return found_user;
            }catch(error){
                console.error(error.message);
            }
        }
    },
    Mutation: {
        addUser: async (parent,args,context,info) => {
            try{
                console.log('UserInput: ',args.input);
                const newUser = await User.create(args.input);
                await newUser.save();
                console.log('New User: ',newUser)
                return newUser;
            }catch(error){
                console.log(error.message);
            }
            
        },
        addTool: async (parent,args,context,info) => {
            try{
                console.log('Args pased to mongooose:',args)
                const newTool = await Tool.create(args.input);
                await newTool.save();
                console.log('New Tool: ',newTool)
                const user = await User.findOne({username:args.username});
                user.tools.push(newTool._id);
                await user.save();
                console.log("tool saved into user's account")
                return newTool;
            } catch(error) {
                console.log(error.message)
            }
        }   
    }
}

module.exports = resolvers;