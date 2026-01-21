export type Navigation = {
    name: string;
    to: string;
    icon: string;
};

export function getNavigation(): Navigation[] {
    return [
        { name: "Home", to: "/", icon:"i-dashicons:admin-home"},
        { name: "Dashboard", to: "/dashboard", icon:"i-dashicons:dashboard"},
        { name: "About", to: "/about", icon:"i-dashicons:editor-quote"},
        { name: "Contact", to: "/contact", icon:"i-dashicons:email-alt" },
    ];
}