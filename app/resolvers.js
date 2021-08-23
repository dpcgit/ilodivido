const User = require('./models')

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
        user (parent, args, context, info) {
            return User.findOne({ _id: args.id })
                .then (user => {
                    return { ...user._doc }
                })
                .catch (err => {
                    console.error(err)
                })
        }
    },
    Mutation: {
        addUser (parent, args, context, info) {
            const { username, email, password } = args
            const userObj = new User({
                username,
                email,
                password
            })
            return userObj.save()
                .then (result => {
                    return { ...result._doc }
                })
                .catch (err => {
                    console.error(err)
                })
        }
    }
}

module.exports = resolvers;