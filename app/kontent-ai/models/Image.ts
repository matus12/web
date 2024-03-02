import {
  Elements,
  IContentItem
} from '@kontent-ai/delivery-sdk';

export type Image = IContentItem<{
  asset: Elements.AssetsElement,
  width: Elements.NumberElement,
  height: Elements.NumberElement,
  untitled_multiple_choice: Elements.MultipleChoiceElement
}>;
