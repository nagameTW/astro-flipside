/** Prefix an absolute-path href with the configured base. url("/blog/") */
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
