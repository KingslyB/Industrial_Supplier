import {Schema} from "mongoose";
import mongoose from "mongoose";
const ContactSchema = new Schema({
    DisplayName: String,
    ContactNumber: String,
    EmailAddress: String,
    Password: String,
    },
    {
    collection: "contacts"
    }

);
const Model = mongoose.model("contacts", ContactSchema);

export default Model;