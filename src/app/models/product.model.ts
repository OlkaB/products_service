export class Product {
    constructor(
        public name: string,
        public img: string,
        public categories: Array<string>,
        public price: number,
        public description: string
    ) { }
}
