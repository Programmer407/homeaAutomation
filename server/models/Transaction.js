// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';
import TransactionType from './TransactionType';
import UserWallet from './UserWallet';
import UserAddress from './UserAddress';
import User from './User';
import TransactionImportType from './TransactionImportType';
import AssociatedAddress from './AssociatedAddress';

const Transaction = sequelize.define(
  "transactions",
  {
    trxId: { type: Sequelize.INTEGER, field: "trx_id" },
    destination: { type: Sequelize.STRING(128), field: "destination" },
    note: { type: Sequelize.STRING(128), field: "note" },
    amount: { type: Sequelize.STRING(128), field: "amount" },
    asset: { type: Sequelize.STRING(128), field: "asset" },
    value: { type: Sequelize.STRING(128), field: "value" },
    transactionDate: { type: Sequelize.STRING(128), field: "transaction_date" }
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
Transaction.belongsTo(AssociatedAddress, {onDelete: 'cascade', hooks: true})
UserWallet.hasMany(Transaction, {as: 'Transactions', onDelete: 'cascade', hooks: true})
UserAddress.hasMany(Transaction, {as: 'AddressTransactions', onDelete: 'cascade', hooks: true})

export default Transaction
