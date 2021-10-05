//https://medium.com/swlh/populate-subdocument-in-graphql-4e7f9ede5a1c
//const fs = require('fs')
const User = require('./user-model');
const Tool = require('./tool-model');
const got = require('got');
const http = require('http');
//const { GraphQLUpload } = require('graphql-upload');



async function downloadURL(file,username) {
    try{
        //console.log('File name to be:', file)
        const response = await got.get(`http:localhost:8080/presignedURLDown?name=${file}&username=${username}`)
        //console.log('Download URL response: ', response)
        const url = await response.body
        //console.log('Download URL: ', url)
        return(url)
    }
    catch(error){
        console.log(error.message)
    }
}

const resolvers = {
    /*Upload: GraphQLUpload,*/
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
        },
        tools (parent,args,context,info){
            return Tool.find()
            .then (tool => {
                console.log('Type of object found: ', typeof(tool))
                console.log(tool)
                const tools = tool.map (u => ({ ...u._doc }))
                console.log('Type of object returned: ', typeof(tools))
                console.log(tools)
                return tools
            })
            .catch (err => {
                console.error(err)
            })
        },
        tool: async (parents,args,contect,info) => {
            try{
                console.log(args)
                const regexp = new RegExp(args.name,'i');
                //console.log('Regexp: ', regexp)
                //const tools = await Tool.find({name: args.name});                
                const tools = await Tool.find({name: {$regex:regexp}});      
                console.log(tools)          
                return tools;
            }catch(error){
                console.error(error.message);
            }
        },
        tools_by_user: async (parents,args,contect,info) => {
            try{
                console.log('Getting tools by user')
                const user_that_has_tools = await User.find({username: args.user}).populate('tools');      
                console.log('Tools by user: ',user_that_has_tools[0].tools)          
                
                
                const final_urls = await user_that_has_tools[0].tools.map(async tool => 
                    {const urls = await Promise.all(tool.pictures.map(async (picture) => {
                        return  await downloadURL(picture,args.user)                        
                        })

                    )
                    
                    tool.pictures = urls
                    //console.log('New tool:', tool)
                    return tool
                    }
                    ) 
                return final_urls;
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
                /*console.log('File recived by resolver: ', args.tool_picture)
                const {createReadStream, filename, mimetype} = await args.tool_picture;                
                const fileStream = await createReadStream()
                fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`));
                */
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