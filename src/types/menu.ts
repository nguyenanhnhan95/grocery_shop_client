type MainMenu={
    title:string;
    isActive:boolean;
    href:string;
    subMenus:MainMenu[];
    resources:string[];
    iconClass:string;
    header:boolean;
    requiredPermissions:string[]
}