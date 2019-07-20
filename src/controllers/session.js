const {User} = require('../models')
const passport = require('passport');
require('../services/passport')

exports.login = async (req, res, next) => {
    try {
        passport.authenticate('local', {session: false}, (err, user, info) => {

            if(err)
                return res.status(500).json({message: 'An error has occurred on authentication', user: null, err})

            if(!user)
                return res.status(401).json({message: 'User not found', user: null})
    
            req.login(user, {session: false}, (err) => {
                if (err) 
                    return res.status(500).json({message: 'An error has occurred on login', err})
    
                const token = user.generateToken()
                return res.json({user, token})
            })
        })
        (req, res, next)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors)
    }
}