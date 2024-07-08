const { sequelize, DataTypes } = require("../../config/database.js");

const PostModel = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The post name field is required.",
        },
      },
    },
  },
  { timestamps: true, schema: "moh" }
);

PostModel.sync({ alter: true });

module.exports = PostModel;
