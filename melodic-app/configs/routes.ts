
export const links = {
  home: { href: "/", label: "Home" },
  shop: { href: "/shop", label: "Shop" },
  contact: { href: "/contact", label: "Contact" },
  profile: { href: "/profile", label: "Profile" },
};

export const apiLinks = {
  register: "/api/authenticate/register",
  login: "/api/authenticate/login",
  logout: "/api/authenticate/logout",
  speakerOData: "/odata/speakers",
  speaker: "/api/speakers"
}

export const apiClientLinks = {
  setToken: "/api/auth/set-token",
  removeToken: "/api/auth/remove-token",
}


