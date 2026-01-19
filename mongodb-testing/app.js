const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "testing";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("waifus");

  // the following code examples can be pasted here...
  // menambahkan data
  // const insertResult = await collection.insertMany([
  //   { nama: "Shirakami Fubuki", from: "Hololive (jp)" },
  //   { nama: "Vestia Zeta", from: "Hololive (id)" },
  // ]);
  // console.log("Inserted documents =>", insertResult);

  // menampilkan semua data di collection
  // const findResult = await collection.find({}).toArray();
  // console.log("Found documents =>", findResult);

  // menampilkan data berdasarkan kriteria di collection
  // const findResult = await collection.find({ nama: "Vestia Zeta" }).toArray();
  // console.log("Found documents =>", findResult);

  // mengupdate data berdasarkan kriteria
  // const updateResult = await collection.updateOne(
  //   { from: "Hololive (jp)" },
  //   { $set: { from: "Hololive (JP)" } },
  // );
  // console.log("Updated documents =>", updateResult);

  // const tambahLanang = await collection.insertMany([
  //   { nama: "Felix", from: "Re: zero", gender: "lanang" },
  //   { nama: "Takanashi Kotori", from: "Working!", gender: "lanang" },
  // ]);
  // console.log("Inserted documents =>", tambahLanang);

  // const liatLanang = await collection.find({}).toArray();
  // console.log(liatLanang);

  // // menghapus data di collection berdasarkan kriteria
  // const deleteResult = await collection.deleteMany({ gender: "lanang" });
  // console.log("Deleted documents =>", deleteResult);

  // const liatMyWaifu = await collection.find({}).toArray();
  // console.log(liatMyWaifu);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
