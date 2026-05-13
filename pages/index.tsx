import { useState, useEffect, useCallback } from "react";
import type { ListItem } from "@/types";
import { SortableList } from "@/components/SortableList";
import { AddItemDrawer } from "@/components/AddItemDrawer";

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export default function Home() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Read list from URL on mount (client-side only)
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
    setInitialized(true);
  }, []);

  // Keep URL in sync with list state
  useEffect(() => {
    if (!initialized) return;
    const url = new URL(window.location.href);
    if (items.length === 0) {
      url.searchParams.delete("list");
    } else {
      url.searchParams.set("list", btoa(JSON.stringify(items)));
    }
    window.history.replaceState(null, "", url.toString());
  }, [items, initialized]);

  const handleAdd = useCallback((item: string, number: number | null) => {
    setItems((prev) => {
      const newItem: ListItem = {
        id: generateId(),
        item,
        number,
        order: prev.length,
      };
      return [...prev, newItem];
    });
    setDrawerOpen(false);
  }, []);

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <>
      <main className="min-h-screen py-8 px-4">
        <div className="w-full max-w-[600px] mx-auto">
          {sortedItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-20 text-sm">
              No items yet. Press + to add one.
            </p>
          ) : (
            <SortableList items={sortedItems} onReorder={setItems} />
          )}
        </div>
      </main>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <AddItemDrawer open={drawerOpen} onAdd={handleAdd} />

      {/* FAB */}
      <button
        onClick={() => setDrawerOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-3xl leading-none hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={drawerOpen ? "Close drawer" : "Add item"}
      >
        {drawerOpen ? "−" : "+"}
      </button>
    </>
  );
}
