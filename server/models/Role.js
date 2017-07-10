// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';

const Role = sequelize.define(
  "roles",
  {
    roleName: { type: Sequelize.STRING(128), field: "role_name" }
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
export default Role
