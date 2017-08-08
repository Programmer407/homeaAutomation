// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';
import User from './User';

const UserAddress = sequelize.define(
  "useraddresses",
  {
    address: { type: Sequelize.STRING(255), field: "address" },
    nickName: { type: Sequelize.STRING(255), field: "nick_name" },
    balance: { type: Sequelize.STRING(128), field: "balance" },
    currency: { type: Sequelize.STRING(128), field: "currency" }
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
UserAddress.belongsTo(User);

export default UserAddress
