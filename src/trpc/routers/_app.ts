import { createTRPCRouter } from "../init";

import { userQueryRouter } from "./user-query-router";
import { newsletterSubscribersRouter } from "./newsletter-subscriber-router";
import { linkRouter } from "./link-router";

export const appRouter = createTRPCRouter({
  userQuery: userQueryRouter,

  newsletterSubscribers: newsletterSubscribersRouter,

  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
