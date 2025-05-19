import { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "~/trpc/init";

export const userRouter = {
  me: protectedProcedure.query(async ({ ctx }) => ctx.session?.user),
} satisfies TRPCRouterRecord;
