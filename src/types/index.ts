import { SVGProps } from "react";

declare type IChildren = { children: React.ReactNode };
declare type IClassName = { className?: string };
declare type IClassNameWithChildren = IChildren & IClassName;

export interface IconSvgProps extends SVGProps<SVGSVGElement>, IClassName {}

// export * from "./user";
// export * from "./account";
// export * from "./deposit";
// export * from "./request";
