import {Router} from 'express'
import pool from './db';

const router = Router()

router.get('/', async (req, res) => {
    const {rows} = await pool.query(
        ` SELECT current_database();`)
    res.send('PING database : ' + rows[0].current_database)
})

export default router;