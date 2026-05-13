module.exports = [
"[project]/components/SortableItem.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SortableItem",
    ()=>SortableItem
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/sortable [external] (@dnd-kit/sortable, cjs, [project]/node_modules/@dnd-kit/sortable)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$utilities__$5b$external$5d$__$2840$dnd$2d$kit$2f$utilities$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/utilities [external] (@dnd-kit/utilities, cjs, [project]/node_modules/@dnd-kit/utilities)");
;
;
;
function SortableItem({ item }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$29$__["useSortable"])({
        id: item.id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$utilities__$5b$external$5d$__$2840$dnd$2d$kit$2f$utilities$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$29$__["CSS"].Transform.toString(transform),
        transition
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...attributes,
        ...listeners,
        className: [
            "flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg",
            "cursor-grab active:cursor-grabbing select-none",
            isDragging ? "opacity-50 shadow-lg z-10" : "shadow-sm"
        ].join(" "),
        children: [
            item.number !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "font-mono font-semibold text-blue-600 shrink-0",
                children: item.number
            }, void 0, false, {
                fileName: "[project]/components/SortableItem.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            item.item && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "text-gray-800 break-words",
                children: item.item
            }, void 0, false, {
                fileName: "[project]/components/SortableItem.tsx",
                lineNumber: 41,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SortableItem.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SortableList.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SortableList",
    ()=>SortableList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/core [external] (@dnd-kit/core, cjs, [project]/node_modules/@dnd-kit/core)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$29$__ = __turbopack_context__.i("[externals]/@dnd-kit/sortable [external] (@dnd-kit/sortable, cjs, [project]/node_modules/@dnd-kit/sortable)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SortableItem$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SortableItem.tsx [ssr] (ecmascript)");
;
;
;
;
function SortableList({ items, onReorder }) {
    const sensors = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["PointerSensor"]), (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["TouchSensor"]), (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$29$__["sortableKeyboardCoordinates"]
    }));
    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = items.findIndex((i)=>i.id === active.id);
        const newIndex = items.findIndex((i)=>i.id === over.id);
        const reordered = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$29$__["arrayMove"])(items, oldIndex, newIndex).map((item, idx)=>({
                ...item,
                order: idx
            }));
        onReorder(reordered);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["DndContext"], {
        sensors: sensors,
        collisionDetection: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$core__$5b$external$5d$__$2840$dnd$2d$kit$2f$core$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$29$__["closestCenter"],
        onDragEnd: handleDragEnd,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$29$__["SortableContext"], {
            items: items.map((i)=>i.id),
            strategy: __TURBOPACK__imported__module__$5b$externals$5d2f40$dnd$2d$kit$2f$sortable__$5b$external$5d$__$2840$dnd$2d$kit$2f$sortable$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$29$__["verticalListSortingStrategy"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SortableItem$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["SortableItem"], {
                        item: item
                    }, item.id, false, {
                        fileName: "[project]/components/SortableList.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/SortableList.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/SortableList.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SortableList.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/AddItemDrawer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddItemDrawer",
    ()=>AddItemDrawer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function AddItemDrawer({ open, onAdd }) {
    const [itemText, setItemText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [numberText, setNumberText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const isValid = itemText.trim() !== "" || numberText.trim() !== "";
    function handleAdd() {
        if (!isValid) return;
        const num = numberText.trim() !== "" ? Number(numberText) : null;
        onAdd(itemText.trim(), num);
        setItemText("");
        setNumberText("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: [
            "fixed bottom-0 left-0 right-0 z-40",
            "transition-transform duration-300 ease-in-out",
            open ? "translate-y-0" : "translate-y-full"
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white border-t border-gray-200 shadow-2xl rounded-t-2xl px-4 pt-6 pb-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "w-full max-w-[600px] mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-gray-900 mb-4",
                        children: "Add item"
                    }, void 0, false, {
                        fileName: "[project]/components/AddItemDrawer.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Item"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AddItemDrawer.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: itemText,
                                        onChange: (e)=>setItemText(e.target.value),
                                        placeholder: "Enter item name",
                                        className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                        onKeyDown: (e)=>{
                                            if (e.key === "Enter") handleAdd();
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/AddItemDrawer.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AddItemDrawer.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Number"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AddItemDrawer.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: numberText,
                                        onChange: (e)=>setNumberText(e.target.value),
                                        placeholder: "Enter a number",
                                        className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                        onKeyDown: (e)=>{
                                            if (e.key === "Enter") handleAdd();
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/AddItemDrawer.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AddItemDrawer.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleAdd,
                                disabled: !isValid,
                                className: "mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/components/AddItemDrawer.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AddItemDrawer.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AddItemDrawer.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/AddItemDrawer.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AddItemDrawer.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SortableList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SortableList.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddItemDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AddItemDrawer.tsx [ssr] (ecmascript)");
;
;
;
;
function generateId() {
    return Math.random().toString(36).slice(2, 9);
}
function Home() {
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [drawerOpen, setDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [initialized, setInitialized] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Read list from URL on mount (client-side only)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const params = new URLSearchParams(window.location.search);
        const listParam = params.get("list");
        if (listParam) {
            try {
                const parsed = JSON.parse(atob(listParam));
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            } catch  {
            // invalid param — start with empty list
            }
        }
        setInitialized(true);
    }, []);
    // Keep URL in sync with list state
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!initialized) return;
        const url = new URL(window.location.href);
        if (items.length === 0) {
            url.searchParams.delete("list");
        } else {
            url.searchParams.set("list", btoa(JSON.stringify(items)));
        }
        window.history.replaceState(null, "", url.toString());
    }, [
        items,
        initialized
    ]);
    const handleAdd = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((item, number)=>{
        setItems((prev)=>{
            const newItem = {
                id: generateId(),
                item,
                number,
                order: prev.length
            };
            return [
                ...prev,
                newItem
            ];
        });
        setDrawerOpen(false);
    }, []);
    const sortedItems = [
        ...items
    ].sort((a, b)=>a.order - b.order);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "min-h-screen py-8 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-[600px] mx-auto",
                    children: sortedItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-gray-400 mt-20 text-sm",
                        children: "No items yet. Press + to add one."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SortableList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["SortableList"], {
                        items: sortedItems,
                        onReorder: setItems
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            drawerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-30 bg-black/20",
                onClick: ()=>setDrawerOpen(false)
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AddItemDrawer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["AddItemDrawer"], {
                open: drawerOpen,
                onAdd: handleAdd
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>setDrawerOpen((prev)=>!prev),
                className: "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-3xl leading-none hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "aria-label": drawerOpen ? "Close drawer" : "Add item",
                children: drawerOpen ? "−" : "+"
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0.0octs._.js.map