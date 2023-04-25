const express = require('express')
const router = express.Router()


router.get("/landingPage", (req, res) => {
        res.render('landingPage')
})

module.exports = router;