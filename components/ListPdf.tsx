import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { ListItem, TeamConfig } from "@/types";

const TEAM_META = [
  { key: "black" as const, label: "Black", bg: "#111827", text: "#ffffff" },
  { key: "blue"  as const, label: "Blue",  bg: "#93c5fd", text: "#111827" },
  { key: "gray"  as const, label: "Gray",  bg: "#9ca3af", text: "#ffffff" },
  { key: "white" as const, label: "White", bg: "#e5e7eb", text: "#374151" },
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

const s = StyleSheet.create({
  page: { padding: 32, fontFamily: "Helvetica", fontSize: 10, color: "#111827" },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  author: { fontSize: 10, color: "#6b7280", marginBottom: 16 },
  section: { marginBottom: 12 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  headerText: { fontSize: 11, fontFamily: "Helvetica-Bold", flex: 1 },
  headerCount: { fontSize: 9 },
  row: { flexDirection: "row", paddingVertical: 4, paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: "#f3f4f6" },
  bib: { width: 32, fontFamily: "Helvetica-Bold", color: "#2563eb" },
  name: { width: "20%", color: "#1f2937" },
  notes: { flex: 1, color: "#6b7280" },
});

interface Props {
  items: ListItem[];
  config: TeamConfig;
  listName: string;
  authorName: string;
}

export function ListPdf({ items, config, listName, authorName }: Props) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  const groups = new Map<string, ListItem[]>();
  for (const item of sorted) {
    const key = getTeam(item.order, config) ?? "none";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  const sections = [
    ...TEAM_META
      .filter(({ key }) => groups.has(key))
      .map(({ key, label, bg, text }) => ({ key, label, bg, text, items: groups.get(key)! })),
    ...(groups.has("none")
      ? [{ key: "none", label: "Not Selected", bg: "#ef4444", text: "#ffffff", items: groups.get("none")! }]
      : []),
  ];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <Text style={s.title}>{listName || "Untitled List"}</Text>
        <Text style={s.author}>{authorName || "Unknown"}</Text>
        {sections.map(({ key, label, bg, text, items: sectionItems }) => (
          <View key={key} style={s.section}>
            <View style={[s.header, { backgroundColor: bg }]}>
              <Text style={[s.headerText, { color: text }]}>{label}</Text>
              <Text style={[s.headerCount, { color: text }]}>({sectionItems.length})</Text>
            </View>
            {sectionItems.map((item) => (
              <View key={item.id} style={s.row}>
                <Text style={s.bib}>{item.number !== null ? String(item.number) : ""}</Text>
                <Text style={s.name}>{item.item}</Text>
                <Text style={s.notes}>{item.notes ?? ""}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
