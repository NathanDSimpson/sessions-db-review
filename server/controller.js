const messages = []



module.exports = {
  getMessages(req, res) {
    res.status(200).send(messages)
  },
  addMessage(req, res) {
    // messages.unshift(req.body.message)
    if (!req.session.messages) {
      req.session.messages = []
    }
    req.session.messages.unshift(req.body.message)

    res.status(200).send(req.session.messages)
  },
  checkForSession(req, res, next) {
    if (!req.session.messages) {
      req.session.messages = []
    }
    next()
  },
  updateRace(req, res) {
    const {number} = req.body
    const db = req.app.get('db')
    db.updateRace({favoritestudent: number})
    res.send('ok')
  }
}