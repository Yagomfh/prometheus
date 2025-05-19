import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { anonymous } from "better-auth/plugins/anonymous";

import { db } from "~/db";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    anonymous({
      emailDomainName: "dandeliontech.io",
    }),
  ],
  trustedOrigins: ["http://localhost:3001", "http://localhost:3000"],
});
