import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    consent: Boolean,
    email: String,
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
