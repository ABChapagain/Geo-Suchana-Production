import { Router } from 'express'
import { getDetails } from '../controllers/municipalityController.js'

const router = Router()

router.route('/').get(getDetails)

export default router
