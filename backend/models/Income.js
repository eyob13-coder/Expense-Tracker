import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    icon: {type: String},
    source: {type: String, required: true},
    amonunt: {type: Number, require: true},
    date: {type: Date, default: Date.now },
}, {Timestamp:true });

export default mongoose.model('Income', IncomeSchema);