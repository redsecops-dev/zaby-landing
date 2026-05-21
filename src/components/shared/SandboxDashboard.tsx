"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import windowsWallpaper from "../../../public/windows-wallpaper.png";

interface FloatingApp {
  id: string;
  title: string;
  isOpen: boolean;
  content: React.ReactNode;
}

interface TerminalInputProps {
  onSubmit: (command: string) => void;
  disabled: boolean;
  promptText: string;
}

const TerminalInput = React.memo(function TerminalInput({ onSubmit, disabled, promptText }: TerminalInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled, promptText]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const clean = value.trim();
        if (clean) {
          onSubmit(clean);
          setValue("");
        }
      }}
      className="flex items-center w-full"
    >
      <span className="text-cyan-500 shrink-0 font-semibold font-mono">{promptText}</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 m-0 shrink-1 w-full font-mono text-[10px] pl-1"
        placeholder="type command (e.g. 'help')"
      />
    </form>
  );
});

export default function SandboxDashboard() {
  const [terminalTab, setTerminalTab] = useState("VNC");
  const [sandboxState, setSandboxState] = useState<"Stopped" | "Running" | "Stopping" | "Restarting">("Stopped");
  
  // VNC specific states
  const [vncState, setVncState] = useState<"stopped" | "booting" | "running">("stopped");
  const [isVncReconnecting, setIsVncReconnecting] = useState(false);
  const [activeWindows, setActiveWindows] = useState<FloatingApp[]>([
    {
      id: "notepad",
      title: "Welcome.txt - Notepad",
      isOpen: false,
      content: (
        <div className="p-3 text-[10px] text-gray-800 font-mono h-full bg-white select-text">
          <p className="font-semibold border-b border-gray-200 pb-1 mb-2">WELCOME TO ZABY SANDBOX</p>
          <p>This is a safe Windows 11 Sandbox runtime environment.</p>
          <p className="mt-2">• CPU cores: 2</p>
          <p>• Memory: 4 GB</p>
          <p>• Storage: 5 GB</p>
          <p className="mt-4 text-cyan-600 font-semibold">Active plugins loaded successfully.</p>
        </div>
      )
    },
    {
      id: "cmd",
      title: "Command Prompt",
      isOpen: false,
      content: (
        <div className="p-3 text-[10px] text-green-400 font-mono h-full bg-black leading-relaxed select-text">
          <p>Microsoft Windows [Version 10.0.22621]</p>
          <p>(c) Microsoft Corporation. All rights reserved.</p>
          <p className="mt-2">C:\Users\Administrator&gt; ping zaby.ai</p>
          <p className="text-gray-400">Pinging zaby.ai [104.21.36.19] with 32 bytes of data:</p>
          <p className="text-gray-400">Reply from 104.21.36.19: bytes=32 time=4ms TTL=57</p>
          <p className="text-gray-400">Reply from 104.21.36.19: bytes=32 time=5ms TTL=57</p>
          <p className="mt-2">C:\Users\Administrator&gt; <span className="animate-pulse">_</span></p>
        </div>
      )
    }
  ]);

  // Terminal command prompt states
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: "input" | "system" | "output"; text: string }>>([
    { type: "system", text: "Zaby Terminal Client v1.2.0 initialized." },
    { type: "system", text: "bash • /var/jenkins_home session active." },
    { type: "system", text: "Type 'help' to see list of operational shell commands." },
    { type: "output", text: "bash • /var/jenkins_home $ " }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // 1. Stable dynamic IDs generated on mount for absolute privacy
  const [sandboxId] = useState(() => {
    const p1 = Math.random().toString(16).substring(2, 6);
    const p2 = Math.random().toString(16).substring(2, 10);
    return `4f62ef1d-${p1}-441c-ab41-${p2}`;
  });
  
  const [tenantId] = useState(() => {
    const p1 = Math.random().toString(16).substring(2, 10);
    return `tenant-${p1}-jenkins-6f498204`;
  });
  
  const [sessionId] = useState(() => {
    const p1 = Math.random().toString(16).substring(2, 10);
    const p2 = Math.random().toString(16).substring(2, 10);
    return `tty-${p1}-7e0b-49f2-8272-${p2}`;
  });

  // Auto scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // Handle Command Submission
  const handleCommandSubmit = (command: string) => {
    const cleanCmd = command.trim();
    if (!cleanCmd) return;

    // 1. Append typed command
    const newHistory = [...terminalHistory];
    
    // Replace last prompt line with completed prompt line
    if (newHistory.length > 0 && newHistory[newHistory.length - 1].text.endsWith("$ ")) {
      newHistory[newHistory.length - 1].text += cleanCmd;
    } else {
      newHistory.push({ type: "input", text: `bash • /var/jenkins_home $ ${cleanCmd}` });
    }

    // 2. Parse command responses
    const lowerCmd = cleanCmd.toLowerCase();
    let responseText = "";

    switch (lowerCmd) {
      case "help":
        responseText = "Available commands:\n  help        - Display details about shell tools\n  ls          - List local folder files\n  cat <file>  - Output contents of a file (try config.xml)\n  whoami      - Print active user identity\n  neofetch    - Show platform and kernel architecture\n  date        - Print current clock time\n  clear       - Wipe the prompt terminal screen\n  ping        - Send latency packets to Zaby cluster core";
        break;
      case "ls":
        responseText = "config.xml\nplugins/\nworkspace/\ncredentials.xml";
        break;
      case "cat config.xml":
        responseText = `<?xml version='1.1' encoding='UTF-8'?>\n<zaby-configuration>\n  <sandbox-id>${sandboxId}</sandbox-id>\n  <tenant-name>${tenantId}</tenant-name>\n  <node-lifecycle auto-stop="30" auto-archive="7" />\n  <resources cpu="2" memory="4096" storage="5120" />\n</zaby-configuration>`;
        break;
      case "cat credentials.xml":
        responseText = "Access Denied: encrypted Jenkins credential storage node.";
        break;
      case "whoami":
        responseText = "jenkins";
        break;
      case "date":
        responseText = new Date().toLocaleString();
        break;
      case "ping":
        responseText = `PING zaby.ai (104.21.36.19) 56(84) bytes of data.\n64 bytes from 104.21.36.19: icmp_seq=1 ttl=56 time=3.82 ms\n64 bytes from 104.21.36.19: icmp_seq=2 ttl=56 time=4.11 ms\n64 bytes from 104.21.36.19: icmp_seq=3 ttl=56 time=4.05 ms\n--- zaby.ai ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2004ms\nrtt min/avg/max/mdev = 3.82/3.99/4.11/0.12 ms`;
        break;
      case "clear":
        setTerminalHistory([{ type: "output", text: "bash • /var/jenkins_home $ " }]);
        return;
      case "neofetch":
        responseText = `
   /\\_/\\      zaby@jenkins-node-cluster
  ( o.o )     -------------------------
   > ^ <      OS: Zaby WorkOS Linux v4.0.0
              Kernel: 6.1.0-21-amd64
              Uptime: 2 hours, 14 mins
              Packages: 842 (apt)
              Shell: bash 5.2.15
              CPU: Virtual Core Core-i9 (2)
              Memory: 1.82 GB / 4.00 GB (45%)
        `;
        break;
      default:
        if (lowerCmd.startsWith("cat ")) {
          responseText = `cat: ${cleanCmd.substring(4)}: No such file or directory`;
        } else {
          responseText = `bash: command not found: ${cleanCmd}. Type 'help' for available commands.`;
        }
        break;
    }

    // Append response text and prepare next prompt line
    newHistory.push({ type: "output", text: responseText });
    newHistory.push({ type: "output", text: "bash • /var/jenkins_home $ " });

    setTerminalHistory(newHistory);
  };

  // Operational Start/Stop transitions
  const handleToggleSandbox = () => {
    if (sandboxState === "Stopped") {
      setSandboxState("Restarting");
      setTimeout(() => {
        setSandboxState("Running");
      }, 1200);
    } else {
      setSandboxState("Stopping");
      setVncState("stopped");
      setTimeout(() => {
        setSandboxState("Stopped");
      }, 1200);
    }
  };

  // VNC functions
  const handleStartVnc = () => {
    if (sandboxState !== "Running" || vncState !== "stopped") return;
    setVncState("booting");
    setTimeout(() => {
      setVncState("running");
    }, 1500);
  };

  const handleStopVnc = () => {
    setVncState("stopped");
  };

  const handleRefreshVnc = () => {
    if (vncState !== "running") return;
    setIsVncReconnecting(true);
    setTimeout(() => {
      setIsVncReconnecting(false);
    }, 1000);
  };

  const toggleWindow = (id: string, state: boolean) => {
    setActiveWindows(prev => prev.map(win => win.id === id ? { ...win, isOpen: state } : win));
  };

  return (
    <div className={`w-full font-sans p-6 rounded-3xl border transition-all duration-500 select-none bg-white/70 border-slate-200 text-slate-700 shadow-2xl shadow-slate-200/40`}>
      
      {/* ================= HEADER SECTION ================= */}
      <header className={`flex justify-between items-center mb-6 pb-4 border-b transition-colors duration-500 border-slate-200`}>
        <div className="flex items-center space-x-3">
          <img src="/zaby-logo-black.png" alt="Zaby Logo" className="h-4 w-auto object-contain select-none pointer-events-none" />
          <span className="text-gray-300 select-none">|</span>
          <h1 className={`text-xs font-mono font-medium tracking-tight truncate max-w-[180px] sm:max-w-none transition-colors text-slate-600`}>
            {tenantId}
          </h1>
          <span className={`px-1.5 py-0.5 text-[8px] font-mono border rounded uppercase tracking-wider transition-colors border-slate-200 bg-slate-100 text-slate-600`}>
            Free
          </span>
          <span className="text-xs text-gray-500 hidden sm:inline">us • jenkins</span>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <span className={`flex items-center font-medium ${
            sandboxState === "Running" ? "text-green-500" :
            sandboxState === "Stopped" ? "text-gray-500" : "text-yellow-500"
          }`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${
              sandboxState === "Running" ? "bg-green-500 animate-pulse" :
              sandboxState === "Stopped" ? "bg-gray-500" : "bg-yellow-500 animate-spin border border-yellow-600 border-t-transparent"
            }`} />
            {sandboxState === "Running" ? "Ready" :
             sandboxState === "Stopped" ? "Stopped" :
             sandboxState === "Stopping" ? "Stopping..." : "Starting..."}
          </span>
          <span className="text-gray-500 hidden sm:inline">Updated 5/19/2026</span>
          <button className="text-gray-500 hover:text-white transition-colors">🗑</button>
        </div>
      </header>

      {/* ================= SPLIT CONTENT ================= */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className={`w-full lg:w-56 flex flex-col gap-6 pr-2 lg:border-r transition-colors duration-500 lg:border-slate-200`}>
          
          <section>
            <h2 className="text-[9px] tracking-widest text-gray-500 mb-3 uppercase font-semibold">Sandbox Details</h2>
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between"><span className="text-gray-500">ID</span><span className={`font-mono truncate max-w-[80px] transition-colors text-slate-800`} title={sandboxId}>{sandboxId.substring(0, 8)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Snapshot</span><span className={`transition-colors text-slate-800`}>jenkins</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Preview access</span><span className={`transition-colors text-slate-800`}>Private</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Created</span><span className={`transition-colors text-slate-800`}>5/16/2026</span></div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last event</span>
                <span className={`text-right truncate max-w-[100px] transition-colors text-slate-800`} title={sandboxState === "Stopped" ? "State synced to stopped" : "State synced to active"}>
                  {sandboxState === "Stopped" ? "State synced to stopped" : "State synced to active"}
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[9px] tracking-widest text-gray-500 mb-3 uppercase font-semibold">Resources</h2>
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between"><span className="text-gray-500">CPU</span><span className={`transition-colors text-slate-800`}>2 cores</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Memory</span><span className={`transition-colors text-slate-800`}>4 GB</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Storage</span><span className={`transition-colors text-slate-800`}>5 GB</span></div>
            </div>
          </section>

          <section>
            <h2 className="text-[9px] tracking-widest text-gray-500 mb-3 uppercase font-semibold">Lifecycle</h2>
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between"><span className="text-gray-500">Auto-stop</span><span className={`transition-colors text-slate-800`}>30 min</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Auto-archive</span><span className={`transition-colors text-slate-800`}>7 days</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Auto-delete</span><span className={`transition-colors text-slate-800`}>Manual</span></div>
            </div>
          </section>

          <section>
            <h2 className="text-[9px] tracking-widest text-gray-500 mb-3 uppercase font-semibold">SSH Access</h2>
            <div className="flex justify-between items-center text-[10px]">
              <span className={`transition-colors text-slate-600`}>Not configured</span>
              <button className={`px-2.5 py-1 text-[9px] font-bold rounded-lg transition-colors bg-slate-900 hover:bg-slate-800 text-white`}>
                Manage
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-[9px] tracking-widest text-gray-500 mb-3 uppercase font-semibold">Labels</h2>
            <div className="flex flex-col gap-1.5">
              <span className={`px-2 py-0.5 border rounded text-[9px] font-mono w-fit truncate max-w-full transition-colors border-slate-200 bg-slate-100 text-slate-600`}>
                zabySource: marketplace_snapshot
              </span>
              <span className={`px-2 py-0.5 border rounded text-[9px] font-mono w-fit truncate max-w-full transition-colors border-slate-200 bg-slate-100 text-slate-600`} title={`zabyTenantId: ${tenantId.substring(0, 15)}`}>
                zabyTenantId: {tenantId.substring(0, 12)}
              </span>
              <span className={`px-2 py-0.5 border rounded text-[9px] font-mono w-fit truncate max-w-full transition-colors border-slate-200 bg-slate-100 text-slate-600`}>
                zabySandboxKey: primary
              </span>
            </div>
          </section>
        </aside>

        {/* ================= RIGHT WORK AREA ================= */}
        <main className="flex-1 flex flex-col min-w-0">
          
          {/* Main Controls Navbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className={`flex space-x-1 p-1 rounded-full border select-none transition-colors duration-500 bg-slate-100 border-slate-200/80`}>
              {["Logs", "Traces", "Metrics", "Terminal", "Filesystem", "VNC"].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setTerminalTab(tab)}
                  className={`px-4 py-1 text-xs rounded-full transition-all ${
                    tab === terminalTab 
                      ? ("bg-slate-900 text-white font-semibold shadow-md") 
                      : ("text-slate-500 hover:text-slate-900")
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Top-Right Start/Stop Toolbar button */}
            <div>
              <button 
                onClick={handleToggleSandbox}
                disabled={sandboxState === "Stopping" || sandboxState === "Restarting"}
                className={`px-5 py-1 text-xs font-bold rounded-lg transition-all flex items-center shadow-lg border ${
                  sandboxState === "Running"
                    ? ("bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 animate-none")
                    : ("bg-slate-900 hover:bg-slate-800 text-white border-transparent")
                }`}
              >
                <span className="mr-1.5 text-[8px]">{sandboxState === "Running" ? "⏸" : "▶"}</span>
                {sandboxState === "Running" ? "Stop" : "Start"}
              </button>
            </div>
          </div>

          {/* ================= TAB SPECIFIC VIEWPORTS ================= */}
          {terminalTab === "VNC" ? (
            /* ================= VNC DESKTOP CONTAINER ================= */
            <div className="flex flex-col flex-1">
              
              {/* Titlebar of VNC */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xs font-semibold text-slate-800 uppercase tracking-wider font-mono">Remote Desktop</h2>
                  <p className="text-[10px] text-gray-500 leading-normal mt-0.5">
                    Manage the Daytona VNC stack and prepare this sandbox for browser-based desktop access.
                  </p>
                </div>
                
                {/* VNC Controls */}
                <div className="flex items-center space-x-2 select-none self-end sm:self-auto">
                  <button 
                    onClick={handleRefreshVnc}
                    disabled={sandboxState !== "Running" || vncState !== "running"}
                    className="px-3 py-1 text-[10px] bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center disabled:opacity-30"
                  >
                    <span className="mr-1 text-[9px]">⟳</span> Refresh
                  </button>
                  <button 
                    onClick={handleStartVnc}
                    disabled={sandboxState !== "Running" || vncState !== "stopped"}
                    className="px-3 py-1 text-[10px] bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors flex items-center disabled:opacity-30"
                  >
                    <span className="mr-1.5 text-[8px]">▶</span> Start VNC
                  </button>
                  <button 
                    onClick={handleStopVnc}
                    disabled={sandboxState !== "Running" || vncState === "stopped"}
                    className="px-3 py-1 text-[10px] bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center disabled:opacity-30"
                  >
                    <span className="mr-1.5 text-[8px]">⏹</span> Stop VNC
                  </button>
                </div>
              </div>

              {/* Status Pill Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-[9px] select-none font-mono">
                <span className={`px-2 py-0.5 rounded-full border ${
                  sandboxState === "Running" 
                    ? "border-green-500/20 bg-green-500/5 text-green-600" 
                    : "border-orange-500/20 bg-orange-500/5 text-orange-600"
                }`}>
                  {sandboxState === "Running" ? "Runtime active" : "Runtime stopped"}
                </span>
                <span className={`px-2 py-0.5 rounded-full border ${
                  vncState === "running" ? "border-green-500/20 bg-green-500/5 text-green-600" : "border-slate-300 bg-slate-100 text-slate-500"
                }`}>
                  VNC {vncState}
                </span>
                <span className="text-gray-500">Collected: 5/19/2026, 11:55:58 AM</span>
              </div>

              {/* Orange Stopped Warning Banner (Exact replica) */}
              {sandboxState !== "Running" && (
                <div className="w-full px-4 py-2 border border-orange-500/20 bg-orange-500/5 text-orange-600/90 rounded-lg text-[10px] font-medium mb-4 flex items-center">
                  <span className="mr-2">⚠️</span> Sandbox runtime is stopped. Start the sandbox to access the desktop interface.
                </div>
              )}

              {/* Screen Viewport Frame */}
              <div className="flex-1 min-h-[380px] bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col relative">
                
                {/* 1. STATE: Sandbox Inactive / Not Ready */}
                {sandboxState !== "Running" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 select-none bg-slate-50">
                    <span className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 mb-4 shadow-xl">
                      <span className="text-gray-500 text-lg">🖥️</span>
                    </span>
                    <h3 className="text-slate-800 text-sm font-semibold mb-1">Sandbox runtime is not ready</h3>
                    <p className="text-slate-500 text-[10px] max-w-[280px] leading-relaxed">
                      Start the sandbox from the toolbar first. Once the runtime is active, you can start the Daytona VNC stack here.
                    </p>
                  </div>
                )}

                {/* 2. STATE: Sandbox Running, VNC Stopped */}
                {sandboxState === "Running" && vncState === "stopped" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 select-none bg-slate-50">
                    <span className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 mb-4 shadow-xl">
                      <span className="text-blue-500 text-lg">🖥️</span>
                    </span>
                    <h3 className="text-slate-800 text-sm font-semibold mb-1">Daytona VNC is ready</h3>
                    <p className="text-slate-500 text-[10px] max-w-[280px] leading-relaxed">
                      Click the Start VNC button above to boot up the virtual desktop interface.
                    </p>
                  </div>
                )}

                {/* 3. STATE: VNC Booting */}
                {sandboxState === "Running" && vncState === "booting" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20 select-none">
                    <div className="text-center space-y-4">
                      {/* CSS Spinner */}
                      <span className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin block mx-auto" />
                      <p className="text-[10px] text-blue-600 font-mono tracking-widest uppercase">Connecting tty desktop stack...</p>
                    </div>
                  </div>
                )}

                {/* 4. STATE: VNC Desktop Running (Interactive Windows 11 Sandbox) */}
                {sandboxState === "Running" && vncState === "running" && (
                  <div className="absolute inset-0 w-full h-full flex flex-col bg-slate-950 font-sans z-10 select-none">
                    
                    {/* Reconnect overlay spinner */}
                    {isVncReconnecting && (
                      <div className="absolute inset-0 bg-black/75 z-45 flex items-center justify-center">
                        <span className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}

                    {/* Desktop Workspace Screen with Windows 11 Bloom Wallpaper */}
                    <div 
                      className="flex-1 w-full relative overflow-hidden" 
                      style={{
                        backgroundImage: `url(${windowsWallpaper.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    >
                      {/* Interactive Desktop Icons */}
                      <div className="absolute left-4 top-4 flex flex-col gap-5 text-center text-[8px] text-white/90">
                        <div 
                          className="w-12 flex flex-col items-center gap-1 cursor-pointer hover:bg-white/5 p-1 rounded transition-colors"
                          onDoubleClick={() => toggleWindow("notepad", true)}
                        >
                          <span className="text-lg">📁</span>
                          <span className="truncate w-full leading-normal">Welcome</span>
                        </div>
                        <div 
                          className="w-12 flex flex-col items-center gap-1 cursor-pointer hover:bg-white/5 p-1 rounded transition-colors"
                          onDoubleClick={() => toggleWindow("cmd", true)}
                        >
                          <span className="text-lg">💻</span>
                          <span className="truncate w-full leading-normal">Terminal</span>
                        </div>
                      </div>

                      {/* Interactive Floating Desktop Windows */}
                      {activeWindows.map((win) => {
                        if (!win.isOpen) return null;
                        return (
                          <div 
                            key={win.id}
                            className={`absolute w-[240px] rounded-lg overflow-hidden border border-white/10 shadow-2xl z-30 flex flex-col bg-slate-950 ${
                              win.id === "notepad" ? "left-12 top-12" : "right-12 top-20"
                            }`}
                          >
                            {/* App title bar */}
                            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-white/5 text-[9px] text-gray-400">
                              <span>{win.title}</span>
                              <button 
                                onClick={() => toggleWindow(win.id, false)}
                                className="w-3.5 h-3.5 flex items-center justify-center rounded hover:bg-red-500/80 hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                            {/* App workspace */}
                            <div className="h-[140px] overflow-hidden select-text">
                              {win.content}
                            </div>
                          </div>
                        );
                      })}

                    </div>

                    {/* Centered Translucent Taskbar */}
                    <div className="w-full bg-slate-950/70 border-t border-white/5 backdrop-blur-md px-3 py-1 flex items-center justify-between select-none">
                      <div className="text-[8px] text-gray-500 font-mono">Windows Active</div>
                      
                      {/* Taskbar Icons group */}
                      <div className="flex items-center space-x-2.5">
                        <button 
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/5 text-xs transition-colors"
                          title="Start Menu"
                        >
                          🟦
                        </button>
                        <button 
                          onClick={() => toggleWindow("cmd", true)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/5 text-xs transition-colors"
                          title="Command Prompt"
                        >
                          💻
                        </button>
                        <button 
                          onClick={() => toggleWindow("notepad", true)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/5 text-xs transition-colors"
                          title="Notepad"
                        >
                          📝
                        </button>
                      </div>

                      {/* System Tray time */}
                      <div className="text-[8px] text-gray-400 font-mono tracking-wide flex items-center gap-1.5">
                        <span>11:58 AM</span>
                        <span>📶</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>
          ) : (
            /* ================= STANDARDIZED CLI & FILE VIEWPORTS ================= */
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col min-h-[360px] relative shadow-sm">
              
              {/* Box Top Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-[9px] font-mono select-none">
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-600 font-bold tracking-widest uppercase">{terminalTab.toUpperCase()}</span>
                  <span className="text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    bash • /var/jenkins_home
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <span className={`${
                    sandboxState === "Running" 
                      ? "text-green-600 border border-green-500/20 bg-green-500/5" 
                      : "text-red-500 border border-red-500/20 bg-red-500/5"
                  } px-1.5 py-0.2 rounded`}>
                    {sandboxState === "Running" ? "Connected" : "Disconnected"}
                  </span>
                </div>
              </div>

              {/* Inner content stream */}
              <div className="flex-1 p-4 font-mono text-[10px] text-gray-500 relative overflow-y-auto leading-relaxed select-text min-h-[300px]">
                {sandboxState !== "Running" ? (
                  /* Screen overlay when stopped */
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[1px] select-none z-10">
                    <div className="bg-white border border-slate-200 p-5 rounded-xl text-center shadow-xl max-w-[260px] w-full mx-4">
                      <span className="text-red-500 text-lg block mb-1">⏹</span>
                      <h3 className="text-slate-800 text-xs font-semibold mb-1">Sandbox is Stopped</h3>
                      <p className="text-slate-500 text-[9px] mb-4">The core cluster runtime is currently offline. Start the sandbox to connect.</p>
                      <button 
                        onClick={handleToggleSandbox}
                        className="w-full px-3 py-1.5 bg-green-500 text-black text-[10px] font-bold rounded hover:bg-green-400 transition-colors"
                      >
                        Start Sandbox
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* State: Booting / Restarting overlay */}
                {(sandboxState === "Stopping" || sandboxState === "Restarting") && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/85 select-none z-20">
                    <div className="text-center space-y-2">
                      <span className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin block mx-auto" />
                      <span className="text-[10px] text-blue-600 font-mono tracking-widest uppercase">
                        {sandboxState === "Stopping" ? "Stopping node..." : "Rebooting Cluster..."}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab content logic */}
                {terminalTab === "Logs" && (
                  <div className="space-y-1.5 text-gray-500">
                    <p className="text-gray-600">[2026-05-19 11:52:04] INFO: node synchronization request received</p>
                    <p className="text-gray-600">[2026-05-19 11:52:05] INFO: active session matched for {sessionId.substring(0, 12)}</p>
                    <p className="text-blue-500">[2026-05-19 11:52:06] DEBUG: {tenantId.substring(0, 15)} CPU throttle 0.05%</p>
                    <p className="text-gray-600">[2026-05-19 11:52:08] INFO: waiting for secure websocket handshake...</p>
                  </div>
                )}

                {terminalTab === "Traces" && (
                  <div className="space-y-1 text-blue-500">
                    <p className="text-gray-600">GET /api/v1/sandbox/{tenantId.substring(0, 15)} - 200 OK (14ms)</p>
                    <p className="text-gray-600">POST /api/v1/terminal/reconnect - 101 Switching Protocols (4ms)</p>
                    <p className="text-gray-500">WS /stream/{sessionId.substring(0, 12)} - [CONNECTED]</p>
                    <p className="text-blue-500">└─ trace_id: 8b07e2c94982aef1</p>
                  </div>
                )}

                {terminalTab === "Metrics" && (
                  <div className="space-y-3.5 font-sans text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>CPU UTILIZATION</span>
                        <span className="text-slate-800">12.4%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded overflow-hidden">
                        <div className="w-[12.4%] h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>MEMORY WORKSET</span>
                        <span className="text-slate-800">1.82 GB / 4.00 GB</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded overflow-hidden">
                        <div className="w-[45.5%] h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>NETWORK THROUGHPUT</span>
                        <span className="text-slate-800">2.4 MBps</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded overflow-hidden">
                        <div className="w-[30%] h-full bg-blue-400" />
                      </div>
                    </div>
                  </div>
                )}

                {terminalTab === "Filesystem" && (
                  <div className="space-y-2 text-gray-400 text-[10px]">
                    <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                      <span>📁</span> <span>/var/jenkins_home</span>
                    </div>
                    <div className="pl-4 space-y-1.5">
                      <div className="text-slate-700">📄 config.xml <span className="text-gray-400 ml-2">(4.2 KB)</span></div>
                      <div className="text-slate-700">📁 plugins <span className="text-blue-500 ml-2">[12 items]</span></div>
                      <div className="text-slate-700">📁 workspace <span className="text-gray-400 ml-2">[empty]</span></div>
                      <div className="text-slate-700">📄 credentials.xml <span className="text-gray-400 ml-2">(1.8 KB)</span></div>
                    </div>
                  </div>
                )}

                {terminalTab === "Terminal" && (
                  /* ================= INTERACTIVE TERMINAL STREAM ================= */
                  <div className="space-y-1 select-text">
                    {terminalHistory.map((log, index) => {
                      if (log.type === "input") {
                        return <p key={index} className="text-slate-800 font-mono">{log.text}</p>;
                      } else if (log.type === "system") {
                        return <p key={index} className="text-blue-600 font-mono">{log.text}</p>;
                      } else {
                        // For prompt ending line, render form input
                        const isLastPromptLine = index === terminalHistory.length - 1 && log.text.endsWith("$ ");
                        if (isLastPromptLine) {
                          return (
                            <TerminalInput
                              key={index}
                              onSubmit={handleCommandSubmit}
                              disabled={sandboxState !== "Running"}
                              promptText={log.text}
                            />
                          );
                        }
                        return (
                          <pre key={index} className="text-gray-400 font-mono whitespace-pre-wrap leading-relaxed">
                            {log.text}
                          </pre>
                        );
                      }
                    })}

                    <div ref={terminalEndRef} />
                  </div>
                )}
              </div>

              {/* Box Footer bar */}
              <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 text-[8.5px] text-slate-500 flex justify-between items-center font-mono select-none">
                <span>Sandbox: {tenantId.substring(0, 18)}</span>
                <span>Session: {sessionId.substring(0, 18)}</span>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
