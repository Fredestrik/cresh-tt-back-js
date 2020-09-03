<p style="text-align: center; margin: 40px auto;"><img src="images/logo.png" width="150px" /></p>

# Cresh Backend Engineering Technical Tests - Javascript Flavor

The API aims to reproduce a service for payment transactions.

### API Documentation

Route | Method | Query String | Body | Description
-|-|-|-|-
`/ping` | GET | - | - | See if the service is running properly, including the DB
`/customers` | GET | - | - | List of customers
`/customers` | POST | - | `name` | Create a customer
`/customers/:id/transactions` | GET | - | - | List of transactions for a specific customer
`/transactions` | POST | - | `store_name`<br />`amount`<br />`split`<br />`user_id` | Create a transaction
`/transactions/:id/instalments` | GET | - | - | List of a transaction's instalments
`/transactions/:id/instalments` | PUT | - | - | Trigger the payment of the transaction's next instalment


### Setting up the project

First you need an access to a PostgreSQL database.
with the createdb utility : 
    createdb cresh-tt-back

Once the **cresh-tt-back** database is created, clone this project. you can set up the tables with psql utility and the sql scripts in /scriptsSQL folder :
    git clone https://github.com/Fredestrik/cresh-tt-back-js.git
    cd cresh-tt-back/scriptsSQL
    psql -d cresh-tt-back -f customers.sql
    psql -d cresh-tt-back -f transactions.sql
    psql -d cresh-tt-back -f instalments.sql

Now your database is up and running, install the dependencies. Copy .env.example into .env and set your own user and password.
    npm install
    cp .env.example .env

Launch the project in development mode with 
    npm start


Clone this repository.
