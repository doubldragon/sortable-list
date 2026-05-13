import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ListItem } from "@/types";

function borderColor(order: number): string {
  if (order < 13) return "border-l-gray-900";
  if (order < 26) return "border-l-blue-300";
  if (order < 39) return "border-l-gray-400";
  return "border-l-red-500";
}

interface Props {
  item: ListItem;
}

export function SortableItem({ item }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={[
        `flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 border-l-4 ${borderColor(item.order)} rounded-lg`,
        "cursor-grab active:cursor-grabbing select-none",
        isDragging ? "opacity-50 shadow-lg z-10" : "shadow-sm",
      ].join(" ")}
    >
      {item.number !== null && (
        <span className="font-mono font-semibold text-blue-600 shrink-0">
          {item.number}
        </span>
      )}
      {item.item && <span className="text-gray-800 break-words">{item.item}</span>}
    </div>
  );
}
