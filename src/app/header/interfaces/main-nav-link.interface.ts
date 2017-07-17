import { MainNavLinkMenuType } from "app/header/types/main-nav-link-menu.type";

export interface IMainNavLink {
    /** display name of the link */
    name: string;
    /** unique id for this link */
    id: number;
    /** target url for this link */
    target: string;
    /** menu type for this entry */
    menuType: MainNavLinkMenuType;
}