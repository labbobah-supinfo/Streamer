const mongoose = require('mongoose');

const StreamerSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'email required'],
            unique: true,
        },
        pseudo: {
            type: String,
            required: [true, 'pseudo required! '],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'password required']
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },  {
        timestamp: true,
    }
)

module.exports = mongoose.model('StreamerModel', StreamerSchema)