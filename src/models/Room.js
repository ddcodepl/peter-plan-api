import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const Room = mongoose.Schema(
    {
        ID: {
            trim: true,
            type: String,
            unique: true,
            required: true,
        },
        players: {
            type: Array,
            // required: true,
            // unique: true,
            // trim: true,
        },
        settings: {
            type: Array,
            required: true,
            trim: true,
        },
        tasks: {
            type: Array,
            required: true,
            trim: false,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Room', Room)
