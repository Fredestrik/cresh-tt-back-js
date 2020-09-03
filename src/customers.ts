import {Router} from 'express'
import pool from './db';

const router = Router()

router.get('/', async (req, res) => {
    const {rows} = await pool.query(
        ` SELECT * from customers;`)
    res.send(rows)
})

router.post('/', async (req, res) => {
    const {name} = req.body;
    if(name) {
        const {rows} = await pool.query(
            ` INSERT INTO 
            customers (name, created_date) 
            VALUES ('${name}', CURRENT_DATE);`
            )
        res.send(rows)
    }
    else{
        res.status(400).send("name of the customer is expected")
    }
})

export default router;