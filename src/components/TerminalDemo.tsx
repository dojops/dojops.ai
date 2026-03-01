import { TERMINAL_LINES } from "@/lib/constants";

export default function TerminalDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-glass-border bg-[#0c0c14] shadow-2xl">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#12121f] border-b border-glass-border">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-text-secondary font-mono">
          dojops
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 sm:p-6 font-mono text-sm leading-relaxed overflow-x-auto">
        {TERMINAL_LINES.map((line, i) => {
          const delay = `${0.3 + i * 0.4}s`;

          if (line.text === "") {
            return (
              <div
                key={i}
                className="terminal-line h-4"
                style={{ animationDelay: delay }}
              />
            );
          }

          let colorClass = "text-text-secondary";
          if (line.type === "prompt") colorClass = "text-text-primary";
          if (line.type === "success") colorClass = "text-emerald-400";
          if (line.type === "done") colorClass = "text-neon-cyan font-bold";

          return (
            <div
              key={i}
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
