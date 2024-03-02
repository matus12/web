export default async () => {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-800">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col">
          {JSON.stringify(data)}
          <img
            srcSet={data.url}
            width={300}
            height={300}
            alt="obrazok kocicky"/>
        </div>
      </div>
    </main>
  );
}

async function getData(): Promise<Item> {
  const response = await fetch('https://deliver.kontent.ai/c49210bb-9aa3-0140-8a62-37be2103df65/items/anotherone');
  const item = await response.json();

  return item.item.elements.body.images["11f0ba89-95f1-40ac-a75a-ee74a739a6bb"];
}

interface Item
{
  readonly userId: number;
  readonly id: number;
  readonly title: string;
  readonly completed: boolean;
  readonly url: string;
}
