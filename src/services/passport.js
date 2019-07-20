const passport    = require('passport')
const passportJWT = require("passport-jwt")

const ExtractJWT = passportJWT.ExtractJwt

const LocalStrategy = require('passport-local').Strategy
const JWTStrategy   = passportJWT.Strategy

const {User} = require('../models')

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
    async (email, password, cb) => {
        try {
            const user = await User.findOne({where: {email}})

            if (!user) 
                return cb(null, false, {message: 'Incorrect email or password.'})
            
            if (!(await user.checkPassword(password))) 
                return cb(null, false, {message: 'Incorrect email or password!'})

            return cb(null, user, {message: 'Logged In Successfully'})

        }catch(err) {
            console.log(err)
            return cb(err)
        }
    }
))

passport.use(new JWTStrategy({jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET},
    async (jwtPayload, cb) => {
        try {
            const user = await User.findOne({where:{id:jwtPayload.id}})
            return cb(null, user)
        }catch(err) {
            console.log(err)
            return cb(err)
        }
    }
))