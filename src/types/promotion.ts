export type Promotion={
    id:number,
    name:string|null,
    code:string|null,
    description:string|null,
    discountRate:number|null,
    startDate:Date|null,
    endDate:Date|null,
}
export type PromotionDto={
    name:string|null,
    code:string|null,
    description:string|null,
    discountRate:number|null,
    startDate:Date|null,
    endDate:Date|null,
}