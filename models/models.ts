import mongoose, { Schema, Document } from "mongoose";

// UserConversations Schema
const UserConversationSchema = new Schema({
    userId: { type: String, required: true },
    messages: [
        {
            text: { type: String, required: true },
            sentiment: { type: String, required: true },
            score: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

export const UserConversation = mongoose.model("UserConversation", UserConversationSchema);

// ProductFeedback Schema
const ProductFeedbackSchema = new Schema({
    productName: { type: String, required: true },
    userId: { type: String, required: true },
    feedback: {
        text: { type: String, required: true },
        sentiment: { type: String, required: true },
        score: { type: Number, required: true },
    },
    timestamp: { type: Date, default: Date.now },
});

export const ProductFeedback = mongoose.model("ProductFeedback", ProductFeedbackSchema);
