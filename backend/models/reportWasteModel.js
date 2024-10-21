import mongoose from "mongoose";

const reportWasteSchema = mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {},
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "rieviewed", "resolved"],
      default: "pending",
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    rewardsPoint: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ReportWaste", reportWasteSchema);
