import mongoose  from 'mongoose';

const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true, unique: true },
    downloadCount: { type: Number, default: 0 },
});

const downloadStatsSchema = new mongoose.Schema({
    totalDownloadCount: { type: Number, default: 0 }, 
    files: [fileSchema],
});

const DownloadStats = mongoose.model('DownloadStats', downloadStatsSchema);

export default  DownloadStats;
