type Role={
    id:number,
    name:string,
    alias:string,
    description:string,
    permissions:string[]
}
type RoleAlias={
    id:string,
    name:string
}
type Scope={
    id:string,
    name:string
}
type Permission={
    id:string,
    name:string,
    scopes:Scope[]
}