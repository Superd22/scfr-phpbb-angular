import { IMainNavLink } from './../interfaces/main-nav-link.interface';
export const mainLinks: IMainNavLink[] = [
    { name: "News", id: 0, target: "/", menuType: "full"},
    { name: "Forum", id: 1, target: "https://starcitizen.fr/Forum/", menuType: "none" },
    { name: "Star Citizen", id: 2, target: "star-citizen/", menuType: "full" },
    { name: "Communauté", id: 3, target: "communityhub/", menuType: "full" },
    { name: "Outils", id: 4, target: "star-citizen", menuType: "small" },
    { name: "JULIET", id: 5, target: "https://juliet.starcitizen.fr/", menuType: "none", julietOnly: true },
];