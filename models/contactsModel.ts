import db from "@Conf/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface ContactModel extends Model<InferAttributes<ContactModel>, InferCreationAttributes<ContactModel>> {
  id?: number
  userId: number
  type: 'personal' | 'company'
  name: string
  phone?: string
  email?: string | null
}

export default db.define<ContactModel>('Contact', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('personal', 'company'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  }
});
