/*
// libs
import Sequelize from "sequelize"
import sequelize from './../utils/sequelize'

const AssociatedAddress = sequelize.define(
  "associatedaddresses",
  {
    address: { type: Sequelize.STRING(128), field: "address" },
    nickName: { type: Sequelize.STRING(128), field: "nick_name" },
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

export default AssociatedAddress
*/
