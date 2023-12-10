/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pYSQ22azu51
 */
import { Input } from "~/app/components/ui/input";
import { Button } from "~/app/components/ui/button";
import { CardHeader, CardContent, Card } from "~/app/components/ui/card";
import Link from "next/link";

import { getLinks, addLink } from "../server/queries";

const link = await getLinks();

// await addLink(
//   "https://www.cnn.com/2023/12/08/us/tyranny-of-the-minority-american-democracy-cec/index.html",
// );

const cat1 = link!.filter((item) => item.categoryId === 1);
const cat2 = link!.filter((item) => item.categoryId === 2);
const cat3 = link!.filter((item) => item.categoryId === 3);

export default function Component() {
  return (
    <>
      <div className="mx-auto my-6 flex w-full max-w-sm items-center space-x-2 rounded-md bg-secondary p-8 sm:max-w-md md:max-w-lg lg:max-w-xl  xl:max-w-2xl">
        <Input
          className="w-full bg-white"
          placeholder="Add new link"
          type="text"
        />
        <Button type="submit">Add Link</Button>
      </div>
      <div>
        <section className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card className="space-y-4 p-4">
              <CardHeader>
                <h2 className="text-xl font-bold">Category 1</h2>
              </CardHeader>
              <CardContent className="flex flex-col">
                {cat1.map((item) => (
                  <Link
                    key={item.id}
                    className="text-indigo-500 hover:text-indigo-600"
                    href={item.url}
                  >
                    {item.url}
                  </Link>
                ))}
              </CardContent>
            </Card>
            <Card className="space-y-4 p-4">
              <CardHeader>
                <h2 className="text-xl font-bold">Category 2</h2>
              </CardHeader>
              <CardContent className="flex flex-col">
                {cat2.map((item) => (
                  <Link
                    key={item.id}
                    className="text-indigo-500 hover:text-indigo-600"
                    href={item.url}
                  >
                    {item.url}
                  </Link>
                ))}
              </CardContent>
            </Card>
            <Card className="space-y-4 p-4">
              <CardHeader>
                <h2 className="text-xl font-bold">Category 3</h2>
              </CardHeader>
              <CardContent className="flex flex-col">
                {cat3.map((item) => (
                  <Link
                    key={item.id}
                    className="text-indigo-500 hover:text-indigo-600"
                    href={item.url}
                  >
                    {item.url}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
