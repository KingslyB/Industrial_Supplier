import {Schema} from "mongoose";
import mongoose from "mongoose";
const ContactSchema = new Schema({
    FullName: String,
    ContactNumber: String,
    EmailAddress: String
    },
    {
    collection: "contacts"
    }

);
const Model = mongoose.model("contacts", ContactSchema);

export default Model;