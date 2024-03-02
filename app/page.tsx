import parse from 'html-react-parser';
import {
  getArticle,
  getComponent,
} from '@/app/kontent-ai/KontentClient';
import { createAsyncRichTextHtmlResolver } from '@kontent-ai/delivery-sdk';
import { asyncNodeParser } from '@kontent-ai/delivery-node-parser';
import { Image } from '@/app/kontent-ai/models/Image';

export default async () => {
  const data = await getArticle('anotherone');
  const richText = data.elements.body;
  const resolvedRichText = await createAsyncRichTextHtmlResolver(asyncNodeParser).resolveRichTextAsync({
    element: richText,
    preserveResolvedObjectTags: false,
    contentItemResolverAsync: async itemCodename => {
      const image = getComponent<Image>(richText.linkedItems, itemCodename);
      if (image === undefined) return ({ contentItemHtml: `<></>` });
      const asset = image.elements.asset.value[0];
      if (asset === undefined) return ({ contentItemHtml: `<></>` });
      const width = image.elements.width.value;
      const height = image.elements.height.value;

      return ({
        contentItemHtml: `<div class="flex"><img loading="lazy" srcset=${asset.url}?w=${width}&h=${height} width=${width}px height=${height}px alt=${asset.description}/></div>`
      });
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-800">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-6xl m-20 text-center">Kitty world</h1>
        <div className="flex flex-col items-center">
          {parse(resolvedRichText.html)}
        </div>
      </div>
    </main>
  );
}
