import { createTRPCRouter } from '../init';

import { authRouter } from '@/modules/auth/server/procedures';
import { CategoriesRouter } from '@/modules/categories/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: CategoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
