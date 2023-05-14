import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  let user = this as UserDocument;
  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  let user = this as UserDocument;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
