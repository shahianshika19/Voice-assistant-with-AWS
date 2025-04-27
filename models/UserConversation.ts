import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
    text: string;
    sentiment: string;
    score: number;
    timestamp: Date;
}

export interface IUserConversation extends Document {
    userId: string; // Unique identifier for the user
    messages: IMessage[];
}

const MessageSchema = new Schema<IMessage>({
    text: { type: String, required: true },
    sentiment: { type: String, required: true },
    score: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const UserConversationSchema = new Schema<IUserConversation>({
    userId: { type: String, required: true },
    messages: [MessageSchema],
});

export const UserConversation = mongoose.models.UserConversation || mongoose.model<IUserConversation>("UserConversation", UserConversationSchema);
