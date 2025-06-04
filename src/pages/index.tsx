import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  name: string;
  dateCreated: string;
  description: string;
  progress: number; status: "active" | "inactive" | "completed" | "cancelled"; devstatus: string;
  files: number; contributors: number;
  image: string; link: string;
}

const mockProjects: Project[] = [
  {
    id: 0,
    name: "Error Dev's Grave",
    dateCreated: "13/03/2025 10:57",
    description: "Error Dev's current website.",
    progress: 90, status: "active", devstatus: "published",
    files: 32, contributors: 1,
    image: "", link: "https://github.com/devicals/devicals.github.io"
  },
  {
    id: 1,
    name: "AI Teaching Master",
    dateCreated: "26/01/2025 13:04",
    description: "Advanced AI monitoring system with real-time neural network visualization and performance metrics.",
    progress: 100, status: "completed", devstatus: "beta_release",
    files: 11, contributors: 2,
    image: "", link: "https://github.com/devicals/AI-Teaching-Master"
  },
  {
    id: 2,
    name: "Money Maker Hacked",
    dateCreated: "08/05/2024 13:39",
    description: "The chromium extension clicker game 'Make Money', but hacked by yours truly, Error Dev!",
    progress: 37, status: "active", devstatus: "update_indev",
    files: 19, contributors: 1,
    image: "https://lh3.googleusercontent.com/-tr3qvBjEwqUGTs4-iJDbXNzyYkzPU90m3CPy0_OAFMoOWx_48XwkA1C_IiTuKlTZXQntLochlx-4QFTWkIOhY69_Q=s1280-w1280-h800", link: "https://github.com/devicals/money-maker-hacked"
  },
  {
    id: 3,
    name: "Custom URL Redirect Generator",
    dateCreated: "01/05/2025",
    description: "A tool to help you create URL redirection links for your website.",
    progress: 100, status: "completed", devstatus: "released",
    files: 1, contributors: 1,
    image: "https://neocities.org/site_screenshots/27/45/error-dev/url-shortens.html.540x405.webp", link: "https://error-dev.neocities.org/url-shortens"
  },
  {
    id: 4,
    name: "Drive File Direct Download URL Generator",
    dateCreated: "01/05/2025",
    description: "A tool to help you create file download links for your drive files.",
    progress: 100, status: "completed", devstatus: "released",
    files: 1, contributors: 0,
    image: "https://neocities.org/site_screenshots/27/45/error-dev/download-gen.html.540x405.webp", link: "https://error-dev.neocities.org/download-gen"
  },
  {
    id: 5,
    name: "Startpage",
    dateCreated: "07/06/2023 21:18",
    description: "A custom startpage/new tab page. Forked from https://gitlab.com/fazzi/startpage.",
    progress: 100, status: "completed", devstatus: "released",
    files: 5, contributors: 4,
    image: "https://raw.githubusercontent.com/devicals/startpage/refs/heads/main/preview.webp", link: "https://github.com/devicals/startpage"
  },
  {
    id: 6,
    name: "MBC Entries",
    dateCreated: "09/05/2025 10:43",
    description: "A repository for my entries for Leon's Monthly Build Challenge. ",
    progress: 1, status: "active", devstatus: "open_forever",
    files: 2, contributors: 1,
    image: "", link: "https://github.com/devicals/MBC-Entries"
  },
  {
    id: 7,
    name: "Dev's Web",
    dateCreated: "30/06/2024 09:29",
    description: "A past version of Error Dev's website which is now archived.",
    progress: 100, status: "cancelled", devstatus: "archived",
    files: 10, contributors: 1,
    image: "", link: "https://github.com/devicals/profile"
  },
  {
    id: 8,
    name: "Cube Dimensions Website",
    dateCreated: "07/06/2023 09:18",
    description: "A website made for Cube Dimensions. Now archived as Cube Dimensions has ended.",
    progress: 100, status: "cancelled", devstatus: "archived",
    files: 5, contributors: 1,
    image: "", link: "https://github.com/devicals/cube-dimensions"
  },
  {
    id: 9,
    name: "Chemistry Card Game",
    dateCreated: "10/05/2025 13:33",
    description: "For a school project.",
    progress: 100, status: "completed", devstatus: "published",
    files: 4, contributors: 1,
    image: "", link: "https://github.com/devicals/Chemistry-Card-Game"
  },
  {
    id: 10,
    name: "Higher or Lower Chemical Processes",
    dateCreated: "27/03/2025 20:06",
    description: "For a school project.",
    progress: 100, status: "completed", devstatus: "published",
    files: 4, contributors: 1,
    image: "", link: "https://github.com/devicals/Higher-or-Lower-Chemical-Processes"
  },
  {
    id: 11,
    name: "States of Matter Memory Game",
    dateCreated: "26/03/2025 20:59",
    description: "For a school project.",
    progress: 100, status: "completed", devstatus: "published",
    files: 4, contributors: 1,
    image: "", link: "https://github.com/devicals/States-of-Matter-Memory-Game"
  }
];

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalText, setTerminalText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authStep, setAuthStep] = useState("initial");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTerminal, authStep]);

  // Replace your existing state and functions with these:
  
  // Change from terminalText to terminalContent
  const [terminalContent, setTerminalContent] = useState<Array<{text: string, style?: string}>>([]);
  
  // Updated typewriterEffect function
  const typewriterEffect = (segments: Array<{text: string, style?: string}>, callback?: () => void) => {
    setTerminalContent([]);
    
    // Flatten all segments into one string to calculate total length
    const fullText = segments.map(seg => seg.text).join('');
    let currentLength = 0;
    
    const timer = setInterval(() => {
      currentLength++;
      
      // Build content up to current length
      const currentContent: Array<{text: string, style?: string}> = [];
      let processedLength = 0;
      
      for (const segment of segments) {
        const segmentStart = processedLength;
        const segmentEnd = processedLength + segment.text.length;
        
        if (currentLength > segmentStart) {
          const visibleLength = Math.min(currentLength - segmentStart, segment.text.length);
          currentContent.push({
            text: segment.text.slice(0, visibleLength),
            style: segment.style
          });
        }
        
        processedLength += segment.text.length;
        if (processedLength >= currentLength) break;
      }
      
      setTerminalContent(currentContent);
      
      if (currentLength >= fullText.length) {
        clearInterval(timer);
        if (callback) callback();
      }
    }, 10);
    
    return timer;
  };
  
  useEffect(() => {
    if (showTerminal && authStep === "initial") {
      typewriterEffect([
        {text: "| ", style: "text-[#DAA520]"}, {text: "Confidential Information\n", style: "text-white"},
        {text: "| ", style: "text-[#DAA520]"}, {text: "Please confirm authentication\n", style: "text-white"}
      ]);
    }
  }, [showTerminal, authStep]);
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") {
      setAuthStep("success");
      typewriterEffect([
        {text: "# "}, {text: "Authenticating...\n", style: "text-white"},
        {text: "# "}, {text: "Password check returned ", style: "text-white"},
        {text: "true", style: "text-green-500"},
        {text: "\n| "}, {text: "Welcome back...\n", style: "text-white"}
      ], () => {
        setTimeout(() => {
          setShowTerminal(false);
          setIsAuthenticated(true);
        }, 1000);
      });
    } else {
      setAuthStep("failed");
      typewriterEffect([
        {text: "# "}, {text: "Authenticating...\n", style: "text-white"},
        {text: "# "}, {text: "Password check returned ", style: "text-white"},
        {text: "false", style: "text-red-500"},
        {text: "\n| "}, {text: "Please re-authenticate your access.\n", style: "text-white"}
      ]);
      setPassword("");
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (showTerminal) {
    return (
      <>
        <Head>
          <title>Secure Terminal Access</title>
          <meta name="description" content="Secure Authentication Terminal" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/6404/6404259.png" />
        </Head>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 terminal-bg">
          <div className="w-full max-w-4xl terminal-text font-terminal">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
              <pre className="mb-4 whitespace-pre-wrap">
                {terminalContent.map((segment, index) => (
                  <span key={index} className={segment.style || ""}>
                    {segment.text.split('\n').map((line, lineIndex, array) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                ))}
              </pre>
              {(authStep === "initial" || authStep === "failed") && (
                <div className="flex items-center">
                  <span className="terminal-cursor text-[#8e3b55]">{'>'}</span>
                  <div className="flex-1 ml-1 text-base bg-transparent border-none outline-none terminal-text font-terminal sm:text-lg md:text-xl lg:text-2xl">
                    <span className="text-[#8e3b55]">
                      {password.split('').map((_, index) => '⁎').join('')}
                      <span className="flex-1 ml-1 text-base bg-transparent border-none outline-none terminal-text font-terminal sm:text-lg md:text-xl lg:text-2xl terminal-cursor !text-[#8e3b55]">{'<'}</span>
                    </span>
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handlePasswordSubmit(e as any);
                      }
                    }}
                    className="absolute opacity-0 pointer-events-none"
                    autoComplete="off"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>PROJECT MANAGER</title>
        <meta name="description" content="[CONFIDENTIAL] Terminal User Interface Project Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-screen min-h-screen overflow-hidden tui-bg text-tui font-anka">
        {/* Sidebar */}
        <motion.div 
          ref={sidebarRef}
          initial={{ x: -300 }}
          animate={{ 
            x: sidebarCollapsed ? -sidebarWidth + 40 : 0,
            width: sidebarWidth 
          }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-col flex-shrink-0 border-r border-gray-600"
          style={{ width: sidebarWidth, height: '100vh' }}
        >
          {!sidebarCollapsed && (
            <div className="flex flex-col h-full p-2 sm:p-4">
              {/* Header Section - Fixed Height */}
              <div className="flex-shrink-0 mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-lg font-bold tui-accent sm:text-xl md:text-2xl">PROJECT_MANAGER</h1>
                </div>
                <div className="text-xs tui-text-muted sm:text-sm">v2.1.4 | SECURE_NODE</div>
              </div>

              {/* Stats Section - Fixed Height */}
              <div className="flex-shrink-0 mb-4">
                <div className="mb-2 text-xs tui-text sm:text-sm">
                  | ACTIVE_PROJECTS [{mockProjects.filter(p => p.status === "active").length}]<br/>
                  | INACTIVE_PROJECTS [{mockProjects.filter(p => p.status === "inactive").length}]<br/>
                  | COMPLETED_PROJECTS [{mockProjects.filter(p => p.status === "completed").length}]<br/>
                  | CANCELLED_PROJECTS [{mockProjects.filter(p => p.status === "cancelled").length}]<br/><br/>
                </div>
                <div className="h-px mb-4 bg-gray-600"></div>
              </div>
          
              {/* Scrollable Projects Section - Flexible Height */}
              <div className="flex-1 space-y-2 overflow-y-auto" style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
                {mockProjects.map((project) => (
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1 }}
                    key={project.id}
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProjectClick(project)}
                    className={`project-card p-2 sm:p-3 rounded cursor-pointer ${
                      selectedProject?.id === project.id ? 'active' : ''
                    }`}
                  >
                    <div className="mb-1 text-xs font-semibold truncate tui-text sm:text-sm">{project.name}</div>
                    <div className="mb-2 text-xs tui-text-muted">{project.dateCreated}</div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-700 rounded-full h-1 sm:h-1.5 mr-2">
                        <div 
                          className="tui-accent-bg h-1 sm:h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs tui-accent">{project.progress}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Resize Handle */}
          <div
            className="absolute top-0 right-0 w-px h-full cursor-col-resize"
            style={{ backgroundColor: "rgba(202, 111, 129, 0.75)" }}
            onMouseDown={handleMouseDown}
          />

          {/* Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute z-10 p-1 text-black transition-transform rounded-full top-4 -right-3 tui-accent-bg hover:scale-110"
            style={{ position: "absolute", right: -11.5, top: 22.5 }}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative flex-1 p-4 sm:p-6 md:p-8"
        >
          {selectedProject && (
            <button
              onClick={handleCloseProject}
              className="absolute z-10 p-2 transition-colors rounded top-4 right-4 tui-accent"
              title="Close Project"
            >
              <X size={20} />
            </button>
          )}

          {selectedProject ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl pr-12"
              >
                <div className="mb-4 sm:mb-6">
                  <h2 className="mb-2 text-xl font-bold tui-accent sm:text-2xl md:text-3xl">{selectedProject.name}</h2>
                  <div className="text-sm tui-text-muted sm:text-base">PROJECT_ID: {selectedProject.id.toString().padStart(4, '0')}</div>
                </div>

                <div className={`grid grid-cols-1 gap-4 mb-6 sm:gap-6 md:gap-8 sm:mb-8 ${ selectedProject.image ? 'lg:grid-cols-2' : 'lg:grid-cols-1' }`}>
                  {selectedProject.image && (
                    <div>
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.name}
                        className="object-cover w-full h-48 border border-gray-600 rounded sm:h-56 md:h-64"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <div className="mb-2 text-xs font-semibold tui-accent sm:text-sm">CREATION_TIMESTAMP</div>
                      <div className="text-sm tui-text sm:text-base">{selectedProject.dateCreated}</div>
                    </div>
                    
                    <div>
                      <div className="mb-2 text-xs font-semibold tui-accent sm:text-sm">DEVELOPMENT_PROGRESS</div>
                      <div className="flex items-center mb-2">
                        <div className="flex-1 h-2 mr-4 bg-gray-700 rounded-full sm:h-3">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedProject.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-2 rounded-full tui-accent-bg sm:h-3"
                          ></motion.div>
                        </div>
                        <span className="text-sm font-bold tui-accent sm:text-base">{selectedProject.progress}%</span>
                      </div>
                      <div className="text-xs tui-text-muted sm:text-sm">
                        STATUS: {selectedProject.devstatus.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="flex flex-row items-center gap-12 mb-6 sm:gap-12 sm:mb-8">
                      <div>
                        <div className="mb-2 text-xs font-semibold tui-accent sm:text-sm">STATUS</div>
                        <div className="text-sm tui-text sm:text-base">{selectedProject.status.toUpperCase()}</div>
                      </div>
                      <div>
                        <div className="mb-2 text-xs font-semibold tui-accent sm:text-sm">LINK</div>
                        <div className="text-sm tui-text sm:text-base">
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline transition-colors hover:hover:text-[rgb(243,127,151)]"
                          >
                            {selectedProject.link}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <div className="mb-3 text-xs font-semibold tui-accent sm:text-sm">PROJECT_DESCRIPTION</div>
                  <div className="p-3 text-sm leading-relaxed bg-black border border-gray-600 rounded tui-text sm:p-4 bg-opacity-20 sm:text-base">
                    {selectedProject.description}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="p-3 text-center border border-gray-600 rounded sm:p-4">
                    <div className="text-lg font-bold tui-accent sm:text-xl md:text-2xl">
                      {selectedProject.files}
                    </div>
                    <div className="text-xs tui-text-muted sm:text-sm">TOTAL_FILES</div>
                  </div>
                  <div className="p-3 text-center border border-gray-600 rounded sm:p-4">
                    <div className="text-lg font-bold tui-accent sm:text-xl md:text-2xl">
                      {selectedProject.contributors}
                    </div>
                    <div className="text-xs tui-text-muted sm:text-sm">CONTRIBUTORS</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center">
                <div className="mb-4 text-4xl tui-accent sm:text-5xl md:text-6xl">◉</div>
                <div className="mb-2 text-lg tui-text sm:text-xl">SELECT_PROJECT</div>
                <div className="text-sm tui-text-muted sm:text-base">Choose a project from the sidebar to view details</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}