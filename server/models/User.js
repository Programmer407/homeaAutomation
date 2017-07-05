// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';
import Role from './Role';
import UserAccountType from './UserAccountType';
import TimeZone from './TimeZone';

// src

const User = sequelize.define(
  "users",
  {
    firstName: { type: Sequelize.STRING(128), field: "first_name" },
    lastName: { type: Sequelize.STRING(128), field: "last_name" },
    email: { type: Sequelize.STRING(128), field: "email" },
    password: { type: Sequelize.STRING(128), field: "password" },
    status: { type: Sequelize.INTEGER, field: "status" }
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
User.belongsTo(Role);
User.belongsTo(UserAccountType);
User.belongsTo(TimeZone);
//User.sync({force: true});
export default User
