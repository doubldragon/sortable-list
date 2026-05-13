import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import type { ListItem, TeamConfig } from "@/types";
import { SortableItem } from "./SortableItem";

interface Props {
  items: ListItem[];
  teamConfig: TeamConfig;
  onReorder: (items: ListItem[]) => void;
  onEdit: (item: ListItem) => void;
  onNotes: (item: ListItem) => void;
  onDelete: (id: string) => void;
}

export function SortableList({ items, teamConfig, onReorder, onEdit, onNotes, onDelete }: Props) {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex).map((item, idx) => ({
      ...item,
      order: idx,
    }));
    onReorder(reordered);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              teamConfig={teamConfig}
              onEdit={() => onEdit(item)}
              onNotes={() => onNotes(item)}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
