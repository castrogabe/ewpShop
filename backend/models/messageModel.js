import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    update_time: { update_time: String },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
