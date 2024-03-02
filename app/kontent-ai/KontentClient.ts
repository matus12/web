import { createDeliveryClient } from '@kontent-ai/delivery-sdk';
import { Article } from '@/app/kontent-ai/models/Article';
import { Image } from '@/app/kontent-ai/models/Image';
import { IContentItem } from '@kontent-ai/delivery-sdk/dist/cjs/models';

const deliveryClient = createDeliveryClient({
  environmentId: 'c49210bb-9aa3-0140-8a62-37be2103df65',
});

export const getArticle = async (codename: string): Promise<Article> => {
  const response = await deliveryClient.item<Article>(codename).toPromise();

  return response.data.item;
};

export const getImage = async (codename: string): Promise<Image> => {
  const response = await deliveryClient.item<Image>(codename).toPromise();

  return response.data.item
};

export const getComponent = <T>(
  linkedItems: IContentItem[],
  codename: string
): T | undefined =>
  linkedItems.find(item => item.system.codename === codename) as T | undefined;
