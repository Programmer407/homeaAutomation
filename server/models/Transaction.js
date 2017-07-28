// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';
import TransactionType from './TransactionType';
import UserWallet from './UserWallet';
import UserAddress from './UserAddress';
import User from './User';
import TransactionImportType from './TransactionImportType';

const Transaction = sequelize.define(
  "transactions",
  {
    destination: { type: Sequelize.STRING(128), field: "destination" },
    note: { type: Sequelize.STRING(128), field: "note" },
    amount: { type: Sequelize.STRING(128), field: "amount" },
    asset: { type: Sequelize.STRING(128), field: "asset" },
    value: { type: Sequelize.STRING(128), field: "value" }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    // disable the modification of table names
    freezeTableName: true,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  }
)
Transaction.belongsTo(TransactionType);
Transaction.belongsTo(TransactionImportType);
Transaction.belongsTo(UserWallet);
Transaction.belongsTo(UserAddress);
Transaction.belongsTo(User);
UserWallet.hasMany(Transaction, {as: 'Transactions'})
UserAddress.hasMany(Transaction, {as: 'AddressTransactions'})

export default Transaction
