import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Pleaes provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Pleaes provide a password"],
  },
  // xac minh
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  //   quen ma thong bao
  forgotPasswordToken: String,
  // quên mật khẩu mã thông báo hết hạn
  forgotPasswordTokenExpiry: Date,
  //xác minh mã thông báo
  verifyToken: String,
  //xac minh thong bao het han
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
