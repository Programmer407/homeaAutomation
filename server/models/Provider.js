// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize';

const Provider = sequelize.define(
  "providers",
  {
    providerName: { type: Sequelize.STRING(128), field: "provider_name" },
    displayName: { type: Sequelize.STRING(128), field: "display_name" },
    clientId: { type: Sequelize.STRING(128), field: "client_id" },
    clientSecret: { type: Sequelize.STRING(128), field: "client_secret" },
    grantType: { type: Sequelize.STRING(128), field: "grant_type" },
    redirectUrl1: { type: Sequelize.STRING(128), field: "redirect_url1" },
    redirectUrl2: { type: Sequelize.STRING(128), field: "redirect_url2" },
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
