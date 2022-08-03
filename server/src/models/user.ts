import moongose, { Schema } from "mongoose";
import IUser from "../interfaces/user"

const UserSchema : Schema = new Schema({
  uid: { type: String, unique: true},
  name: { type: String}
});

export default moongose.model<IUser>('User', UserSchema);
