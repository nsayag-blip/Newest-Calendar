# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Hebrew (RTL) dental-clinic scheduling calendar for Maccabident, built as a React 19 + TypeScript + Vite SPA. It is **not** a standalone web app in production: it builds into a single IIFE bundle that is embedded inside a **Salesforce Visualforce page**, and pulls its data from Apex controllers via Visualforce Remoting.

## Commands

```bash
npm run dev      # Vite dev server on http://localhost:3000 (strictPort, polling watch)
npm run build    # tsc -b (typecheck) then vite build → dist/
npm run lint     # eslint .
npm run preview  # serve the production build
```

There is **no test runner** configured. Per global instructions, after editing JS/TS run `npm run lint` to catch errors before stopping.

## Local dev vs. Salesforce

Data access flips on a single hardcoded flag: `IS_LOCAL_DEV` in [src/api/client.ts](src/api/client.ts).

- `IS_LOCAL_DEV = true` → every method returns **mock data** from [src/data/mockSalesforce.ts](src/data/mockSalesforce.ts) (with artificial `delay()`s to simulate latency). This is the default checked-in state and lets the app run with `npm run dev` outside Salesforce.
- `IS_LOCAL_DEV = false` → methods delegate to `CalendarApi` in [src/api/salesforce.ts](src/api/salesforce.ts), which calls Apex via `invokeRemote` ([src/api/remote.ts](src/api/remote.ts)), which wraps `window.Visualforce.remoting.Manager.invokeAction`. The Apex controller is `Calendar_Ctrl`. `window.Visualforce` only exists when the bundle is served from inside a Visualforce page.

When wiring new server data, add the method in three places: the real call (`salesforce.ts`), the mock branch (`client.ts`), and a TanStack Query hook (`useScheduling.ts`).

## Build output is shaped for Visualforce

[vite.config.ts](vite.config.ts) is deliberately non-default so the bundle can be referenced by static Visualforce/static-resource paths:
- `base: "./"` (relative asset URLs)
- single IIFE bundle named `assets/app.bundle.js`, CSS forced to a single `assets/index.css` (`cssCodeSplit: false`)
- Do not "simplify" these output settings — they exist to match the Visualforce page's `<script>`/`<link>` references.

## Architecture: the data → render pipeline

State is split: **Zustand** holds UI/view state ([src/store/appStore.ts](src/store/appStore.ts)); **TanStack Query** holds server data (hooks in [src/hooks/useScheduling.ts](src/hooks/useScheduling.ts)). Raw Salesforce records flow through a deliberate one-way pipeline before they hit the screen:

1. **[useCalendarFetch](src/hooks/useCalendarFetch.ts)** — fetches raw SF records and computes `isFetching`. Does *no* transformation. Shift mode and appointment mode have different "ready" conditions (appointment mode also needs resources to resolve doctor names).
2. **[useGridPipeline](src/hooks/useGridPipeline.ts)** — applies filters ([src/utils/filters.ts](src/utils/filters.ts)) then calls the right adapter for the current `appMode` × `viewType`.
3. **[gridAdapters.ts](src/components/grid/engine/gridAdapters.ts)** — converts SF records (`Shift`, `ServiceAppointment`, `ServiceTerritory`, `ServiceResource`) into engine-neutral `EngineColumn` / `EngineBlock` / `RangeGroup` ([src/types/engine.ts](src/types/engine.ts)). All display formatting (titles, colors, Hebrew status labels) is baked in here via the theme constants, so the engine and components stay data-agnostic. Time is stored as **minutes-from-midnight** (`extractMinutes`).
4. **[gridEngine.ts](src/components/grid/engine/gridEngine.ts)** — `calculatePositions` does pure layout math: groups blocks by column, forms overlap clusters, assigns lanes, and emits CSS percentages (`topPercent`/`heightPercent`/`widthPercent`/`leftPercent`/`zIndex`). This is the one place overlap geometry lives.
5. **Canvas components** ([DayCanvas](src/components/grid/components/DayCanvas.tsx), [RangeCanvas](src/components/grid/components/RangeCanvas.tsx), [HorizontalCanvas](src/components/grid/components/HorizontalCanvas.tsx)) render the positioned blocks. [CalendarApp.tsx](src/CalendarApp.tsx) picks the canvas by `viewType`.

### Two cross-cutting axes drive everything

- **`appMode`**: `"shift"` (columns = rooms) vs `"appointment"` (columns = room+doctor combos). Each has its own adapter.
- **`viewType`**: `"day"` (single day, vertical), `"range"` (30-day grouped), `"horizontal"`. Range mode fans `selectedDate` into 30 days.

Note the coupling in the store: activating any filter auto-switches `viewType` to `range` (see `resolveViewType` in [appStore.ts](src/store/appStore.ts)), and clearing filters returns to `day`. Keep that invariant in mind when touching filters or view switching.

## Conventions

- All user-facing strings are **Hebrew**; the document is RTL (`<html dir="rtl">`). Status→color and status→label maps live in [src/constants/theme.ts](src/constants/theme.ts).
- SF remoting can return DateTimes as either ISO strings or JS `Date`s — always normalize with the `toDate` helper before doing time math.
- Salesforce types are in [src/types/sf.ts](src/types/sf.ts); app/view types in [src/types/calendar.ts](src/types/calendar.ts); engine types in [src/types/engine.ts](src/types/engine.ts).
- Routing is a single branch in [src/App.tsx](src/App.tsx): no `activeClinicId` → `<ClinicSelector>`, otherwise `<CalendarApp>`.

## Known rough edges (don't mistake for intentional)

- [README.md](README.md) currently contains **unresolved git merge conflict markers** (`<<<<<<<` / `=======` / `>>>>>>>`).
- [gridAdapters.ts](src/components/grid/engine/gridAdapters.ts) has debug `console.log`s and a `buildShiftDisplay` title that appends `shift.Id` "for testing" — comments mark these for removal.
- [remote.ts](src/api/remote.ts) keeps a large commented-out "error handling version" with Hebrew user-facing error messages; the active version does minimal error mapping.
