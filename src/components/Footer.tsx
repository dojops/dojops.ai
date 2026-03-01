import Image from "next/image";
import { LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/official-dojops-icon.png"
              alt="DojOps"
              width={24}
              height={24}
            />
            <span className="font-bold text-text-primary">DojOps</span>
          </div>
          <p className="text-text-secondary text-sm">
            AI DevOps Automation Engine
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-text-primary">Links</h4>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
          >
            GitHub
          </a>
          <a
            href={LINKS.npm}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
          >
            npm
          </a>
          <a
            href={LINKS.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
          >
            Documentation
          </a>
          <a
            href={LINKS.hub}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
          >
            Tool Hub
          </a>
        </div>

        {/* Attribution */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-text-primary">Legal</h4>
          <p className="text-sm text-text-secondary">
            MIT License
          </p>
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} DojOps
          </p>
        </div>
      </div>
    </footer>
  );
}
