import { useState, useEffect, useCallback } from "react";
import type { ListItem, TeamConfig } from "@/types";
import { SortableList } from "@/components/SortableList";
import { AddItemDrawer } from "@/components/AddItemDrawer";
import { NotesDrawer } from "@/components/NotesDrawer";
import { SettingsDrawer } from "@/components/SettingsDrawer";
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

function safeParseConfig(val: string): TeamConfig | null {
  try {
    return JSON.parse(atob(val)) as TeamConfig;
  } catch {
    return null;
  }
}

const DEFAULT_CONFIG: TeamConfig = { black: 13, blue: 13, gray: 13, white: null };

export default function Home() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [listName, setListName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [teamConfig, setTeamConfig] = useState<TeamConfig>(DEFAULT_CONFIG);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [notesItem, setNotesItem] = useState<ListItem | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const listParam = params.get("list");
    if (listParam) {
      try {
        const parsed: unknown = JSON.parse(atob(listParam));
        if (Array.isArray(parsed)) setItems(parsed as ListItem[]);
      } catch { /* invalid param */ }
    }

    const nameParam = params.get("name");
    if (nameParam) setListName(safeAtob(nameParam));

    const authorParam = params.get("author");
    if (authorParam) setAuthorName(safeAtob(authorParam));

    const configParam = params.get("config");
    if (configParam) {
      const parsed = safeParseConfig(configParam);
      if (parsed) setTeamConfig(parsed);
    }

    setInitialized(true);
  }, []);

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

    url.searchParams.set("config", btoa(JSON.stringify(teamConfig)));

    window.history.replaceState(null, "", url.toString());
  }, [items, listName, authorName, teamConfig, initialized]);

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
  const anyDrawerOpen = drawerOpen || notesItem !== null || settingsOpen;

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
              teamConfig={teamConfig}
              onReorder={setItems}
              onEdit={handleEdit}
              onNotes={handleNotes}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>

      {anyDrawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => {
            setDrawerOpen(false);
            setEditingItem(null);
            setNotesItem(null);
            setSettingsOpen(false);
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

      <SettingsDrawer
        open={settingsOpen}
        config={teamConfig}
        onSave={setTeamConfig}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Settings button — upper left */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Settings"
      >
        <i className="fa-solid fa-gear" style={{ fontSize: 17 }} />
      </button>

      {/* Copy URL button — upper right */}
      <button
        onClick={handleCopy}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Copy page URL"
      >
        {copied
          ? <i className="fa-solid fa-check" style={{ fontSize: 17 }} />
          : <i className="fa-regular fa-copy" style={{ fontSize: 17 }} />
        }
      </button>

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
