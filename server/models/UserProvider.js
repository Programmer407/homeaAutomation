// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';
import User from './User';
import Provider from './Provider';

const UserProvider = sequelize.define(
  "userprovider",
  {
    accountName: { type: Sequelize.STRING(128), field: "account_name" },
    accessToken: { type: Sequelize.STRING(128), field: "access_token" },
    refreshTokan: { type: Sequelize.STRING(128), field: "refresh_token" }
  },
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of table names
    freezeTableName: true,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true
  }
)
UserProvider.belongsTo(User);
UserProvider.belongsTo(Provider);

export default UserProvider
