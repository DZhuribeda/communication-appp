import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const requiredEnv = ["JWKS_URI", "REDIS_URL"];
requiredEnv.forEach((envVariable) => {
  const envVariableValue = process.env[envVariable];
  if (!envVariableValue) {
    throw new Error(`${envVariable} required`);
  }
});

export default {
  port: parseInt(process.env.PORT || "", 10),
  grpcPort: parseInt(process.env.GRPC_PORT || "", 10),
  log: {
    level: process.env.LOG_LEVEL,
  },

  redisUrl: process.env.REDIS_URL as string,
  jwksUri: process.env.JWKS_URI as string,
  eventRules: process.env.EVENT_RULES as string,
};