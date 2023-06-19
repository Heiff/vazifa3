const { Router } = require('express')
const router = Router()
const { Admin,LoginEjs,Login,Index,Auth } = require('../controller/controller')

router.get('/admin',Auth,Admin)
router.get('/login',LoginEjs)
router.post('/admin/post',Login)
router.get('/',Index)


module.exports = router