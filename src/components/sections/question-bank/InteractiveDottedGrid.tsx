"use client";

import React from "react";

export default function InteractiveDottedGrid() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dots: { ox: number; oy: number; x: number; y: number; opacity: number; radius: number }[] = [];
    const spacing = 32;
    const hoverRadius = 160;
    const maxDisplacement = 12;
    const ease = 0.08;
    const baseOpacity = 0.12;
    const baseRadius = 1.2;
    const maxRadius = 3.0;

    const mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      const parentEl = containerRef.current;
      if (!parentEl) return;
      width = parentEl.clientWidth;
      height = parentEl.clientHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      dots.length = 0;
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const ox = offsetX + c * spacing;
          const oy = offsetY + r * spacing;
          dots.push({
            ox,
            oy,
            x: ox,
            y: oy,
            opacity: baseOpacity,
            radius: baseRadius,
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const parent = containerRef.current?.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let targetX = dot.ox;
        let targetY = dot.oy;
        let targetOpacity = baseOpacity;
        let targetRadius = baseRadius;
        let isHovered = false;

        if (mouse.active) {
          const dx = dot.ox - mouse.x;
          const dy = dot.oy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius) {
            isHovered = true;
            const force = (hoverRadius - dist) / hoverRadius;
            const angle = Math.atan2(dy, dx);
            
            const displacement = force * maxDisplacement;
            targetX = dot.ox + Math.cos(angle) * displacement;
            targetY = dot.oy + Math.sin(angle) * displacement;

            targetOpacity = baseOpacity + (0.75 - baseOpacity) * force;
            targetRadius = baseRadius + (maxRadius - baseRadius) * force;
          }
        }

        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;
        dot.opacity += (targetOpacity - dot.opacity) * ease;
        dot.radius += (targetRadius - dot.radius) * ease;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        
        if (isHovered || dot.opacity > baseOpacity + 0.01) {
          ctx.fillStyle = `rgba(232, 121, 249, ${dot.opacity})`;
        } else {
          ctx.fillStyle = `rgba(161, 161, 170, ${dot.opacity})`;
        }
        
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none" 
      />
    </div>
  );
}
