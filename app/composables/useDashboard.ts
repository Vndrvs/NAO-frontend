export type SidebarNavigationMain = {
    name: string;
    to: string;
    icon: string;
};

export type SidebarNavigationSub = {
    name: string;
    to: string;
    children?: Navigation[];
}

export function getSidebarNavigation(): SidebarNavigation[] {
    return [
        { 
            name: "Strength Measurement",
            to: "#",
            icon: "i-lucide:biceps-flexed",
            children: [
                {name: "EHS Measurement", to: "/pure-ehs"},
                {name: "Centroids", to: "/centroids"}
            ],
        },
        { name: "Smart Bucketing", to: "/buckets", icon:"i-dashicons:editor-quote"},
        { name: "MCCFR Tree Preview", to: "/tree", icon:"i-dashicons:email-alt" },
        { name: "Training Analysis", to: "/tree", icon:"i-dashicons:email-alt" },
        { name: "Competitive Data", to: "/tree", icon:"i-dashicons:email-alt" },
    ];
}