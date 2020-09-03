import {Router} from 'express'
import pool from './db';

const router = Router()

router.post('/', async (req, res) => {
    const {store_name, amount, split, user_id} = req.body;
    if(store_name && amount && split && user_id) {
        let {rows} = await pool.query(
            ` INSERT INTO 
            transactions (store_name, customer, amount, split, created_date, is_completed) 
            VALUES ('${store_name}', ${user_id}, ${amount}, ${split}, CURRENT_DATE, false)
            RETURNING id;`
            )
        const {id} = rows[0]
        const instalmentAmount = amount / split;
        const firstAmount = amount - ((split - 1) * instalmentAmount)
        let response = await pool.query(
            `INSERT INTO 
            instalments (transaction, amount, is_paid, created_date, planned_date) 
            VALUES (${id}, ${firstAmount}, true, CURRENT_DATE, CURRENT_DATE);`
            )
        for (let i = 1; i < split; i++) {
            response = await pool.query(
                `INSERT INTO 
                instalments (transaction, amount, is_paid, created_date, planned_date) 
                VALUES (${id}, ${instalmentAmount}, false, CURRENT_DATE, CURRENT_DATE + ${i} * INTERVAL '1 month');`
                )
            }
        res.send(rows[0])
    }
    else{
        res.status(400).send("store_name, amount, split and user_id are expected")
    }
})

router.get('/:id/instalments', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query(
        ` SELECT * FROM instalments WHERE transaction = ${id};`)
    res.send(rows)
})

router.put('/:id/instalments', async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query(
        ` SELECT id, is_paid, planned_date
        FROM instalments 
        WHERE transaction = ${id} AND is_paid = false
        ORDER BY planned_date;`)
    if(rows.length == 0) {
        res.send("Transaction has already been completed!")
    }
    else{
        const instalmentID = rows[0].id
        await pool.query(
            `UPDATE instalments 
            SET is_paid = true
            WHERE id = ${instalmentID}`)
        if(rows.length == 1) {
            await pool.query(
                `UPDATE transactions 
                SET is_completed = true
                WHERE id = ${id}`) 
            res.send("Transaction is completed!")
        }
        else {
            res.send(`there is ${rows.length - 1} instalments left`)
        }
    }
})

export default router;