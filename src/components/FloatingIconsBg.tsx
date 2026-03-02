/* eslint-disable @next/next/no-img-element */

/**
 * Each icon placement: tool file, position (%), size, rotation, opacity, animation variant + duration.
 * Hand-tuned for balanced visual distribution — no clustering, no overlap with content focal points.
 */
const ICONS = [
  // Top region
  { src: "terraform.svg", top: 4, left: 8, size: 28, r: -15, o: 0.035, anim: 1, dur: 38 },
  { src: "kubernetes.svg", top: 7, left: 78, size: 32, r: 12, o: 0.04, anim: 2, dur: 44 },
  { src: "docker.svg", top: 12, left: 42, size: 24, r: -8, o: 0.03, anim: 3, dur: 50 },
  { src: "github-actions.svg", top: 3, left: 92, size: 22, r: 20, o: 0.03, anim: 1, dur: 42 },

  // Upper-mid
  { src: "helm.svg", top: 18, left: 15, size: 26, r: 10, o: 0.035, anim: 2, dur: 46 },
  { src: "ansible.svg", top: 22, left: 88, size: 30, r: -20, o: 0.04, anim: 3, dur: 36 },
  { src: "nginx.svg", top: 16, left: 62, size: 20, r: 5, o: 0.025, anim: 1, dur: 52 },

  // Middle
  { src: "prometheus.svg", top: 32, left: 5, size: 24, r: -12, o: 0.035, anim: 3, dur: 40 },
  { src: "gitLab.svg", top: 35, left: 95, size: 26, r: 18, o: 0.03, anim: 2, dur: 48 },
  { src: "makefile.svg", top: 38, left: 48, size: 20, r: -25, o: 0.025, anim: 1, dur: 54 },
  { src: "systemd.svg", top: 30, left: 72, size: 22, r: 8, o: 0.03, anim: 3, dur: 42 },

  // Lower-mid
  { src: "terraform.svg", top: 48, left: 22, size: 22, r: 15, o: 0.03, anim: 2, dur: 46 },
  { src: "docker.svg", top: 52, left: 82, size: 28, r: -10, o: 0.035, anim: 1, dur: 38 },
  { src: "kubernetes.svg", top: 55, left: 55, size: 20, r: 22, o: 0.025, anim: 3, dur: 50 },

  // Lower
  { src: "helm.svg", top: 64, left: 10, size: 26, r: -18, o: 0.035, anim: 1, dur: 44 },
  { src: "github-actions.svg", top: 68, left: 70, size: 24, r: 14, o: 0.03, anim: 2, dur: 40 },
  { src: "ansible.svg", top: 62, left: 90, size: 20, r: -5, o: 0.025, anim: 3, dur: 52 },
  { src: "nginx.svg", top: 72, left: 38, size: 22, r: 10, o: 0.03, anim: 1, dur: 48 },

  // Bottom
  { src: "prometheus.svg", top: 80, left: 18, size: 24, r: -22, o: 0.035, anim: 2, dur: 36 },
  { src: "gitLab.svg", top: 84, left: 60, size: 26, r: 8, o: 0.03, anim: 3, dur: 44 },
  { src: "makefile.svg", top: 78, left: 85, size: 20, r: -15, o: 0.025, anim: 1, dur: 50 },
  { src: "systemd.svg", top: 88, left: 45, size: 22, r: 18, o: 0.03, anim: 2, dur: 42 },
  { src: "terraform.svg", top: 92, left: 8, size: 20, r: -8, o: 0.025, anim: 3, dur: 46 },
  { src: "docker.svg", top: 95, left: 75, size: 24, r: 12, o: 0.03, anim: 1, dur: 40 },
];

export default function FloatingIconsBg() {
  return (
    <div
      className="hidden md:block fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {ICONS.map((icon, i) => (
        <div
          key={i}
          className="floating-icon"
          style={{
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            width: icon.size,
            height: icon.size,
            opacity: icon.o,
            ["--r" as string]: `${icon.r}deg`,
            transform: `rotate(${icon.r}deg)`,
            animationName: `drift-${icon.anim}`,
            animationDuration: `${icon.dur}s`,
          }}
        >
          <img
            src={`/icons/tools/${icon.src}`}
            alt=""
            width={icon.size}
            height={icon.size}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
