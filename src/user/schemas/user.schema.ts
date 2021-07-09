import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';


export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: [true, 'FIRST_NAME_IS_BLANK'],
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: [true, 'LAST_NAME_IS_BLANK'],
    },
    username: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: [true, 'USERNAME_IS_BLANK'],
    },
    email: {
        type: String,
        lowercase: true,
        validate: validator.default.isEmail,
        maxlength: 255,
        minlength: 6,
        required: [true, 'EMAIL_IS_BLANK'],
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: [true, 'PASSWORD_IS_BLANK'],
    },
    bankAccountNumber: {
        type: String,
        maxlength: 32,
    },
    bankAccountOwnerName: {
        type: String,
        minlength: 6,
        maxlength: 255,
    },
    roles: {
        type: [String],
        default: ['user'],
    },
    verification: {
        type: String,
        validate: validator.default.isUUID,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationExpires: {
        type: Date,
        default: Date.now,
    },
    loginAttempts: {
        type: Number,
        default: 0,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
    },
}, {
    versionKey: false,
    timestamps: true,
});

exports.User = mongoose.model('User', UserSchema);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      // tslint:disable-next-line:no-string-literal
      const hashed = await bcrypt.hash(this['password'], 10);
      // tslint:disable-next-line:no-string-literal
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
});