import { useState } from "react";

interface Props {
  value: string;
  onSave: (val: string) => void;
  placeholder: string;
  textClassName?: string;
}


export function EditableField({
  value,
  onSave,
  placeholder,
  textClassName = "text-base font-semibold text-gray-900",
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  function startEdit() {
    setDraft(value);
    setEditing(true);
  }

  function handleSave() {
    onSave(draft.trim());
    setEditing(false);
  }

  if (value && !editing) {
    return (
      <div
        className="group flex items-center justify-center gap-1.5 cursor-pointer"
        onClick={startEdit}
        role="button"
        aria-label="Edit"
      >
        <span className={textClassName}>{value}</span>
        <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <i className="fa-solid fa-pencil" style={{ fontSize: 13 }} />
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
        autoFocus={editing}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
        }}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save
      </button>
    </div>
  );
}
