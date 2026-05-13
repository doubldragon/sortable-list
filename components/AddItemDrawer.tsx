import { useState, useEffect } from "react";
import type { ListItem } from "@/types";

interface Props {
  open: boolean;
  onAdd: (item: string, number: number | null) => void;
  onUpdate: (id: string, item: string, number: number | null) => void;
  onClose: () => void;
  editingItem?: ListItem | null;
}

export function AddItemDrawer({
  open,
  onAdd,
  onUpdate,
  onClose,
  editingItem,
}: Props) {
  const [itemText, setItemText] = useState("");
  const [numberText, setNumberText] = useState("");

  useEffect(() => {
    if (!open) return;
    if (editingItem) {
      setItemText(editingItem.item);
      setNumberText(editingItem.number !== null ? String(editingItem.number) : "");
    } else {
      setItemText("");
      setNumberText("");
    }
  }, [open, editingItem]);

  const isValid = itemText.trim() !== "" || numberText.trim() !== "";

  function handleSubmit() {
    if (!isValid) return;
    const num = numberText.trim() !== "" ? Number(numberText) : null;
    if (editingItem) {
      onUpdate(editingItem.id, itemText.trim(), num);
    } else {
      onAdd(itemText.trim(), num);
    }
    setItemText("");
    setNumberText("");
  }

  function handleAddAnother() {
    if (!isValid) return;
    const num = numberText.trim() !== "" ? Number(numberText) : null;
    onAdd(itemText.trim(), num);
    setItemText("");
    setNumberText("");
  }

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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingItem ? "Edit Player" : "Add Player"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close drawer"
            >
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 18 }} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Player Name
              </label>
              <input
                type="text"
                value={itemText}
                onChange={(e) => setItemText(e.target.value)}
                placeholder="Enter player name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number
              </label>
              <input
                type="number"
                value={numberText}
                onChange={(e) => setNumberText(e.target.value)}
                placeholder="Enter bib number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
            </div>
            <div className="mt-2 flex gap-2">
              {!editingItem && (
                <button
                  onClick={handleAddAnother}
                  disabled={!isValid}
                  className="flex-1 bg-white border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
                >
                  Add Another
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                {editingItem ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
