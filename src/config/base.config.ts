import "dotenv/config";

type BaseConfigType = {
  MONGO_URI: string;
  PORT: number;
  VOYAGE_API_KEY: string;
};

export const baseConfig: BaseConfigType = {
  MONGO_URI: process.env.MONGO_URI!,
  PORT: Number(process.env.PORT),
  VOYAGE_API_KEY: process.env.VOYAGE_API_KEY!
};
