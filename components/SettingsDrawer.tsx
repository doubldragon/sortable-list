import { useState, useEffect } from "react";
import type { TeamConfig } from "@/types";

type DraftTeam = { enabled: boolean; count: string };
type Draft = { [K in keyof TeamConfig]: DraftTeam };

const TEAMS: Array<{ key: keyof TeamConfig; label: string; swatchClass: string }> = [
  { key: "black", label: "Black", swatchClass: "bg-gray-900" },
  { key: "blue",  label: "Blue",  swatchClass: "bg-blue-300" },
  { key: "gray",  label: "Gray",  swatchClass: "bg-gray-400" },
  { key: "white", label: "White", swatchClass: "bg-gray-100 border border-gray-300" },
];

function configToDraft(config: TeamConfig): Draft {
  return {
    black: { enabled: config.black !== null, count: String(config.black ?? 13) },
    blue:  { enabled: config.blue  !== null, count: String(config.blue  ?? 13) },
    gray:  { enabled: config.gray  !== null, count: String(config.gray  ?? 13) },
    white: { enabled: config.white !== null, count: String(config.white ?? 13) },
  };
}

interface Props {
  open: boolean;
  config: TeamConfig;
  onSave: (config: TeamConfig) => void;
  onClose: () => void;
}

export function SettingsDrawer({ open, config, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<Draft>(() => configToDraft(config));

  useEffect(() => {
    if (open) setDraft(configToDraft(config));
  }, [open, config]);

  const toggle = (key: keyof TeamConfig, enabled: boolean) =>
    setDraft((prev) => ({ ...prev, [key]: { ...prev[key], enabled } }));

  const setCount = (key: keyof TeamConfig, count: string) =>
    setDraft((prev) => ({ ...prev, [key]: { ...prev[key], count } }));

  const handleSave = () => {
    const parse = (t: DraftTeam) => {
      if (!t.enabled) return null;
      const n = parseInt(t.count);
      return isNaN(n) || n < 1 ? 1 : n;
    };
    onSave({ black: parse(draft.black), blue: parse(draft.blue), gray: parse(draft.gray), white: parse(draft.white) });
    onClose();
  };

  return (
    <div
      className={[
        "fixed bottom-0 left-0 right-0 z-40",
        "transition-transform duration-300 ease-in-out",
        open ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="bg-white border-t border-gray-200 shadow-2xl rounded-t-2xl px-4 pt-4 pb-8">
        <div className="w-full max-w-[600px] mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold text-gray-900">Team Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 18 }} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Select which teams you want to include and how many players per team
          </p>
          <div className="flex flex-col gap-4">
            {TEAMS.map(({ key, label, swatchClass }) => (
              <div key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`team-${key}`}
                  checked={draft[key].enabled}
                  onChange={(e) => toggle(key, e.target.checked)}
                  className="w-4 h-4 shrink-0 accent-blue-600"
                />
                <div className={`w-4 h-4 shrink-0 rounded-sm ${swatchClass}`} />
                <label
                  htmlFor={`team-${key}`}
                  className="text-sm text-gray-700 flex-1 cursor-pointer select-none"
                >
                  {label}
                </label>
                {draft[key].enabled && (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={draft[key].count}
                      onChange={(e) => setCount(key, e.target.value)}
                      min="1"
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-xs text-gray-500">players</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
