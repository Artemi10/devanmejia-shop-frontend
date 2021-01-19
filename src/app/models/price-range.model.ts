export class PriceRange{
  public maxValuePrice: number;
  public minValuePrice: number;

  constructor(maxValuePrice: number, minValuePrice: number) {
    this.maxValuePrice = maxValuePrice;
    this.minValuePrice = minValuePrice;
  }
}
