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
  items: ListItem[];
  config: TeamConfig;
}

type GroupKey = keyof TeamConfig | "none";

export function SummaryView({ items, config }: Props) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  const groups = new Map<GroupKey, ListItem[]>();
  for (const item of sorted) {
    const key: GroupKey = getTeam(item.order, config) ?? "none";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  const sections = [
    ...TEAM_META
      .filter(({ key }) => groups.has(key))
      .map(({ key, label, swatchClass, textClass }) => ({
        key: key as GroupKey,
        label,
        swatchClass,
        textClass,
        items: groups.get(key)!,
      })),
    ...(groups.has("none")
      ? [{ key: "none" as GroupKey, label: "Not Selected", swatchClass: "bg-red-500", textClass: "text-white", items: groups.get("none")! }]
      : []),
  ];

  if (sections.length === 0) {
    return <p className="text-center text-gray-400 mt-12 text-sm">No items yet. Press + to add one.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {sections.map(({ key, label, swatchClass, textClass, items: sectionItems }) => (
        <div key={key}>
          <div className={`flex items-center px-4 py-2 rounded-lg ${swatchClass}`}>
            <h3 className={`text-sm font-bold flex-1 ${textClass}`}>
              {label}
              <span className={`ml-1.5 text-xs opacity-70 font-normal ${textClass}`}>({sectionItems.length})</span>
            </h3>
          </div>
          <div className="px-4 pt-1">
            {sectionItems.map((item) => (
              <div key={item.id} className="flex gap-3 py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-800 w-2/5 shrink-0 truncate">{item.item}</span>
                <span className="text-sm text-gray-500 flex-1 break-words">{item.notes ?? ""}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
