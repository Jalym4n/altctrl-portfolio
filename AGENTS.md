# Architecture

- Keep procedural WebGL artwork in a lazy-loaded React Three Fiber scene with a static fallback and reduced-motion support, so graphics failures never block the website.
- Use the shared global CSS tokens for the kinetic visual system and local font packages for typography, so all routes share the redesign without external font imports.
- Keep portfolio content driven by the existing product catalogue, so cards and status counts remain consistent with product pages.