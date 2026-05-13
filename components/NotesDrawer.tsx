import { useState, useEffect } from "react";
import type { ListItem } from "@/types";

interface Props {
  item: ListItem | null;
  onSave: (id: string, notes: string) => void;
  onClose: () => void;
}

export function NotesDrawer({ item, onSave, onClose }: Props) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(item?.notes ?? "");
  }, [item]);

  const open = item !== null;

  const label = [
    item?.number !== null && item?.number !== undefined ? String(item.number) : null,
    item?.item || null,
  ]
    .filter(Boolean)
    .join(" — ");

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
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{label}</h2>
              {label && (
                <p className="text-sm text-gray-500 mt-0.5">Notes</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors mt-1"
              aria-label="Close"
            >
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 18 }} />
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => { if (item) onSave(item.id, notes); }}
            className="mt-3 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
