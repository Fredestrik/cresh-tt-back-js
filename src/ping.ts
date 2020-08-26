import {Router} from 'express';

const router = Router()

router.get('/', (req, res) => res.send('PING'))

export default router;