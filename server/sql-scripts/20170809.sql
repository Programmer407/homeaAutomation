ALTER TABLE userwallet ADD `updated_wallet_at` datetime default null;
update userwallet set updated_wallet_at = '2017-08-09 12:57:10' where updated_wallet_at is null;