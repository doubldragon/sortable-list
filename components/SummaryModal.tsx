import { createPortal } from "react-dom";
import type { ListItem, TeamConfig } from "@/types";

const TEAM_META = [
  { key: "black" as const, label: "Black", swatchClass: "bg-gray-900", textClass: "text-white" },
  { key: "blue"  as const, label: "Blue",  swatchClass: "bg-blue-300",  textClass: "text-gray-900" },
  { key: "gray"  as const, label: "Gray",  swatchClass: "bg-gray-400",  textClass: "text-white" },
  { key: "white" as const, label: "White", swatchClass: "bg-gray-200",  textClass: "text-gray-700" },
];

function getTeam(order: number, config: TeamConfig): keyof TeamConfig | null {
  let threshold = 0;
  for (const { key } of TEAM_META) {
    const count = config[key];
    if (count !== null && count > 0) {
      threshold += count;
      if (order < threshold) return key;
    }
  }
  return null;
}

interface Props {
  open: boolean;
  items: ListItem[];
  config: TeamConfig;
  onClose: () => void;
}

export function SummaryModal({ open, items, config, onClose }: Props) {
  if (!open) return null;

  const sorted = [...items].sort((a, b) => a.order - b.order);

  type GroupKey = keyof TeamConfig | "none";
  const groups = new Map<GroupKey, ListItem[]>();
  for (const item of sorted) {
    const key: GroupKey = getTeam(item.order, config) ?? "none";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  const sections = [
    ...TEAM_META
      .filter(({ key }) => groups.has(key))
      .map(({ key, label, swatchClass, textClass }) => ({ key: key as GroupKey, label, swatchClass, textClass, items: groups.get(key)! })),
    ...(groups.has("none")
      ? [{ key: "none" as GroupKey, label: "Not Selected", swatchClass: "bg-red-500", textClass: "text-white", items: groups.get("none")! }]
      : []),
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Summary</h2>
          <div className="text-sm text-gray-500">{items.length} Total</div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" style={{ fontSize: 18 }} />
          </button>
        </div>

        <div className="flex flex-col gap-5 pb-5 px-3">
          {sections.map(({ key, label, swatchClass, textClass, items: sectionItems }) => (
            <div key={key}>
              <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${swatchClass}`}>
                <h3 className={`text-sm font-bold ${textClass}`}>{label}</h3>
                <span className={`text-xs opacity-70 ${textClass}`}>({sectionItems.length})</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-4 pt-2">
                {sectionItems.map((item) => (
                  <span key={item.id} className="text-sm text-gray-700 truncate">
                    {item.item}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {sections.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4 px-5">No items yet.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
