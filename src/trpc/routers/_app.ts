import { createTRPCRouter } from "../init";

import { userQueryRouter } from "./user-query-router";

export const appRouter = createTRPCRouter({
  userQuery: userQueryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
