
import mongoose from "mongoose";



const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    status: { type: String, default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' }
},{timestamps: true});


export default mongoose.model("Task", taskSchema);

