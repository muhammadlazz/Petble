import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", ""],
    default: ""
  },
  interest: {
    type: String,
    default: ""
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.addFriend = async function (friendId) {

  if (this.friends.includes(friendId)) {
    throw new Error("User sudah menjadi teman");
  }
  
  this.friends.push(friendId);
  await this.save(); 
  return this;
};

userSchema.methods.isUserPremium = function () {
  return this.isPremium;
};

userSchema.statics.upgradeToPremium = async function (userId) {
  const user = await this.findById(userId); 
  if (!user) {
    throw new Error("User tidak ditemukan");
  }
  
  user.isPremium = true;
  await user.save();
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
