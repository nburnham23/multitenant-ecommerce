import { getPayload } from "payload"
import config from "@payload-config"
import { stripe } from "./lib/stripe";

const categories = [
    {
      name: "All",
      slug: "all",
    },
    {
      name: "Produce",
      color: "#FFB347",
      slug: "produce",
      subcategories: [
        { name: "Fruit", slug: "fruit" },
        {
          name: "Vegetables",
          slug: "vegetables",
        },
      ],
    },
    {
      name: "Meat",
      color: "#7EC8E3",
      slug: "meat",
      subcategories: [
        { name: "Chicken", slug: "chicken" },
        { name: "Beef", slug: "beef" },
        { name: "Pork", slug: "pork" },
        { name: "Other", slug: "other" },
      ],
    },
    {
      name: "Other",
      slug: "other",
    },
  ]

  const seed = async () => {
    const payload = await getPayload({ config });

    const adminAccount = await stripe.accounts.create({});

    // create admin tenant
    const adminTenant = await payload.create({
      collection: "tenants",
      data: {
        name: "admin",
        slug: "admin",
        stripeAccountId: adminAccount.id,
      },
    });

    // create admin user
    await payload.create({
      collection: "users",
      data: {
        email: "admin@demo.com",
        password: "demo",
        roles: ["super-admin"],
        username: "admin",
        tenants: [
          {
            tenant: adminTenant.id
          }
        ]
      },
      
    });

    for(const category of categories){
        const parentCategory = await payload.create({
            collection: "categories",
            data: {
                name: category.name,
                slug: category.slug,
                color: category.color,
                parent: null,
            },
        });
        for (const subCategory of category.subcategories || []){
            await payload.create({
                collection: "categories",
                data: {
                    name: subCategory.name,
                    slug: subCategory.slug,
                    parent: parentCategory.id
                },
            });
        }
    }
  }

  try{
    await seed();
    process.exit(0);
  } catch (error){
    console.error("error during seeding: ", error);
    process.exit(1);
  }