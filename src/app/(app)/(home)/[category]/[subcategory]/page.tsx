interface Props {
    params: Promise<{
        category: string;
        subcategory: string;
    }>
};

const Page = async ({ params }: Props) => {
    const { category, subcategory } = await params;
    return(
        <div>
            Category: {category} <br />
            Subcategory: {subcategory}
        </div>
    );
};

export default Page;

// http://localhost:3000/writing-publishing/fiction
// http://localhost:3000/[category]/[subcategory]