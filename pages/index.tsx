import { useState, useEffect, useCallback } from "react";
import type { ListItem } from "@/types";
import { SortableList } from "@/components/SortableList";
import { AddItemDrawer } from "@/components/AddItemDrawer";
import { NotesDrawer } from "@/components/NotesDrawer";
import { EditableField } from "@/components/EditableField";

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function safeAtob(val: string): string {
  try {
    return atob(val);
  } catch {
    return "";
  }
}

export default function Home() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [listName, setListName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [notesItem, setNotesItem] = useState<ListItem | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [copied, setCopied] = useState(false);

  // Read state from URL on mount (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const listParam = params.get("list");
    if (listParam) {
      try {
        const parsed: unknown = JSON.parse(atob(listParam));
        if (Array.isArray(parsed)) {
          setItems(parsed as ListItem[]);
        }
      } catch {
        // invalid param — start with empty list
      }
    }

    const nameParam = params.get("name");
    if (nameParam) setListName(safeAtob(nameParam));

    const authorParam = params.get("author");
    if (authorParam) setAuthorName(safeAtob(authorParam));

    setInitialized(true);
  }, []);

  // Keep URL in sync with state
  useEffect(() => {
    if (!initialized) return;
    const url = new URL(window.location.href);

    if (items.length === 0) {
      url.searchParams.delete("list");
    } else {
      url.searchParams.set("list", btoa(JSON.stringify(items)));
    }

    if (listName) {
      url.searchParams.set("name", btoa(listName));
    } else {
      url.searchParams.delete("name");
    }

    if (authorName) {
      url.searchParams.set("author", btoa(authorName));
    } else {
      url.searchParams.delete("author");
    }

    window.history.replaceState(null, "", url.toString());
  }, [items, listName, authorName, initialized]);

  const handleAdd = useCallback((item: string, number: number | null) => {
    setItems((prev) => [
      ...prev,
      { id: generateId(), item, number, order: prev.length },
    ]);
    setDrawerOpen(false);
  }, []);

  const handleEdit = useCallback((item: ListItem) => {
    setEditingItem(item);
    setDrawerOpen(true);
  }, []);

  const handleUpdate = useCallback(
    (id: string, item: string, number: number | null) => {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, item, number } : i))
      );
      setEditingItem(null);
      setDrawerOpen(false);
    },
    []
  );

  const handleNotes = useCallback((item: ListItem) => {
    setNotesItem(item);
    setDrawerOpen(false);
    setEditingItem(null);
  }, []);

  const handleSaveNotes = useCallback((id: string, notes: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, notes } : i))
    );
    setNotesItem(null);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .filter((i) => i.id !== id)
        .map((i, idx) => ({ ...i, order: idx }))
    );
  }, []);

  function handleCloseDrawer() {
    setDrawerOpen(false);
    setEditingItem(null);
  }

  function handleCopy() {
    void navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  const anyDrawerOpen = drawerOpen || notesItem !== null;

  return (
    <>
      <main className="min-h-screen py-8 px-4">
        <div className="w-full max-w-[600px] mx-auto">
          <div className="mb-6 flex flex-col gap-1.5">
            <EditableField
              value={listName}
              onSave={setListName}
              placeholder="Enter list name..."
              textClassName="text-xl font-bold text-gray-900"
            />
            <EditableField
              value={authorName}
              onSave={setAuthorName}
              placeholder="Enter author name..."
              textClassName="text-sm text-gray-500"
            />
          </div>

          {sortedItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-12 text-sm">
              No items yet. Press + to add one.
            </p>
          ) : (
            <SortableList
              items={sortedItems}
              onReorder={setItems}
              onEdit={handleEdit}
              onNotes={handleNotes}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>

      {/* Backdrop */}
      {anyDrawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => {
            setDrawerOpen(false);
            setEditingItem(null);
            setNotesItem(null);
          }}
        />
      )}

      <AddItemDrawer
        open={drawerOpen}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onClose={handleCloseDrawer}
        editingItem={editingItem}
      />

      <NotesDrawer
        item={notesItem}
        onSave={handleSaveNotes}
        onClose={() => setNotesItem(null)}
      />

      {/* Copy URL button */}
      <button
        onClick={handleCopy}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Copy page URL"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>

      {/* FAB */}
      {!anyDrawerOpen && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-3xl leading-none hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Add item"
        >
          +
        </button>
      )}
    </>
  );
}
