const User = require("../../models/User");
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            //See if a current user exists with the same email
            const oldUser = await User.findOne({ email })

            if (oldUser) {
                throw new ApolloError('A user is already registered with the email ' + email, "USER_ALREADY_EXISTS")
            }
            //encrypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            //Build out mongoose model (User)
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword

            });
            //jwt
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );
            newUser.token = token;

            //save user in mongodb
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            }
        },

        async loginUser(_, { loginInput: { email, password } }) {
            //see if a user exists 
            const user = await User.findOne({ email })
            //Check if the entered password = encrypted password
            if (user && (await bcrypt.compare(password, user.password))) {
                //Create a NEW token
                const token = jwt.sign(
                    { user_id: newUser._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2H"
                    }
                )

                //Attach Token to user model we found above
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError('Incorrect password', "INCORRECT_PASSWORD")
            }


        },

        Query: {
            user: (_, { ID }) => User.findById(ID)
        }
    }
}