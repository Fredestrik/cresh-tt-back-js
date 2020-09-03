CREATE TABLE instalments (
    id              serial primary key,
    transaction     integer references transactions,
    amount          integer default 0,
    is_paid         boolean,
    planned_date    date,
    created_date    date
);
