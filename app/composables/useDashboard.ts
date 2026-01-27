export type SidebarNavigation = {
    name: string;
    to: string;
    icon?: string;
    children?: SidebarNavigation[]
}

export function getSidebarNavigation(): SidebarNavigation[] {
    return [
        { name: "Game", to: "/", icon:"lucide:play"},
        { 
            name: "Strength Measurement",
            to: "#",
            icon: "i-lucide:biceps-flexed",
            children: [
                {name: "Preflop", to: "/dashboard/preflop"},
                {name: "Centroids", to: "/dashboard/centroids"}
            ],
        },
    ];
}