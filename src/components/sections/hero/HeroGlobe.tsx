"use client";

import { useEffect, useRef } from "react";

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
    if (!pointInRing(point, outerRing)) return false;
    return !holes.some((hole) => pointInRing(point, hole));
  }
  return feature.geometry.coordinates.some(([outerRing, ...holes]) => {
    if (!pointInRing(point, outerRing)) return false;
    return !holes.some((hole) => pointInRing(point, hole));
  });
}

export interface HeroGlobeProps {
  className?: string;
}

export function HeroGlobe({ className }: HeroGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const loader = loaderRef.current;
    if (!container || !canvas || !loader) return;

    let isDisposed = false;
    let resizeObserver: ResizeObserver | undefined;
    let stopTimer: (() => void) | undefined;
    let cleanupInteraction: (() => void) | undefined;
    let resumeRotationTimeout = 0;

    void (async () => {
      const d3 = await import("d3");
      if (isDisposed) return;

      const context = canvas.getContext("2d", { alpha: true });
      if (!context) return;

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
        context.strokeStyle = "rgba(232,121,249,0.3)";
        context.lineWidth = scaleFactor;
        context.stroke();

        if (!landData) return;

        context.beginPath();
        geoPath(d3.geoGraticule10());
        context.strokeStyle = "rgba(15,23,42,0.06)";
        context.lineWidth = 0.5 * scaleFactor;
        context.stroke();

        context.beginPath();
        landData.features.forEach((feature) => { geoPath(feature); });
        context.fillStyle = "rgba(15,23,42,0.04)";
        context.fill();
        context.strokeStyle = "rgba(15,23,42,0.12)";
        context.lineWidth = 0.8 * scaleFactor;
        context.stroke();

        context.fillStyle = "#e879f9";
        dots.forEach(([longitude, latitude]) => {
          const projected = projection([longitude, latitude]);
          if (projected) {
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              1.2 * scaleFactor,
              0,
              Math.PI * 2,
            );
            context.fill();
          }
        });
      };

      const resize = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        baseRadius = Math.min(width, height) / 2.2;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);
        projection.scale(baseRadius).translate([width / 2, height / 2]);
        if (landData) render();
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
          if (!isDragging) return;
          rotation[0] = startRotation[0] + (event.clientX - startX) * 0.5;
          rotation[1] = Math.max(
            -90,
            Math.min(
              90,
              startRotation[1] - (event.clientY - startY) * 0.5,
            ),
          );
          projection.rotate(rotation);
          render();
        };

        const onPointerUp = (event: PointerEvent) => {
          if (!isDragging) return;
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
        if (!response.ok) throw new Error("Failed to load world data");
        landData = (await response.json()) as LandFeatureCollection;

        landData.features.forEach((feature) => {
          const [[minLng, minLat], [maxLng, maxLat]] =
            d3.geoBounds(feature);
          const step = 22 * 0.12;
          for (let lng = minLng; lng <= maxLng; lng += step) {
            for (let lat = minLat; lat <= maxLat; lat += step) {
              const point: GeoPosition = [lng, lat];
              if (pointInFeature(point, feature)) dots.push(point);
            }
          }
        });

        loader.style.display = "none";
        canvas.classList.remove("opacity-0");
        canvas.classList.add("opacity-100");
        render();

        const timer = d3.timer(() => {
          if (!autoRotate) return;
          rotation[0] = (rotation[0] + 0.5) % 360;
          projection.rotate(rotation);
          render();
        });
        stopTimer = () => timer.stop();
      } catch {
        loader.textContent = "OFFLINE";
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
      className={`relative z-10 flex h-full w-full items-center justify-center${
        className ? ` ${className}` : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        className="touch-none aspect-square h-full w-full max-w-200 opacity-0 transition-opacity duration-1000 ease-in-out"
        aria-label="Interactive globe visualization"
      />
      <div
        ref={loaderRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse font-mono text-xs text-accent"
        aria-live="polite"
      >
        LOADING...
      </div>
      <p className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-text-secondary lg:bottom-4">
        <span className="h-1 w-1 rounded-full bg-text-secondary" aria-hidden="true" />
        Drag to rotate &middot; Scroll to zoom
        <span className="h-1 w-1 rounded-full bg-text-secondary" aria-hidden="true" />
      </p>
    </div>
  );
}
