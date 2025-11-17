import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [2, 50] },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 15],
      isStrong(value) {
        if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
          throw new Error(
            "Password must contain at least one uppercase letter and one number."
          );
        }
      },
    },
  },

  // ✅ Moved outside password
  role: {
    type: DataTypes.ENUM("admin", "user", "guest"),
    defaultValue: "user",
    allowNull: false,
  },

  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verification_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default User;
