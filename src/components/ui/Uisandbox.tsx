// src/components/ui/UISandbox.tsx
// ─────────────────────────────────────────────────────────
// DROP THIS IN YOUR APP TEMPORARILY:
//   In App.tsx, replace <CalendarApp /> with <UISandbox />
// When done testing, remove the route and delete this file.
// ─────────────────────────────────────────────────────────
import { useState } from "react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ModeToggle } from "./ModeToggle";

// ── Tiny section wrapper ──────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4 pb-2 border-b border-[var(--color-border)]">
                {title}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
                {children}
            </div>
        </div>
    );
}

// ── Icons (inline so no import needed) ───────────────────
const PlusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);
const RefreshIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);
const FilterIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

// ── Sandbox ───────────────────────────────────────────────
export default function UISandbox() {
    // Stateful examples so interactions actually work
    const [appMode, setAppMode] = useState<"shift" | "appointment">("shift");
    const [viewType, setViewType] = useState<"day" | "horizontal">("day");
    const [pills, setPills] = useState({
        staff: ["dr_cohen", "dr_levi"],
        treatment: ["wt_regular"],
        status: [] as string[],
    });

    const removeStaff = (id: string) => setPills((p) => ({ ...p, staff: p.staff.filter((x) => x !== id) }));
    const removeTreatment = (id: string) => setPills((p) => ({ ...p, treatment: p.treatment.filter((x) => x !== id) }));

    return (
        <div
            className="min-h-screen bg-[var(--color-page-bg)] p-10 font-[var(--font-sans)]"
          
        >
            <div className="max-w-3xl mx-auto">
                <h1 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                    🧪 UI Sandbox
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mb-10">
                    Visual test for all <code>components/ui/</code> primitives.
                    Every variant, every state.
                </p>

                {/* ── BUTTON — variants ── */}
                <Section title="Button — variants">
                    <Button variant="primary" icon={<PlusIcon />}>יצירת משמרת</Button>
                    <Button variant="secondary"                      >ביטול</Button>
                    <Button variant="ghost"                          >נקה הכל</Button>
                    <Button variant="destructive"                    >מחק</Button>
                </Section>

                {/* ── BUTTON — sizes ── */}
                <Section title="Button — sizes">
                    <Button variant="primary" size="sm" icon={<PlusIcon />}>קטן</Button>
                    <Button variant="primary" size="md" icon={<PlusIcon />}>בינוני</Button>
                    <Button variant="primary" size="lg" icon={<PlusIcon />}>גדול</Button>
                </Section>

                {/* ── BUTTON — icon only ── */}
                <Section title="Button — icon only">
                    <Button variant="ghost" iconOnly icon={<RefreshIcon />} title="רענן" />
                    <Button variant="secondary" iconOnly icon={<FilterIcon />} title="סינון" />
                    <Button variant="primary" iconOnly icon={<PlusIcon />} title="הוסף" />
                </Section>

                {/* ── BUTTON — disabled + loading ── */}
                <Section title="Button — disabled + loading">
                    <Button variant="primary" disabled>מושבת</Button>
                    <Button variant="primary" loading >טוען...</Button>
                    <Button variant="secondary" disabled>מושבת</Button>
                </Section>

                {/* ── MODE TOGGLE — calendar type ── */}
                <Section title="ModeToggle — calendar type (stateful)">
                    <ModeToggle
                        options={[
                            { value: "shift", label: "יומן משמרות" },
                            { value: "appointment", label: "יומן תורים" },
                        ]}
                        value={appMode}
                        onChange={setAppMode}
                    />
                    <span className="text-xs text-[var(--color-text-muted)]">
                        active: <strong>{appMode}</strong>
                    </span>
                </Section>

                {/* ── MODE TOGGLE — view type ── */}
                <Section title="ModeToggle — view type (stateful)">
                    <ModeToggle
                        options={[
                            { value: "day", label: "יום" },
                            { value: "horizontal", label: "אופקי" },
                        ]}
                        value={viewType}
                        onChange={setViewType}
                    />
                    <span className="text-xs text-[var(--color-text-muted)]">
                        active: <strong>{viewType}</strong>
                    </span>
                </Section>

                {/* ── BADGE — pill colors ── */}
                <Section title="Badge — pill colors (read-only)">
                    <Badge color="brand">     כללי    </Badge>
                    <Badge color="staff">     צוות    </Badge>
                    <Badge color="treatment"> טיפול   </Badge>
                    <Badge color="status">    סטטוס   </Badge>
                    <Badge color="success">   פעיל    </Badge>
                    <Badge color="warning">   ממתין   </Badge>
                    <Badge color="danger">    בוטל    </Badge>
                    <Badge color="neutral">   ניטרלי  </Badge>
                </Section>

                {/* ── BADGE — pills with remove (stateful) ── */}
                <Section title="Badge — filter pills with remove (stateful)">
                    {pills.staff.map((id) => (
                        <Badge key={id} color="staff" onRemove={() => removeStaff(id)}>
                            ד"ר {id === "dr_cohen" ? "כהן" : "לוי"}
                        </Badge>
                    ))}
                    {pills.treatment.map((id) => (
                        <Badge key={id} color="treatment" onRemove={() => removeTreatment(id)}>
                            בדיקה שגרתית
                        </Badge>
                    ))}
                    {pills.staff.length === 0 && pills.treatment.length === 0 && (
                        <span className="text-xs text-[var(--color-text-muted)] italic">
                            כל הפילטרים הוסרו — רענן כדי לאפס
                        </span>
                    )}
                </Section>

                {/* ── BADGE — count bubbles ── */}
                <Section title="Badge — count bubbles (standby indicator)">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-text-secondary)]">חדר 3</span>
                        <Badge color="status" variant="count">3</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-text-secondary)]">חדר 7</span>
                        <Badge color="brand" variant="count">12</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-text-secondary)]">חדר 1</span>
                        <Badge color="danger" variant="count">1</Badge>
                    </div>
                </Section>

                {/* ── COMBINED — how they look together ── */}
                <Section title="Combined — header pill row (as it will appear in FilterTray)">
                    <div className="flex flex-wrap gap-2 p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] w-full">
                        <Badge color="staff" onRemove={() => { }}>ד"ר כהן</Badge>
                        <Badge color="staff" onRemove={() => { }}>ד"ר לוי</Badge>
                        <Badge color="treatment" onRemove={() => { }}>בדיקה שגרתית</Badge>
                        <Badge color="status" onRemove={() => { }}>פעילה</Badge>
                        <Button variant="ghost" size="sm">נקה הכל</Button>
                    </div>
                </Section>

            </div>
        </div>
    );
}