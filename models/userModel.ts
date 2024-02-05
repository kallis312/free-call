import db from "@Conf/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface UsertModel extends Model<InferAttributes<UsertModel>, InferCreationAttributes<UsertModel>> {
  id?: number
  name?: string
  phone: string
  email?: string
}

export default db.define<UsertModel>('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    type: DataTypes.STRING
  }
});
