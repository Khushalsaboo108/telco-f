"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { io } from "socket.io-client";
import "xterm/css/xterm.css";
import { useRouter } from "next/navigation";
import { SOCKET_URL } from "@/utils/constants";
import Cookies from "react-cookies";

interface TerminalPageProps {
  tabId: string;
}

export default function TerminalPage({ tabId }: TerminalPageProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");

  useEffect(() => {
    // Check if user is logged in
    let token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDEyMDQyNzJiZTk5YmQxMTg3OTRlZCIsImlhdCI6MTc0NDkwNDI3MCwiZXhwIjoxNzQ1NTA5MDcwfQ.OlcILtG1iYVT0KHnEdSMxsSsqmaK5mffhqkYncJkVXs";

    // if (userAccessToken) {
    //   token = userAccessToken;
    // } else if (userRefreshToken) {
    //   token = userRefreshToken;
    // } else {
    //   console.error(
    //     "No access token or refresh token found. Redirecting to login."
    //   );
    // }
    // Initialize terminal
    const terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#000",
        foreground: "#ccc",
      },
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    // Connect to socket
    const socket = io(SOCKET_URL, {
      auth: { token },
    });

    socket.on("connect", () => {
      console.log(`Socket connected for tab ${tabId}`);
      socket.emit("start-terminal");

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });

    socket.on("terminal-ready", () => {
      console.log(`Terminal ready for tab ${tabId}`);
    });

    socket.on("terminal-output", (data) => {
      terminal.write(data);
    });

    socket.on("terminal-error", (error) => {
      console.error(`Terminal error for tab ${tabId}:`, error);
      terminal.write(`\r\nError: ${error}\r\n`);
    });

    socket.on("terminal-closed", () => {
      terminal.write("\r\nConnection closed\r\n");
    });

    socket.on("disconnect", () => {
      terminal.write("\r\nDisconnected from server\r\n");
      setLoading(true);
    });

    // Open terminal
    //@ts-ignore
    terminal.open(terminalRef.current);
    fitAddon.fit();

    // Handle terminal input
    terminal.onData((data) => {
      socket.emit("terminal-input", data);
    });

    // Handle window resize
    const handleResize = () => {
      try {
        fitAddon.fit();
        socket.emit("terminal-resize", {
          cols: terminal.cols,
          rows: terminal.rows,
          tabId,
        });
      } catch (e) {
        console.error(`Error resizing terminal for tab ${tabId}:`, e);
      }
    };

    window.addEventListener("resize", handleResize);

    // Save references
    terminalInstanceRef.current = terminal;
    socketRef.current = socket;

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      terminal.dispose();
      socket.disconnect();
    };
  }, [router]);

  return (
    <div className="flex flex-col">
      <div className="flex-grow overscroll-auto bg-black p-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
            <div className="text-white text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-2"></div>
              <p>Connecting to terminal...</p>
            </div>
          </div>
        )}
        <div ref={terminalRef} className=" overflow-y-scroll h-[100%] " />
      </div>
    </div>
  );
}
