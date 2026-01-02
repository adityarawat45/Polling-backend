import mongoose from "mongoose";
import User from "./user";

const OptionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    },
  }
);

const PollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },

    options: {
      type: [OptionSchema],
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    expiresAt: {
      type: Date,
      required: true
    },

    createdBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Poll", PollSchema);
