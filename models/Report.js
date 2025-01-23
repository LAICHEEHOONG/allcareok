import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "AD", // 关联广告模型
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // 自动记录创建时间
    },
    reports: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Report", // 关联 `reportSchema`
        },
      ],
  },
  {
    timestamps: true, // 自动生成 `createdAt` 和 `updatedAt` 字段
  }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;