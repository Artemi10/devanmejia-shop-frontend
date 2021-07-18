export class Product{
  public id: number;
  public name: string;
  public price: number;
  public description: string;
  public type: Type;
}

export enum Type{
  VEGETABLES = 'VEGETABLES',
  DAIRY = 'DAIRY',
  FRUITS = 'FRUITS',
  DRINKS = 'DRINKS',
  SWEETS = 'SWEETS'
}
