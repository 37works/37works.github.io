This repository is a GitHub Pages static website for my personal project hub <37Works>.

Context:
- The site is a minimalist, scene-driven archive.
- It includes:
  - /index.html : 37Works hub (philosophy + project links)
  - /37lyrics/index.html : lyric archive (grid, search, modal lyrics viewer)
  - /37cat/index.html : music archive (grid, search)
  - /style.css : shared styles
  - /app.js : shared scripts (search filtering, modal, scroll-based UI behavior)

Core principles:
- Vanilla HTML / CSS / JavaScript only
- No frameworks, no build tools
- Use absolute paths from root (e.g. /style.css, /app.js)
- Keep UI minimal, calm, and “operated” rather than flashy
- Prefer structure clarity over visual decoration
- Changes should feel intentional, not experimental

UX philosophy:
- Text often comes before sound
- Interfaces should reveal information gradually
- Avoid excessive motion; animations should be subtle and meaningful
- Favor sticky / persistent context over page jumps
- Scrolling behavior is part of the experience

Working rules:
- Modify existing files instead of adding new dependencies
- When changing structure, explain the reasoning briefly
- Keep code readable and simple
- Do not over-engineer

Task pattern:
When I ask for changes like:
- “add a feature”
- “change the structure”
- “adjust UX behavior”

Please:
1. Understand the intent behind the request
2. Propose a clean implementation aligned with the principles above
3. Implement the changes directly in code
4. Show diffs and open a PR
