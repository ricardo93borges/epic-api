const {User} = require('../models')

exports.get = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json({ users })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors)
    }
}