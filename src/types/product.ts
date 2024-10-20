import { Image } from "./image"
import { Promotion } from "./promotion"

export type Variation = {
    id: number,
    name: string,
    description: string
}
export type VariationDto = {
    name: string,
    description: string
}
export type VariationOption = {
    id: number ,
    name: string ,
    description: string ,
    variation: Variation | null
}
export type VariationOptionDto = {
    name: string | null,
    description: string | null,
    idVariation: number | null
}
export type ProductCategory = {
    id: number;
    name: string;
    href: string;
    description: string | null;
    parentCategory: ProductCategory | null;
    children: ProductCategory[];
}
type Product = {
    id?: number,
    name: string,
    description: string,
    images: Image[],
    productCategory: ProductCategory,
    variation: Variation
}
export type ProductDto = {
    id?: number | null,
    images: File[],
    name: string | null,
    brand: string | null,
    variation: number | null,
    productCategory: number | null,
    description: string | null,
    productItems: ProductItemDto[] | []
}
export type ProductItemDto = {
    images: File[] | [],
    price: number | null,
    sku: string | null,
    qtyInStock: number | null,
    promotions: number[] | [],
    variationOptions: number[] | []
}
export type ProductEdit = {
    id?: number | null,
    images: string[],
    name: string | null,
    brand: string | null,
    variation: number | null,
    productCategory: number | null,
    description: string | null,
    productItems: ProductItemEdit[] | []
}
export type ProductItemEdit = {
    images: string[] | [],
    price: number | null,
    sku: string | null,
    qtyInStock: number | null,
    promotions: number[] | [],
    variationOptions: number[] | []
}
export type ProductItem = {
    id?: number,
    price: number,
    qtyInStock: number,
    sku: string,
    variationOptions: VariationOption[],
    promotions: Promotion[],
    images: Image[],
    product: Product
}

export type ProductManage = {
    id: number,
    name: string,
    images: string[],
    brand: string,
    qtyInStock: string,
    nameProductCategory: string,
}
export type ProductItemManage = {
    id: number,
    name: string,
    images: Image[],
    brand: string,
    productCategory: string,
    optionVariation: string,
    price: number,
    qtyInStock: number,
    sku: string,
    promotions: string
}