const {Router} = require('express')
const router = Router()
const Link = require('../models/Link')

router.get('/:code', async (req, res) => {
    try {

        const link = await Link.findOne({ code: req.params.code })
        
        if(link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('Cсылка не найдена')

    } catch (error) {
        return res.status(500).json({ message : 'что то пошло не так'})
    }
})

module.exports = router