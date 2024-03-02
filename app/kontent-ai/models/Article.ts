import {
  Elements,
  IContentItem
} from '@kontent-ai/delivery-sdk';

export type Article = IContentItem<{
  heading: Elements.TextElement,
  body: Elements.RichTextElement
}>;
