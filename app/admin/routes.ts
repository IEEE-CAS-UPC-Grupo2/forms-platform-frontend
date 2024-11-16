export const ADMIN_ROUTES = {
  LOGIN: "/admin",
  PANEL: {
    EVENTS: "/admin/panel/events",
    WEBSITE: "/admin/panel/website",
  }
}

export const navOptions = [
  { label: "Eventos", path: ADMIN_ROUTES.PANEL.EVENTS },
  { label: "Sitio Web", path: ADMIN_ROUTES.PANEL.WEBSITE },
];