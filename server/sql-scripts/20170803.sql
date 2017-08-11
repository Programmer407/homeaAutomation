ALTER TABLE transactions MODIFY COLUMN trx_id varchar(255) default null;

insert  into `transactionimporttype`(`id`,`import_type_name`) values (1,'Wallet import'),(2,'Address import'),(3,'CSV import'),(4,'Manual import');
insert  into `transactiontype`(`id`,`type_name`) values (1,'Income'),(2,'Sale'),(3,'Purchase'),(4,'Transfer');