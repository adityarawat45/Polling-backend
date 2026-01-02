import mongoose from "mongoose";
const { Schema } = mongoose;

const VoteSchema = new Schema(
  {
    poll: {
      type: Schema.Types.ObjectId,
      ref: "Poll",
      required: true
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    optionId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

VoteSchema.index({ poll: 1, user: 1 }, { unique: true });

export default mongoose.model("Vote", VoteSchema);
