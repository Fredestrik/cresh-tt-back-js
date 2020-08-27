import {Router} from 'express'
import pool from './db';

const router = Router()

router.get('/', async (req, res) => {
    const {rows} = await pool.query(`SELECT 1 AS result FROM pg_database
        WHERE datname='cresh-tt-back'`)
    res.send(`PING ${rows.length}`)
})

export default router;