import { Ingredient } from './ingredient.model';
export class Plate {
  'id': number;
  'name': string;
  'image': string;
  'imageType': string;
  'ingredients': Array<Ingredient>;
  'vegan': boolean;
  'readyInMinutes': number;
  'healthScore': number;
  'pricePerServing': number;
}
