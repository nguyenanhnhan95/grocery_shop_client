export type Role={
    id:number,
    name:string,
    alias:string,
    description:string,
    permissions:string[]
}
export type RoleAlias={
    id:string,
    name:string
}
export type Scope={
    id:string,
    name:string
}
export type Permission={
    id:string,
    name:string,
    scopes:Scope[]
}
export type RoleDto={
    id? : number | null,
    name:string|null,
    alias:string|null,
    description: string|null,
    permissions:string[]|[]
}