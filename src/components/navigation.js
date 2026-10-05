const navigationItems = [
  { id: "services", label: "Tjenester", to: "/tjenester", footerOrder: 1 },
  { id: "contact", label: "Bestilling", to: "/kontakt", footerOrder: 3 },
  { id: "projects", label: "Prosjekter", to: "/prosjekter", footerOrder: 2 },
  { id: "about", label: "Om oss", to: "/om-oss", footerOrder: 4 },
];

export const contactNavigationItem = navigationItems.find((item) => item.id === "contact");
export const headerNavigationItems = navigationItems.filter((item) => item.id !== "contact");

export const footerNavigationItems = [...navigationItems].sort(
  (itemA, itemB) => itemA.footerOrder - itemB.footerOrder,
);
