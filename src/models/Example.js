import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const User = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: false,
        },
        avatar: {
            type: String,
            required: true,
            default: `${process.env.BASE_URL}/images/users/avatars/default.png`,
            trim: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        },
    },
    {
        timestamps: true,
    }
)

User.pre('save', function(next) {
    const user = this

    if (user.password.length < 32) {
        bcrypt.hash(user.password, 16, function(error, hash) {
            // eslint-disable-next-line no-unused-expressions
            error && next(error)

            user.password = hash
            next()
        })
    } else {
        next()
    }
})

User.statics.authenticate = function(email, password, callback) {
    // eslint-disable-next-line no-use-before-define
    User.findOne({ email }).exec(function(error, user) {
        if (error) {
            return callback(error)
        }

        if (!user) {
            const err = new Error(`Incorrect email`)
            return callback(err.message)
        }

        bcrypt.compare(password, user.password, function(error, result) {
            if (result === true) {
                return callback(null, user)
            }

            const err = new Error(`Incorrect password`)
            return callback(err.message)
        })
    })
}

export default mongoose.model('User', User)
