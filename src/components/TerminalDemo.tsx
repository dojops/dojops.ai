import { TERMINAL_LINES } from "@/lib/constants";

export default function TerminalDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-glass-border bg-[#080b12] shadow-[0_0_80px_rgba(0,229,255,0.04)]">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0c1018] border-b border-glass-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="ml-3 text-[11px] text-text-secondary/50 font-mono tracking-wider uppercase">
          dojops
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 sm:p-6 font-mono text-[13px] leading-relaxed overflow-x-auto text-left">
        {TERMINAL_LINES.map((line, i) => {
          const delay = `${0.5 + i * 0.35}s`;

          if (line.text === "") {
            return (
              <div key={line.id} className="terminal-line h-4" style={{ animationDelay: delay }} />
            );
          }

          let colorClass = "text-text-secondary/70";
          if (line.type === "prompt") colorClass = "text-text-primary";
          if (line.type === "success") colorClass = "text-emerald-400/90";
          if (line.type === "task") colorClass = "text-text-secondary/90";
          if (line.type === "done") colorClass = "text-neon-cyan font-medium";

          return (
            <div
              key={line.id}
              className={`terminal-line ${colorClass} whitespace-pre`}
              style={{ animationDelay: delay }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
