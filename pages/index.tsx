import { useState, useEffect, useCallback, useRef } from "react";
import LZString from "lz-string";
import type { ListItem, TeamConfig } from "@/types";
import { SortableList } from "@/components/SortableList";
import { AddItemDrawer } from "@/components/AddItemDrawer";
import { NotesDrawer } from "@/components/NotesDrawer";
import { SettingsDrawer } from "@/components/SettingsDrawer";
import { SummaryModal } from "@/components/SummaryModal";
import { SummaryView } from "@/components/SummaryView";
import { HelpModal } from "@/components/HelpModal";

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
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
  const [copying, setCopying] = useState(false);
  const [gearDropdownOpen, setGearDropdownOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [sortMode, setSortMode] = useState<"ranking" | "bib" | "name">("ranking");
  const [viewMode, setViewMode] = useState<"list" | "summary">("list");
  const [pdfExporting, setPdfExporting] = useState(false);
  const gearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const dParam = params.get("d");
    if (dParam) {
      try {
        const { items, name, author, config } = JSON.parse(
          LZString.decompressFromEncodedURIComponent(dParam)
        );
        if (Array.isArray(items)) setItems(items as ListItem[]);
        if (name) setListName(name as string);
        if (author) setAuthorName(author as string);
        if (config) setTeamConfig(config as TeamConfig);
      } catch { /* invalid param */ }
    } else {
      // legacy base64 params
      try {
        const listParam = params.get("list");
        if (listParam) {
          const parsed: unknown = JSON.parse(atob(listParam));
          if (Array.isArray(parsed)) setItems(parsed as ListItem[]);
        }
        const nameParam = params.get("name");
        if (nameParam) setListName(atob(nameParam));
        const authorParam = params.get("author");
        if (authorParam) setAuthorName(atob(authorParam));
        const configParam = params.get("config");
        if (configParam) {
          const parsed = JSON.parse(atob(configParam)) as TeamConfig;
          setTeamConfig(parsed);
        }
      } catch { /* invalid param */ }
    }

    if (!dParam && !params.get("name") && !params.get("list")) {
      setSettingsOpen(true);
    }

    if (params.get("view") === "summary") setViewMode("summary");

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    const url = new URL(window.location.href);

    // clear legacy params
    url.searchParams.delete("list");
    url.searchParams.delete("name");
    url.searchParams.delete("author");
    url.searchParams.delete("config");

    const data = { items, name: listName, author: authorName, config: teamConfig };
    url.searchParams.set("d", LZString.compressToEncodedURIComponent(JSON.stringify(data)));

    if (viewMode === "summary") {
      url.searchParams.set("view", "summary");
    } else {
      url.searchParams.delete("view");
    }

    window.history.replaceState(null, "", url.toString());
  }, [items, listName, authorName, teamConfig, viewMode, initialized]);

  const handleAdd = useCallback((item: string, number: number | null) => {
    setItems((prev) => [
      ...prev,
      { id: generateId(), item, number, order: prev.length },
    ]);
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

  useEffect(() => {
    if (!gearDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (!gearRef.current?.contains(e.target as Node)) setGearDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [gearDropdownOpen]);

  function handleCloseDrawer() {
    setDrawerOpen(false);
    setEditingItem(null);
  }

  async function handleExportPdf() {
    if (pdfExporting) return;
    setPdfExporting(true);
    try {
      const { openListPdf } = await import("@/utils/generatePdf");
      await openListPdf(items, teamConfig, listName, authorName);
    } finally {
      setPdfExporting(false);
    }
  }

  async function handleCopy() {
    if (copying) return;
    setCopying(true);
    const longUrl = window.location.href;
    let url = longUrl;
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    if (!isLocal) {
      try {
        const res = await fetch(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
        );
        const short = (await res.text()).trim();
        if (short.startsWith("https://") || short.startsWith("http://")) url = short;
      } catch { /* fall back to long url */ }
    }
    setCopying(false);
    void navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const sortedItems = (() => {
    if (sortMode === "bib") {
      return [...items].sort((a, b) => {
        if (a.number === null && b.number === null) return 0;
        if (a.number === null) return 1;
        if (b.number === null) return -1;
        return a.number - b.number;
      });
    }
    if (sortMode === "name") {
      return [...items].sort((a, b) => a.item.localeCompare(b.item));
    }
    return [...items].sort((a, b) => a.order - b.order);
  })();
  const anyDrawerOpen = drawerOpen || notesItem !== null || settingsOpen;

  return (
    <>
      <main className="min-h-screen py-8 px-4">
        <div className="w-full max-w-[600px] mx-auto">
          <div className="mb-6 flex flex-col gap-1 text-center">
            <h1 className="text-xl font-bold text-gray-900">{listName || "Untitled List"}</h1>
            <p className="text-sm text-gray-500">{authorName || "Unknown"}</p>
          </div>


          {sortedItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-12 text-sm">
              No items yet. Press + to add one.
            </p>
          ) : (
            <div>
              <div className="mb-3 flex items-center gap-2">
                {viewMode === "list" &&
                  <>
                    <span className="text-xs text-gray-500">Sort by</span>
                    <select
                      value={sortMode}
                      onChange={(e) => setSortMode(e.target.value as "ranking" | "bib" | "name")}
                      className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="ranking">Ranking</option>
                      <option value="bib">Bib Number</option>
                      <option value="name">Name</option>
                    </select>
                  </>
                }
                <div className="ml-auto flex items-center gap-2">
                  <span className={`text-xs ${viewMode === "list" ? "text-blue-600":"text-gray-500"}`}>Rankings</span>
                  <button
                    role="switch"
                    aria-checked={viewMode === "summary"}
                    onClick={() => setViewMode(viewMode === "list" ? "summary" : "list")}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                      viewMode === "summary" ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        viewMode === "summary" ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <span className={`text-xs ${viewMode === "summary" ? "text-blue-600":"text-gray-500"}`}>Summary</span>
                </div>
              </div>
              {viewMode === "summary" ? (
                <SummaryView items={items} config={teamConfig} />
              ) : (
                <SortableList
                  items={sortedItems}
                  teamConfig={teamConfig}
                  onReorder={setItems}
                  onEdit={handleEdit}
                  onNotes={handleNotes}
                  onDelete={handleDelete}
                  draggable={sortMode === "ranking"}
                />
              )}
            </div>
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
        items={items}
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
        listName={listName}
        authorName={authorName}
        config={teamConfig}
        onSave={(config, name, author) => {
          setTeamConfig(config);
          setListName(name);
          setAuthorName(author);
        }}
        onClose={() => setSettingsOpen(false)}
      />

      <SummaryModal
        open={summaryOpen}
        items={items}
        config={teamConfig}
        onClose={() => setSummaryOpen(false)}
      />

      <HelpModal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
      />

      {/* Gear menu — upper left */}
      <div ref={gearRef} className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setGearDropdownOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Menu"
        >
          <i className="fa-solid fa-gear" style={{ fontSize: 17 }} />
        </button>

        {gearDropdownOpen && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
            <button
              onClick={() => { setSettingsOpen(true); setGearDropdownOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
            >
              <i className="fa-solid fa-gear text-blue-500" style={{ fontSize: 13 }} />
              Settings
            </button>
            <button
              onClick={() => { setSummaryOpen(true); setGearDropdownOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
            >
              <i className="fa-solid fa-list text-blue-500" style={{ fontSize: 13 }} />
              Summary
            </button>
            <button
              onClick={() => { setHelpOpen(true); setGearDropdownOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
            >
              <i className="fa-solid fa-circle-question text-blue-500" style={{ fontSize: 13 }} />
              Help
            </button>
            <button
              onClick={() => { window.open(window.location.origin + window.location.pathname, "_blank"); setGearDropdownOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-blue-500" style={{ fontSize: 12 }} />
              New...
            </button>
            <button
              onClick={() => { void handleExportPdf(); setGearDropdownOpen(false); }}
              disabled={pdfExporting}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700 disabled:opacity-50"
            >
              {pdfExporting
                ? <i className="fa-solid fa-spinner fa-spin text-blue-500" style={{ fontSize: 13 }} />
                : <i className="fa-solid fa-file-pdf text-blue-500" style={{ fontSize: 13 }} />
              }
              Export PDF
            </button>
          </div>
        )}
      </div>

      {/* Copy URL button — upper right */}
      <button
        onClick={handleCopy}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Copy page URL"
      >
        {copied
          ? <i className="fa-solid fa-check" style={{ fontSize: 17 }} />
          : copying
          ? <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 15 }} />
          : <i className="fa-regular fa-copy" style={{ fontSize: 17 }} />
        }
      </button>

      {!anyDrawerOpen && !summaryOpen && (
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
