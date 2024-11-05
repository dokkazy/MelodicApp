
export const links = {
  home: { href: "/", label: "Home" },
  shop: { href: "/shop", label: "Shop" },
  contact: { href: "/contact", label: "Contact" },
  profile: { href: "/profile", label: "Profile" },
};
export const adminLinks = {
  admin: { href: "/admin", label: "Admin" },
  user: { href: "/admin/user", label: "User" },
  product: { href: "/admin/product", label: "Product" },
  order: { href: "/admin/order", label: "Order" },
  brand: { href: "/admin/brand", label: "Brand" },
}

export const apiLinks = {
  //auth
  register: "/api/authenticate/register",
  login: "/api/authenticate/login",
  logout: "/api/authenticate/logout",
  speakerOData: "/odata/speakers",
  speaker: "/api/speakers",
  brand: "/api/brand"

}
 
export const apiClientLinks = {
  setToken: "/api/auth/set-token",
  removeToken: "/api/auth/remove-token",
  getRole: "/api/auth/get-role",
}


