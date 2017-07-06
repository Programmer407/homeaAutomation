// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';
import TransactionType from './TransactionType';

const Transaction = sequelize.define(
  "transactions",
  {
    destination: { type: Sequelize.STRING(128), field: "destination" },
    note: { type: Sequelize.STRING(128), field: "note" },
    amount: { type: Sequelize.STRING(128), field: "amount" },
    asset: { type: Sequelize.STRING(128), field: "asset" },
    value: { type: Sequelize.STRING(128), field: "value" },
    importedFrom: { type: Sequelize.STRING(128), field: "imported_from" },
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

export default Transaction
