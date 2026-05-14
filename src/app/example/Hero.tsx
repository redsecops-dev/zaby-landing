"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Icon } from "@iconify/react";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type GeoPosition = [number, number];
type PolygonGeometry = { type: "Polygon"; coordinates: GeoPosition[][] };
type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: GeoPosition[][][];
};
type LandFeature = {
  type: "Feature";
  geometry: PolygonGeometry | MultiPolygonGeometry;
  properties?: Record<string, unknown> | null;
};
type LandFeatureCollection = {
  type: "FeatureCollection";
  features: LandFeature[];
};

const BRAND_ITEMS = [
  { icon: "solar:hexagon-linear", name: "ACME Corp", bold: false },
  { icon: "solar:triangle-linear", name: "VORTEX", bold: false },
  { icon: "solar:target-linear", name: "SPHERE", bold: true },
  { icon: "solar:box-linear", name: "CUBE.AI", bold: true },
  { icon: "solar:globus-linear", name: "NEXUS", bold: false },
  { icon: "solar:cpu-linear", name: "SYNAPSE", bold: false },
] as const;

const heroBackdropStyle: CSSProperties = {
  backgroundImage:
    "url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg)",
};

const gridStyle: CSSProperties = {
  backgroundSize: "40px 40px",
  backgroundImage:
    "linear-gradient(to right, var(--color-neutral), transparent 1px), linear-gradient(to bottom, var(--color-neutral), transparent 1px)",
  opacity: 0.05,
  maskImage: "radial-gradient(circle at center, black 40%, transparent 90%)",
  WebkitMaskImage:
    "radial-gradient(circle at center, black 40%, transparent 90%)",
};

const marqueeMaskStyle: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
};

function pointInRing(point: GeoPosition, ring: GeoPosition[]) {
  const [x, y] = point;
  let inside = false;

  for (
    let index = 0, previous = ring.length - 1;
    index < ring.length;
    previous = index++
  ) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[previous];

    if (
      (y1 > y) !== (y2 > y) &&
      x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1
    ) {
      inside = !inside;
    }
  }

  return inside;
}

function pointInFeature(point: GeoPosition, feature: LandFeature) {
  if (feature.geometry.type === "Polygon") {
    const [outerRing, ...holes] = feature.geometry.coordinates;

    if (!pointInRing(point, outerRing)) {
      return false;
    }

    return !holes.some((hole) => pointInRing(point, hole));
  }

  return feature.geometry.coordinates.some(([outerRing, ...holes]) => {
    if (!pointInRing(point, outerRing)) {
      return false;
    }

    return !holes.some((hole) => pointInRing(point, hole));
  });
}

function RevealWord({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <span
        className={`reveal-word inline-block translate-y-full motion-reduce:translate-y-0 ${className}`}
      >
        {children}
      </span>
    </span>
  );
}

function Globe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const loader = loaderRef.current;

    if (!container || !canvas || !loader) {
      return;
    }

    let isDisposed = false;
    let resizeObserver: ResizeObserver | undefined;
    let stopTimer: (() => void) | undefined;
    let cleanupInteraction: (() => void) | undefined;
    let resumeRotationTimeout = 0;

    void (async () => {
      const d3 = await import("d3");

      if (isDisposed) {
        return;
      }

      const context = canvas.getContext("2d", { alpha: true });

      if (!context) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let width = container.clientWidth;
      let height = container.clientHeight;
      let baseRadius = Math.min(width, height) / 2.2;
      const rotation: [number, number, number] = [0, 0, 0];
      let autoRotate = !prefersReducedMotion;
      let landData: LandFeatureCollection | null = null;
      const dots: GeoPosition[] = [];

      const projection = d3
        .geoOrthographic()
        .scale(baseRadius)
        .translate([width / 2, height / 2])
        .clipAngle(90);
      const geoPath = d3.geoPath(projection, context);

      const render = () => {
        context.clearRect(0, 0, width, height);

        const currentScale = projection.scale();
        const scaleFactor = currentScale / baseRadius;

        context.beginPath();
        context.arc(width / 2, height / 2, currentScale, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255,255,255,0.05)";
        context.lineWidth = scaleFactor;
        context.stroke();

        if (!landData) {
          return;
        }

        context.beginPath();
        geoPath(d3.geoGraticule10());
        context.strokeStyle = "rgba(255,255,255,0.03)";
        context.lineWidth = 0.5 * scaleFactor;
        context.stroke();

        context.beginPath();
        landData.features.forEach((feature) => {
          geoPath(feature);
        });
        context.strokeStyle = "rgba(255,255,255,0.1)";
        context.lineWidth = 0.8 * scaleFactor;
        context.stroke();

        context.fillStyle = "#0077B6";
        dots.forEach(([longitude, latitude]) => {
          const projected = projection([longitude, latitude]);

          if (projected) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, Math.PI * 2);
            context.fill();
          }
        });
      };

      const resize = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        baseRadius = Math.min(width, height) / 2.2;

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(devicePixelRatio, devicePixelRatio);
        projection.scale(baseRadius).translate([width / 2, height / 2]);

        if (landData) {
          render();
        }
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const setupInteraction = () => {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let startRotation: [number, number] = [0, 0];

        const onPointerDown = (event: PointerEvent) => {
          isDragging = true;
          autoRotate = false;
          startX = event.clientX;
          startY = event.clientY;
          startRotation = [rotation[0], rotation[1]];
          canvas.setPointerCapture(event.pointerId);
        };

        const onPointerMove = (event: PointerEvent) => {
          if (!isDragging) {
            return;
          }

          rotation[0] = startRotation[0] + (event.clientX - startX) * 0.5;
          rotation[1] = Math.max(
            -90,
            Math.min(90, startRotation[1] - (event.clientY - startY) * 0.5),
          );

          projection.rotate(rotation);
          render();
        };

        const onPointerUp = (event: PointerEvent) => {
          if (!isDragging) {
            return;
          }

          isDragging = false;

          if (canvas.hasPointerCapture(event.pointerId)) {
            canvas.releasePointerCapture(event.pointerId);
          }

          window.clearTimeout(resumeRotationTimeout);
          resumeRotationTimeout = window.setTimeout(() => {
            autoRotate = !prefersReducedMotion;
          }, 1000);
        };

        const onWheel = (event: WheelEvent) => {
          event.preventDefault();

          const nextScale =
            event.deltaY > 0
              ? projection.scale() * 0.9
              : projection.scale() * 1.1;

          projection.scale(
            Math.max(baseRadius * 0.5, Math.min(baseRadius * 3, nextScale)),
          );
          render();
        };

        canvas.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("wheel", onWheel, { passive: false });

        return () => {
          window.clearTimeout(resumeRotationTimeout);
          canvas.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          canvas.removeEventListener("wheel", onWheel);
        };
      };

      cleanupInteraction = setupInteraction();

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );

        if (!response.ok) {
          throw new Error("Failed to load world data");
        }

        landData = (await response.json()) as LandFeatureCollection;

        landData.features.forEach((feature) => {
          const [[minLongitude, minLatitude], [maxLongitude, maxLatitude]] =
            d3.geoBounds(feature);
          const stepSize = 22 * 0.12;

          for (
            let longitude = minLongitude;
            longitude <= maxLongitude;
            longitude += stepSize
          ) {
            for (
              let latitude = minLatitude;
              latitude <= maxLatitude;
              latitude += stepSize
            ) {
              const point: GeoPosition = [longitude, latitude];

              if (pointInFeature(point, feature)) {
                dots.push(point);
              }
            }
          }
        });

        loader.style.display = "none";
        canvas.classList.remove("opacity-0");
        canvas.classList.add("opacity-100");
        render();

        const timer = d3.timer(() => {
          if (!autoRotate) {
            return;
          }

          rotation[0] = (rotation[0] + 0.5) % 360;
          projection.rotate(rotation);
          render();
        });

        stopTimer = () => timer.stop();
      } catch {
        loader.textContent = "SYSTEM OFFLINE";
      }
    })();

    return () => {
      isDisposed = true;
      stopTimer?.();
      resizeObserver?.disconnect();
      cleanupInteraction?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex h-full w-full items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="touch-none aspect-square h-full w-full max-w-[800px] opacity-0 transition-opacity duration-1000 ease-in-out"
        aria-label="Interactive globe visualization"
      />
      <div
        ref={loaderRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse font-mono text-xs text-[color:var(--color-secondary)]"
        aria-live="polite"
      >
        INITIALIZING...
      </div>
      <p className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-secondary)] lg:bottom-12">
        <span className="h-1 w-1 rounded-full bg-[color:var(--color-text-secondary)]" aria-hidden="true" />
        Drag to rotate / Scroll to zoom
        <span className="h-1 w-1 rounded-full bg-[color:var(--color-text-secondary)]" aria-hidden="true" />
      </p>
    </div>
  );
}

export default function KORTEXAINeuralArchitecture() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progressBar = progressRef.current;

    if (!section || !progressBar) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateScrollProgress = () => {
      const scrollOffset = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight <= 0) {
        progressBar.style.width = "0%";
        return;
      }

      progressBar.style.width = `${(scrollOffset / scrollHeight) * 100}%`;
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    let isDisposed = false;
    let revertAnimations: (() => void) | undefined;

    if (!prefersReducedMotion) {
      void (async () => {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (isDisposed) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          const words = section.querySelectorAll<HTMLElement>(".reveal-word");
          const marqueeTrack = section.querySelector<HTMLElement>(".marquee-track");
          const title = section.querySelector(".masked-reveal-title");

          if (title) {
            gsap.to(words, {
              y: "0%",
              duration: 1.2,
              stagger: 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: title,
                start: "top 90%",
                once: true,
              },
            });
          }

          if (marqueeTrack) {
            gsap.to(marqueeTrack, {
              xPercent: -50,
              ease: "none",
              duration: 25,
              repeat: -1,
            });
          }
        }, section);

        revertAnimations = () => context.revert();
      })();
    }

    return () => {
      isDisposed = true;
      window.removeEventListener("scroll", updateScrollProgress);
      revertAnimations?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-x-hidden bg-[color:var(--background)] text-[color:var(--foreground)] antialiased selection:bg-[color:var(--color-secondary)] selection:text-[color:var(--color-neutral)] ${inter.className}`}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen"
          style={heroBackdropStyle}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--background)] to-[color:var(--color-background)]" />
        <div className="absolute inset-0 z-[1]" style={gridStyle} />
        <div className="absolute left-[20%] top-[-10%] h-[300px] w-[300px] rounded-full bg-[color:var(--color-secondary)]/10 blur-[80px] mix-blend-screen md:h-[500px] md:w-[500px] md:blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[250px] w-[250px] rounded-full bg-[color:var(--color-secondary)]/5 blur-[60px] mix-blend-screen md:h-[400px] md:w-[400px] md:blur-[100px]" />
      </div>

      <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
        <div
          ref={progressRef}
          className="h-full bg-[color:var(--color-secondary)] shadow-[0_0_10px_var(--color-secondary)] transition-[width] duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      <header className="fixed top-0 z-50 w-full px-4 pt-4 md:pt-6">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center justify-between rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/10 px-4 py-3 shadow-2xl shadow-[color:var(--color-surface)]/50 backdrop-blur-xl transition-all duration-300 md:px-6 md:py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-secondary)] to-[color:var(--color-surface)]">
                <Icon icon="solar:cpu-linear" width={18} height={18} color="currentColor" />
              </div>
              <span
                className={`hidden text-base font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:block md:text-lg ${manrope.className}`}
              >
                KORTEX
              </span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm text-[color:var(--color-text-secondary)] transition-colors duration-300 hover:text-[color:var(--color-text-primary)]">
                Capabilities
              </a>
              <a href="#protocol" className="text-sm text-[color:var(--color-text-secondary)] transition-colors duration-300 hover:text-[color:var(--color-text-primary)]">
                Protocol
              </a>
              <a href="#pricing" className="text-sm text-[color:var(--color-text-secondary)] transition-colors duration-300 hover:text-[color:var(--color-text-primary)]">
                Access
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hidden text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-text-primary)] sm:block">
                Sign In
              </a>
              <button type="button" className="group relative shrink-0 overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-secondary)] via-[#ff4d6d] to-[color:var(--color-secondary)] bg-[length:200%_100%] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2 rounded-full border border-[color:var(--color-surface)] bg-[color:var(--color-surface)] px-4 py-2 transition-all duration-300 group-hover:border-transparent md:px-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-neutral)]">
                    Deploy Core
                  </span>
                  <Icon
                    icon="solar:arrow-right-linear"
                    width={14}
                    height={14}
                    className="text-[color:var(--color-neutral)] transition-transform group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative z-10 overflow-hidden px-4 pt-32 md:px-6 lg:pb-0 lg:pt-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 pb-12 lg:grid-cols-2 lg:gap-8">
          <div className="relative z-20 order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <div className="group mb-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--color-border)]/50 bg-[color:var(--color-surface)]/10 px-3 py-1 backdrop-blur-md transition-colors hover:bg-[color:var(--color-surface)]/20 md:mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-secondary)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-secondary)]" />
              </span>
              <span className={`text-xs font-medium tracking-wide text-[color:var(--color-secondary)]/90 ${manrope.className}`}>
                System v2.4 Neural Upgrade
              </span>
              <Icon
                icon="solar:alt-arrow-right-linear"
                width={12}
                height={12}
                className="text-[color:var(--color-text-secondary)] transition-transform group-hover:translate-x-0.5"
              />
            </div>

            <h1
              className={`masked-reveal-title mb-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[color:var(--color-text-primary)] drop-shadow-2xl [text-wrap:balance] sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl ${manrope.className}`}
            >
              <RevealWord>Re-Defining</RevealWord>{" "}
              <RevealWord>AI FOR</RevealWord>{" "}
              <br className="hidden lg:block" />
              <RevealWord className="bg-gradient-to-br from-[color:var(--color-secondary)] via-[#f5a345] to-[color:var(--color-tertiary)] bg-clip-text text-transparent">
                Next-Gen.
              </RevealWord>
            </h1>

            <p className="mb-8 max-w-2xl text-base font-light leading-relaxed text-[color:var(--color-text-secondary)] [text-wrap:balance] md:mb-12 md:text-lg lg:text-xl">
              Kortex synthesizes predictive algorithms with autonomous defense layers.
              Experience the future of intelligent infrastructure, devoid of latency.
            </p>

            <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
              <button
                type="button"
                className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-[color:var(--color-secondary)] px-8 py-4 font-semibold tracking-wide text-[color:var(--color-neutral)] shadow-[0_0_40px_-10px_var(--color-secondary)] transition-all hover:opacity-90 hover:shadow-[0_0_60px_-15px_var(--color-secondary)] sm:w-auto"
              >
                <Icon icon="solar:bolt-linear" width={20} height={20} />
                Initialize System
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/10 px-8 py-4 font-medium text-[color:var(--color-text-primary)] backdrop-blur-md transition-all hover:bg-[color:var(--color-surface)]/20 hover:text-[color:var(--color-text-primary)] sm:w-auto"
              >
                <Icon icon="solar:code-square-linear" width={20} height={20} />
                Read Documentation
              </button>
            </div>
          </div>

          <div className="relative order-1 flex h-[400px] w-full items-center justify-center md:h-[600px] lg:order-2 lg:h-[750px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-secondary)]/20 blur-[80px] mix-blend-screen md:h-[300px] md:w-[300px] md:blur-[100px]" />
            <Globe />
          </div>
        </div>

        <div className="relative z-10 -mx-4 mt-8 overflow-hidden border-y border-[color:var(--color-border)] bg-[color:var(--color-neutral)] py-10 md:-mx-6 md:mt-12 md:py-14 dark:bg-[color:var(--color-surface)]/5">
          <div className="relative flex w-full overflow-hidden" style={marqueeMaskStyle}>
            <div className="marquee-track flex w-max">
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  aria-hidden={copyIndex === 1 ? true : undefined}
                  className="flex items-center gap-12 whitespace-nowrap px-6 md:gap-24 md:px-12"
                >
                  {BRAND_ITEMS.map((brand) => (
                    <div
                      key={`${copyIndex}-${brand.name}`}
                      className={`flex items-center gap-3 text-xl tracking-tight text-[color:var(--color-text-primary)] md:text-2xl ${manrope.className} ${brand.bold ? "font-bold" : "font-semibold"}`}
                    >
                      <Icon icon={brand.icon} width={28} height={28} />
                      {brand.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
