// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';

const Provider = sequelize.define(
  "providers",
  {
    providerName: { type: Sequelize.STRING(128), field: "provider_name" },
    displayName: { type: Sequelize.STRING(128), field: "display_name" },
    status: { type: Sequelize.INTEGER, field: "status" }
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
export default Provider
