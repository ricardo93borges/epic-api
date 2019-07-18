exports.get = async (req, res) => {
    try {
        res.status(200).json({ message: 'User controller' })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors)
    }
}