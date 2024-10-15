const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address.'] // Email regex validation
  },
  password: {
    type: String,
    required: true,
    minlength: [4, 'Password must be at least 4 characters long.'] // Minimum length validation
  }
});

userSchema.pre("save", function(next){
    if(!this.isModified("password"))  return next();
    bcrypt.hash(this.password,10,(err,hash)=>{
        this.password=hash;
        return next();
    })
})

userSchema.methods.checkPassword = function (password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function (err, same) {
        if (err) return reject(err);
        return resolve(same);
      });
    });
  };

module.exports = mongoose.model('user', userSchema);
