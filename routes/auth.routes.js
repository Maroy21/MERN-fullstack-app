const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User.js')
const router = Router()
const config = require('config');

router.post(
    '/register',
    [
        check('email','некорректный email').isEmail(),
        check('password','минимальная длинна : 6 символов').isLength({min: 6})
    ],
     async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            res.status(400).json({ message: 'такой пользователь уже существует'})
        }
         
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()
        res.status(201).json({ message : 'пользователь создан'})
    } catch (error) {
        return res.status(500).json({ message : 'что то пошло не так'})
    }
})

router.post(
    '/login',
    [
        check('email', 'Введите корректный Email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'некорректные данные при входе'
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'Пользователь не найден'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль'})
        }
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

    } catch (error) {
        return res.status(500).json({ message : 'что то пошло не так'})
    }
})


module.exports = router