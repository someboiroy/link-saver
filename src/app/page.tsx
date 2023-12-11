/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pYSQ22azu51
 */

import { CardHeader, CardContent, Card } from "~/app/components/ui/card";
import NewLinkInput from "~/app/components/newLinkInput";
import Link from "next/link";

import { getCategoriesWithLinks } from "../server/queries";

const categories = await getCategoriesWithLinks();

export default function Component() {
  return (
    <div>
      <div>
        <h1 className="my-6 text-center text-6xl font-bold">NLP Link Saver</h1>
      </div>
      <div className="flex justify-center">
        <NewLinkInput />
      </div>
      <div>
        <section className="container mx-auto flex justify-center px-4 py-12 md:px-6 ">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 ">
            {categories?.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    {category.name}
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="">
                    {category.links.map((link) => (
                      <li key={link.id} className="flex">
                        <Link href={link.url}>{link.title}</Link>
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
  );
}
