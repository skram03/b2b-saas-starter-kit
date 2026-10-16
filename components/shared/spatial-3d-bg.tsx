"use client";

import React, { useEffect, useRef } from "react";

export function Spatial3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for spatial interactivity
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // 3D Nodes
    const NODE_COUNT = 60;
    const nodes: {
      x: number;
      y: number;
      z: number;
      radius: number;
      vx: number;
      vy: number;
      vz: number;
      color: string;
      glow: string;
    }[] = [];

    const palette = [
      { fill: "rgba(6, 182, 212, 0.85)", glow: "rgba(6, 182, 212, 0.6)" },    // Neon Cyan
      { fill: "rgba(99, 102, 241, 0.85)", glow: "rgba(99, 102, 241, 0.6)" },   // Indigo
      { fill: "rgba(168, 85, 247, 0.85)", glow: "rgba(168, 85, 247, 0.6)" },   // Electric Violet
      { fill: "rgba(56, 189, 248, 0.85)", glow: "rgba(56, 189, 248, 0.5)" },   // Azure Sky
      { fill: "rgba(16, 185, 129, 0.85)", glow: "rgba(16, 185, 129, 0.5)" },   // Emerald Spark
    ];

    for (let i = 0; i < NODE_COUNT; i++) {
      const p = palette[Math.floor(Math.random() * palette.length)];
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 850 + 150,
        radius: Math.random() * 3 + 1.5,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.65,
        color: p.fill,
        glow: p.glow,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const fov = 550;
      const cx = width / 2 + (mouseX - width / 2) * 0.08;
      const cy = height / 2 + (mouseY - height / 2) * 0.08;
      angle += 0.003;

      // 1. Draw Interactive Radial Cursor Spotlight in Background
      const radialGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
      radialGlow.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      radialGlow.addColorStop(0.5, "rgba(99, 102, 241, 0.06)");
      radialGlow.addColorStop(1, "rgba(15, 23, 42, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Concentric Holographic HUD Telemetry Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.4);

      // Outer Ring
      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 18]);
      ctx.stroke();

      // Middle Segmented Orbit Ring
      ctx.beginPath();
      ctx.arc(0, 0, 220, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10, 25, 10]);
      ctx.stroke();

      // Inner Counter-Rotating Ring
      ctx.rotate(-angle * 0.8);
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.14)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 14]);
      ctx.stroke();

      // Crosshair Ticks
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
      ctx.lineWidth = 1;
      const tickLen = 14;
      ctx.beginPath();
      ctx.moveTo(-tickLen, 0); ctx.lineTo(tickLen, 0);
      ctx.moveTo(0, -tickLen); ctx.lineTo(0, tickLen);
      ctx.stroke();

      ctx.restore();

      // 3. Render 3D Perspective Connecting Conduits & Nodes
      for (let i = 0; i < nodes.length; i++) {
        const p1 = nodes[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.z += p1.vz;

        if (p1.z < 100) p1.z = 950;
        if (p1.z > 950) p1.z = 100;

        // Perspective scale
        const scale = fov / (fov + p1.z);
        const x2d = p1.x * scale + cx;
        const y2d = p1.y * scale + cy;

        // Interactive cursor repulsion / reaction
        const dxMouse = x2d - mouseX;
        const dyMouse = y2d - mouseY;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 180) {
          const factor = (1 - distMouse / 180) * 8;
          p1.x += (dxMouse / distMouse) * factor;
          p1.y += (dyMouse / distMouse) * factor;
        }

        // Draw Node
        ctx.beginPath();
        ctx.arc(x2d, y2d, p1.radius * scale * 2, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = p1.glow;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const scale2 = fov / (fov + p2.z);
          const x2d2 = p2.x * scale2 + cx;
          const y2d2 = p2.y * scale2 + cy;

          const dist = Math.hypot(x2d - x2d2, y2d - y2d2);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d2, y2d2);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * (1 - dist / 140)})`;
            ctx.lineWidth = 1 * scale;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-80"
    />
  );
}
