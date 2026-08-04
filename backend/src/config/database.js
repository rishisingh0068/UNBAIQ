import dns from "node:dns";
import mongoose from "mongoose";

export const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;
  const dnsServers = process.env.MONGODB_DNS_SERVERS
    ?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (dnsServers?.length) {
    dns.setServers(dnsServers);
  }

  await mongoose.connect(mongoUri, {
    family: 4,
    serverSelectionTimeoutMS: 10_000,
  });
  console.log("MongoDB connected");
};
