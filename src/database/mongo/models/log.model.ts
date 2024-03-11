import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    origin: { type: String, require: true },
    message: { type: String },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    createdAt: { type: Date, default: Date.now },
});

export const LogMongooseModel = mongoose.model('Log', logSchema);
