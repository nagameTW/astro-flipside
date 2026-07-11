export type Project = {
  name: string;
  description: string;
  tech: string[];
  url: string;
};

// Placeholder entry — replace with your own projects. Currently unused by
// any page (the portfolio /projects/ route is retired until there's real
// content to show); kept as a worked data example for the template.
export const PROJECTS: Project[] = [
  {
    name: "This Template",
    description: "The dual-face personal site you're looking at right now.",
    tech: ["Astro", "TypeScript"],
    url: "https://github.com/your-name/astro-flipside",
  },
];
