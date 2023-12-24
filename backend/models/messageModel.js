import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    update_time: { type: String }, // Assuming 'update_time' is a String
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    replied: { type: Boolean, default: false }, // Indicates whether the message has been replied to
    replyContent: { type: String }, // Stores the content of the reply message
    replyEmail: { type: String }, // Stores the email of the sender of the reply
    replySentAt: { type: Date }, // Stores the timestamp when the reply was sent
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
