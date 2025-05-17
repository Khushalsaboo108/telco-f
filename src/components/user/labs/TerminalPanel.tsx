"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Maximize2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import TerminalPage from "./TerminalPage";
import TerminalPageTab from "./TerminalPageTab";

// Define the tab interface
interface TerminalTab {
  id: string;
  title: string;
  active: boolean;
}

interface TerminalPanelProps {
  onToggle?: (isOpen: boolean) => void;
}

export default function TerminalPanel({ onToggle }: TerminalPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tabs, setTabs] = useState<TerminalTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize with one tab when opened
  useEffect(() => {
    if (isOpen && tabs.length === 0) {
      addNewTab();
    }
  }, [isOpen, tabs.length]);

  // Notify parent component when terminal state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        // Don't close if clicking the expand button
        const target = event.target as HTMLElement;
        if (target.closest('[data-expand-button="true"]')) return;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate a unique ID for tabs
  const generateId = () =>
    `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add a new tab
  const addNewTab = () => {
    const newTabId = generateId();
    const newTab = {
      id: newTabId,
      title: `Terminal ${tabs.length + 1}`,
      active: true,
    };

    // Set all other tabs to inactive
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      active: false,
    }));

    setTabs([...updatedTabs, newTab]);
    setActiveTabId(newTabId);
  };

  // Close a tab
  const closeTab = (tabId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    // Don't close if it's the last tab
    if (tabs.length === 1) {
      setIsOpen(false);
      return;
    }

    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const newTabs = tabs.filter((tab) => tab.id !== tabId);

    // If we're closing the active tab, activate another tab
    if (tabId === activeTabId) {
      const newActiveIndex = tabIndex === 0 ? 0 : tabIndex - 1;
      setActiveTabId(newTabs[newActiveIndex].id);

      // Update the active state
      newTabs[newActiveIndex].active = true;
    }

    setTabs(newTabs);
  };

  // Switch to a tab
  const switchToTab = (tabId: string) => {
    setActiveTabId(tabId);
    setTabs(
      tabs.map((tab) => ({
        ...tab,
        active: tab.id === tabId,
      }))
    );
  };

  return (
    <>
      {/* Expand Button */}
      {!isOpen && (
        <div className="w-full bg-gray-300 flex justify-end rounded-t-lg p-2 px-4 items-end">
          <button
            data-expand-button="true"
            onClick={() => {
              setIsOpen(true);
            }}
            className="bottom-4 bg-[#000000] text-white p-2 rounded-full shadow-lg hover:bg-[#1c1c1c] transition-all z-50"
            aria-label="Expand terminal"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      )}

      {/* Terminal Panel */}
      <div
        ref={panelRef}
        className={`bottom-0 right-0 bg-[#000000] text-[#ffffff] relative w-full transition-all duration-300 ease-in-out shadow-lg flex flex-col z-40 
          ${
            isOpen
              ? "opacity-100 h-full visible"
              : "opacity-0 h-0 invisible pointer-events-none"
          }`}
      >
        {/* Panel Header with Tabs */}
        <div className="flex flex-col border-b z-[99] w-[100%] border-[#404040] bg-[#1c1c1c]">
          {/* Controls */}
          <div className="flex justify-between items-center px-2">
            <div>Terminal</div>
            <div className="flex gap-2">
              {tabs.length < 7 && (
                <button
                  onClick={addNewTab}
                  className="p-2 hover:bg-[#404040] text-gray-400 hover:text-white transition-colors"
                  aria-label="New terminal tab"
                >
                  <Plus size={18} />
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-[#404040] rounded text-[#ffffff]"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => switchToTab(tab.id)}
                className={cn(
                  "flex items-center min-w-[140px] max-w-[200px] h-9 px-3 py-1 text-sm border-r border-t border-[#404040] cursor-pointer group relative",
                  tab.active
                    ? "bg-[#2c2c2c] text-white"
                    : "bg-[#1c1c1c] text-gray-400 hover:bg-[#252525]"
                )}
              >
                <span className="truncate flex-1">{tab.title}</span>
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="ml-2 p-0.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-[#404040] transition-opacity"
                  aria-label="Close tab"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-grow">
          {isOpen &&
            tabs.map((tab) => (
              <div
                key={tab.id}
                className={cn("", tab.active ? "block" : "hidden")}
              >
                <TerminalPageTab tabId={tab.id} />
                {/* it will handle socket work */}
                {/* <TerminalPage tabId={tab.id} /> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
