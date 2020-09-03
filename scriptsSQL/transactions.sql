CREATE TABLE transactions (
    id              serial primary key,
    store_name      varchar(50),
    customer        integer references customers,
    amount          integer default 0,
    split           integer,
    is_completed    boolean,
    created_date    date
);
