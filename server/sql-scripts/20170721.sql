select * from providers

ALTER TABLE providers ADD client_id varchar(255) default null;
ALTER TABLE providers ADD client_secret varchar(255) default null;
ALTER TABLE providers ADD grant_type varchar(255) default null;
ALTER TABLE providers ADD redirect_url1 varchar(255) default null;
ALTER TABLE providers ADD redirect_url2 varchar(255) default null;

delete from providers;

insert into providers values (1, 'coinbase', 1, 'CoinBase', '45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78', 'bbdb10e9e75699e9b865d553bfc82be6d4c05f64db988026ca82e33e44c780c0', 'authorization_code', '/account/coinbase/callback', null);

ALTER TABLE userwallet ADD wallet_id varchar(255) default null;
