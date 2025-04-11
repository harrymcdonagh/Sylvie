import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

const MessageSchema: Schema<IMessage> = new Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  content: { type: String, required: true },
  sender: { type: String, enum: ["user", "assistant"], required: true },
  timestamp: { type: String, required: true },
  status: { type: String, required: true },
});

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
