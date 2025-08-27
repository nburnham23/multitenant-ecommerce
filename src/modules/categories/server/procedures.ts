import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async({ ctx }) => {
          const data = await ctx.db.find({
            collection: "categories",
            depth: 1, // Populate subcategories, subcategories.[0] will be of type "Category"
            pagination: false,
            where: {
              parent: {
                exists: false,
              },
            },
            sort: "name"
          });
          const formattedData = data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                // because of "depth:1", confident that "doc" will be of type "Category"
                ...(doc as Category),
                subcategories:undefined,
            }))
          }));
        return formattedData;
    }),
});