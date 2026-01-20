import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  nohp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export { Contact };
