import { TERMINAL_LINES } from "@/lib/constants";

export default function TerminalDemo() {
  return (
    <div className="terminal w-full max-w-2xl mx-auto overflow-hidden shadow-[var(--shadow-lg)]">
      {/* Terminal chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "#2A2D37", background: "#0a0d14" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="ml-3 text-[11px] tracking-wider uppercase" style={{ color: "#5A6478" }}>
          dojops
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 sm:p-6 text-[13px] leading-relaxed overflow-x-auto text-left">
        {TERMINAL_LINES.map((line, i) => {
          const delay = `${0.5 + i * 0.35}s`;

          if (line.text === "") {
            return (
              <div key={line.id} className="terminal-line h-4" style={{ animationDelay: delay }} />
            );
          }

          let colorStyle: React.CSSProperties = { color: "#8B95A8" };
          if (line.type === "prompt") colorStyle = { color: "#E8EDF5" };
          if (line.type === "success") colorStyle = { color: "#34D399" };
          if (line.type === "task") colorStyle = { color: "#8B95A8" };
          if (line.type === "done") colorStyle = { color: "#38BDF8", fontWeight: 500 };

          return (
            <div
              key={line.id}
              className="terminal-line whitespace-pre"
              style={{ ...colorStyle, animationDelay: delay }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
