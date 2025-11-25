import mongoose from 'mongoose';
import initData from './data.js';
import Listing from '../models/Listing.js';
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
      console.log(err);
});
async function main(){
   await mongoose.connect(MONGO_URL);
}
const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner: "64a7f4c2f2a30b6f4c8e4d2b"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
 initDB();
// // import mongoose from 'mongoose';
// // import initData from './data.js';
// // import Listing from './models/Listing.js';

// // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// // // Main function to connect DB and initialize data
// // const start = async () => {
// //   try {
// //     await mongoose.connect(MONGO_URL);
// //     console.log("Connected to DB");

// //     // Delete old data and insert new data
// //     await Listing.deleteMany({});
// //     await Listing.insertMany(initData.data);
// //     console.log("Data was initialized");

// //     // Close the connection (optional)
// //     mongoose.connection.close();
// //   } catch (err) {
// //     console.log("Error:", err);
// //   }
// // };

// // start();
// import mongoose from 'mongoose';
// import initData from '../data.js'; // make sure path is correct
// import Listing from '../models/Listing.js';

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// const initDB = async () => {
//   try {
//     // 1. Connect to DB
//     await mongoose.connect(MONGO_URL);
//     console.log("Connected to DB");

//     // 2. Clear existing data
//     await Listing.deleteMany({});
//     console.log("Old data cleared");

//     // 3. Insert new data
//     if (!initData.data || initData.data.length === 0) {
//       console.log("No data found to insert!");
//     } else {
//       await Listing.insertMany(initData.data);
//       console.log("Data was initialized successfully");
//     }

//     // 4. Close connection
//     await mongoose.connection.close();
//     console.log("DB connection closed");
//   } catch (err) {
//     console.log("Error:", err);
//   }
// };

// // Run the function
// initDB();
