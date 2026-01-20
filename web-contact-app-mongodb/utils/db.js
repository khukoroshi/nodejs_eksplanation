import mongoose from "mongoose";
mongoose
  .connect("mongodb://127.0.0.1:27017/testing")
  .then(() => console.log("Terhubung ke MongoDB!"))
  .catch((err) => console.error("Gagal koneksi:", err));

// const contact1 = new Contact({
//   nama: "hafidz",
//   nohp: "08123456789",
//   email: "haikalfiransyah@gmail.com",
// });

// contact1.save().then((contact) => console.log(contact));
