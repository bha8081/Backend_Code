import mongoose, {Schema} from "mongoose";

// Subscription Schema.
const subsciptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // noe who is subscribing
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, // noe to whom is 'subscriber' is subscribing
        ref: "User"
    }
  }, {timestamps: true}
);

export const Subscription = mongoose.model("Subscription", subsciptionSchema);