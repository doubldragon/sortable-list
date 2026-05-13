import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    icon: "fa-solid fa-plus",
    title: "Adding Players",
    body: "Tap + to add a player. Enter a name and optional bib number. Use Add Another to keep the drawer open and add multiple players in a row.",
  },
  {
    icon: "fa-solid fa-grip-vertical",
    title: "Reordering",
    body: "On desktop, drag any row to reorder. On mobile, press and hold briefly then drag. The team color on the left border updates automatically as players move.",
  },
  {
    icon: "fa-solid fa-hand-point-left",
    title: "Edit & Delete (Mobile)",
    body: "Swipe a row left to reveal Edit and Delete buttons. Tap anywhere else to dismiss.",
  },
  {
    icon: "fa-solid fa-ellipsis-vertical",
    title: "Edit & Delete (Desktop)",
    body: "Click the ⋮ menu on the right side of any row to edit or delete.",
  },
  {
    icon: "fa-solid fa-file-lines",
    title: "Notes",
    body: "Every player has a notes icon on the right. Gray means no notes — tap to add some. Yellow means notes exist — tap to read them, then hit Edit to modify.",
  },
  {
    icon: "fa-solid fa-gear",
    title: "Settings",
    body: "Open the gear menu (top left) and choose Settings to set the list name, author, and how many players belong to each team (Black, Blue, Gray, White). Players beyond the total slots get a red border.",
  },
  {
    icon: "fa-solid fa-list",
    title: "Summary",
    body: "Gear menu → Summary shows all players grouped by team with a count per group.",
  },
  {
    icon: "fa-regular fa-copy",
    title: "Sharing",
    body: "The copy button (top right) generates a shortened link with the entire list encoded in the URL. Anyone with the link sees your list exactly as it is.",
  },
];

export function HelpModal({ open, onClose }: Props) {
  if (!open) return null;

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
          <h2 className="text-base font-semibold text-gray-900">How to use</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" style={{ fontSize: 18 }} />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4 pb-6">
          {SECTIONS.map(({ icon, title, body }) => (
            <div key={title} className="flex gap-3">
              <div className="mt-0.5 w-5 shrink-0 flex justify-center text-blue-500">
                <i className={icon} style={{ fontSize: 14 }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-0.5">{title}</p>
                <p className="text-sm text-gray-500 leading-snug">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
