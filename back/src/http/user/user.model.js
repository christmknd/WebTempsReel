import { DataTypes } from 'sequelize';

import {database} from "../../database.js";

const User = database.define('user', {
  username: DataTypes.STRING,
});

export default User;