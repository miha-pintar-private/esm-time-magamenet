# Project Notes for Agents

## Product
- This is a React/Vite time management prototype.
- Main application code is in `src/main.jsx`.
- Main styles are in `src/styles.css`.
- Build output is generated in `dist/`.

## Language
- All user-facing application text must be in English.
- This includes labels, buttons, confirmation dialogs, toast messages, empty states, modal copy, aria labels, and titles.
- The user may write requests in Slovenian, but UI copy in the app should remain English.

## Commands
- Start development server: `npm run dev`
- Production build/check: `npm run build`

## Implementation Notes
- Use existing React component patterns in `src/main.jsx`; the project is currently a single-file app with local state.
- Use `lucide-react` icons for UI actions when an icon is needed.
- Keep edits scoped and avoid unrelated refactors.
- Before deleting a time entry, the app must ask for confirmation with English copy.
- Current delete confirmation text: `Are you sure you want to delete this record?`

## Documentation Maintenance
- The app has a dedicated Documentation tab. Documentation content currently lives in `documentationSections` in `src/main.jsx`.
- Every product change must update the Documentation tab in the same change when the change affects UX, UI, functionality, permissions, validation, data, local persistence, formulas, metrics, empty states, labels, or user workflows.
- Documentation must be organized by sections, for example `Time management`, with individual features documented inside each section.
- Each documented feature should explain how the feature works, the step-by-step user procedure, important specifics or edge cases, and any relevant permissions or validation rules.
- If a feature includes a metric, KPI, count, cost, duration, percentage, or chart, the documentation must state the exact calculation and which data is included or excluded.
- When changing an existing feature, update its existing documentation entry instead of adding duplicate or stale notes.
- Keep Documentation tab copy user-facing and in English, following the project language rule.

## Validation
- Run `npm run build` after code changes when feasible.
- There is no dedicated test script in `package.json` at this time.
