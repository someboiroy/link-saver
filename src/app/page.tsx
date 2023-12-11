/**
 * Made with help from v0 by Vercel.
 * @see https://v0.dev/t/pYSQ22azu51
 */

import { CardHeader, CardContent, Card } from "~/app/components/ui/card";
import NewLinkInput from "~/app/components/newLinkInput";
import Link from "next/link";

import { getCategoriesWithLinks } from "../server/queries";

const categories = await getCategoriesWithLinks();

export default function Component() {
  return (
    <div className="">
      <h1 className="my-6 text-center text-6xl font-bold">NLP Link Saver</h1>
      <div className="m-8 rounded-md bg-slate-400/70 p-4  shadow-md">
        <div>
          <p className="font-light">
            This project uses the{" "}
            <a
              className="text-blue-700 underline"
              href="https://huggingface.co/MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli"
            >
              DeBERTa-v3-base-mnli-fever-anli
            </a>{" "}
            text classification model to intelligently categorization links
            based on the sites content.
          </p>
        </div>
        <div className="mt-2">
          <span className="text-xs font-bold">
            Built with ꨄ using Next.js, Tailwind CSS + ShadCN UI, SQLite and
            Prisma ORM.
          </span>
        </div>
      </div>
      <div className="m-8 rounded-md  bg-primary shadow-lg ">
        <div className="flex justify-center">
          <NewLinkInput />
        </div>

        <div>
          <section className="container mx-auto flex justify-center px-4 py-6 md:px-6 ">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 ">
              {categories?.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <h3 className="text-lg font-bold text-gray-900">
                      {category.name}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid list-inside list-disc flex-col gap-4">
                      {category.links.map((link) => (
                        <li key={link.id} className="">
                          <Link
                            className=" font-medium text-blue-600 underline"
                            href={link.url}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
