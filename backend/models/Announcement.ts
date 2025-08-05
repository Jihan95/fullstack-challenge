import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  teacherName: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Announcement', AnnouncementSchema);