import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ListItem, TeamConfig } from "@/types";

const REVEAL_WIDTH = 112;

const TEAM_COLORS: Record<keyof TeamConfig, string> = {
  black: "border-l-gray-900",
  blue:  "border-l-blue-300",
  gray:  "border-l-gray-400",
  white: "border-l-gray-100",
};

function borderColor(order: number, config: TeamConfig): string {
  let threshold = 0;
  for (const key of ["black", "blue", "gray", "white"] as const) {
    const count = config[key];
    if (count !== null && count > 0) {
      threshold += count;
      if (order < threshold) return TEAM_COLORS[key];
    }
  }
  return "border-l-red-500";
}


interface Props {
  item: ListItem;
  teamConfig: TeamConfig;
  onEdit: () => void;
  onNotes: () => void;
  onDelete: () => void;
}

export function SortableItem({ item, teamConfig, onEdit, onNotes, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const [translateX, setTranslateX] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; right: number } | null>(null);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const startTranslateX = useRef(0);
  const liveTranslateX = useRef(0);
  const isSwiping = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownPanelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback((el: HTMLDivElement | null) => {
    setNodeRef(el);
    containerRef.current = el;
  }, [setNodeRef]);

  useEffect(() => {
    if (isDragging) {
      setTranslateX(0);
      liveTranslateX.current = 0;
      setPendingDelete(false);
    }
  }, [isDragging]);

  const closeSwipe = useCallback(() => {
    setTranslateX(0);
    liveTranslateX.current = 0;
    setPendingDelete(false);
  }, []);

  const isSwipeOpen = translateX < 0;

  useEffect(() => {
    if (!isSwipeOpen) return;
    const handler = (e: TouchEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        closeSwipe();
      }
    };
    document.addEventListener("touchstart", handler, { passive: true });
    return () => document.removeEventListener("touchstart", handler);
  }, [isSwipeOpen, closeSwipe]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !dropdownPanelRef.current?.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setPendingDelete(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    startTranslateX.current = liveTranslateX.current;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    if (!isSwiping.current) {
      if (Math.abs(dx) > 5 && Math.abs(dx) > Math.abs(dy)) {
        isSwiping.current = true;
      } else if (Math.abs(dy) > 5) {
        return;
      } else {
        return;
      }
    }

    const newX = Math.max(-REVEAL_WIDTH, Math.min(0, startTranslateX.current + dx));
    liveTranslateX.current = newX;
    setTranslateX(newX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    if (liveTranslateX.current < -REVEAL_WIDTH / 2) {
      setTranslateX(-REVEAL_WIDTH);
      liveTranslateX.current = -REVEAL_WIDTH;
    } else {
      setTranslateX(0);
      liveTranslateX.current = 0;
      setPendingDelete(false);
    }
  };

  const openDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setDropdownOpen(true);
    setPendingDelete(false);
  };

  const revealedWidth = Math.abs(translateX);

  return (
    <div
      ref={setRefs}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...(translateX === 0 ? listeners : {})}
      className={`flex select-none cursor-grab active:cursor-grabbing${isDragging ? " opacity-50 z-10" : ""}`}
    >
      {/* Main card — shrinks as buttons reveal */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex flex-1 min-w-0 items-center gap-3 px-4 py-3 bg-white border border-gray-200 border-l-4 ${borderColor(item.order, teamConfig)} rounded-lg shadow-sm`}
      >
        {item.number !== null && (
          <span className="font-mono font-semibold text-blue-600 shrink-0">
            {item.number}
          </span>
        )}
        <span className="flex-1 text-gray-800 break-words min-w-0">{item.item}</span>

        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => item.notes ? setNotesModalOpen(true) : onNotes()}
          className={`shrink-0 p-1 transition-colors ${item.notes ? "text-yellow-500 hover:text-yellow-600" : "text-gray-300 hover:text-gray-400"}`}
          aria-label={item.notes ? "View notes" : "Add notes"}
        >
          <i className="fa-solid fa-file-lines" style={{ fontSize: 15 }} />
        </button>

        {/* Three-dot button — desktop only */}
        <div className="hidden md:block relative shrink-0">
          <button
            ref={buttonRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={dropdownOpen ? () => { setDropdownOpen(false); setPendingDelete(false); } : openDropdown}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1"
            aria-label="More options"
          >
            <i className="fa-solid fa-ellipsis-vertical" style={{ fontSize: 16 }} />
          </button>
        </div>
      </div>

      {/* Revealed action buttons — mobile only, grows from right */}
      <div
        className="md:hidden flex overflow-hidden"
        style={{
          width: revealedWidth,
          flexShrink: 0,
          transition: isSwiping.current ? "none" : "width 0.2s ease",
          marginLeft: revealedWidth > 0 ? 6 : 0,
        }}
      >
        <div style={{ width: REVEAL_WIDTH }} className="flex rounded-lg overflow-hidden">
          {pendingDelete ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-red-50 px-3">
              <span className="text-xs font-medium text-red-700">Delete?</span>
              <div className="flex gap-1 w-full">
                <button
                  onClick={closeSwipe}
                  className="flex-1 text-xs py-1.5 rounded bg-gray-200 text-gray-700"
                >
                  No
                </button>
                <button
                  onClick={() => { onDelete(); closeSwipe(); }}
                  className="flex-1 text-xs py-1.5 rounded bg-red-600 text-white font-medium"
                >
                  Yes
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => { onEdit(); closeSwipe(); }}
                className="flex-1 bg-blue-500 flex flex-col items-center justify-center text-white gap-1"
              >
                <i className="fa-solid fa-pen" style={{ fontSize: 15 }} />
                <span className="text-xs">Edit</span>
              </button>
              <button
                onClick={() => setPendingDelete(true)}
                className="flex-1 bg-red-500 flex flex-col items-center justify-center text-white gap-1"
              >
                <i className="fa-solid fa-trash" style={{ fontSize: 15 }} />
                <span className="text-xs">Delete</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Notes read-only modal */}
      {notesModalOpen && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 cursor-pointer"
          onClick={() => setNotesModalOpen(false)}
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-sm p-5 cursor-default"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <p className="font-semibold text-gray-900 mb-3">
              {[item.number !== null ? String(item.number) : null, item.item].filter(Boolean).join(" — ")}
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap mb-4">{item.notes}</p>
            <button
              onClick={() => { setNotesModalOpen(false); onNotes(); }}
              className="mx-auto block bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Portal dropdown — desktop only */}
      {dropdownOpen && dropdownPos && createPortal(
        <div
          ref={dropdownPanelRef}
          style={{ position: "fixed", top: dropdownPos.top, right: dropdownPos.right, zIndex: 9999 }}
          className="bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]"
        >
          {pendingDelete ? (
            <div className="p-3">
              <p className="text-sm text-gray-700 mb-3">Delete this item?</p>
              <div className="flex gap-2">
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => setPendingDelete(false)}
                  className="flex-1 text-sm px-2 py-1.5 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => { onDelete(); setDropdownOpen(false); }}
                  className="flex-1 text-sm px-2 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => { onEdit(); setDropdownOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
              >
                <i className="fa-solid fa-pen" style={{ fontSize: 15 }} /> Edit
              </button>
              <hr className="border-gray-100 my-1" />
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setPendingDelete(true)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
              >
                <i className="fa-solid fa-trash" style={{ fontSize: 15 }} /> Delete
              </button>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
