export const normalizePath = (path: string) => {
  if (!path || path === "") return "/";
  if (path === "/index.html") return "/";
  return path.replace(/\/+$/, "");
};

