import type { ListItem, TeamConfig } from "@/types";
import type { DocumentProps } from "@react-pdf/renderer";
import type { ReactElement } from "react";

export async function openListPdf(
  items: ListItem[],
  config: TeamConfig,
  listName: string,
  authorName: string,
): Promise<void> {
  const [{ pdf }, { createElement }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("react"),
  ]);
  const { ListPdf } = await import("@/components/ListPdf");

  const el = createElement(ListPdf, { items, config, listName, authorName }) as ReactElement<DocumentProps>;
  const blob = await pdf(el).toBlob();

  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}
