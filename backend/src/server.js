import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`UNBAIQ API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
