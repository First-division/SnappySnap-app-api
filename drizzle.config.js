// import { ENV } from "./src/config/env.js";
// import dotenv from "dotenv";
// dotenv.config();

// export default {
//   schema: "./src/db/schema.js",
//   out: "./src/db/migrations",
//   dialect: "postgresql",
//   dbCredentials: { url: ENV.DATABASE_URL },
// };

import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env FIRST

import { ENV } from "./src/config/env.js"; // ✅ Then import ENV

export default {
  schema: "./src/db/schema.js",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL, // ✅ Should now be defined
  },
};

console.log("Loaded DB URL:", ENV.DATABASE_URL);
