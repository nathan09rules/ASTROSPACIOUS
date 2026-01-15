import { useEffect, useRef } from "react";

function Space_bg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener("resize", resize);

    let scrollY = 0;
    let py = 0;

    let mx = w / 2;
    let my = h / 2;

    const onScroll = () => (scrollY = window.scrollY);
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);

    // Initialize stars and nebulae
    let stars = Array.from({ length: 240 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2,
      a: Math.random(),
      tw: Math.random() * 0.02 + 0.01,
      d: Math.random() * 1.2 + 0.3,
    }));

    let nebulae = Array.from({ length: 4 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 300 + 200,
      c: ["rgba(139,92,246,0.15)", "rgba(6,182,212,0.12)", "rgba(236,72,153,0.1)"][
        Math.floor(Math.random() * 3)
      ],
      dx: (Math.random() - 0.5) * 0.05,
      dy: (Math.random() - 0.5) * 0.05,
      d: Math.random() * 0.25 + 0.1,
    }));

    // Handle full reset of stars/nebulae on resize
    const handleResize = () => {
      resize();
      // reposition stars/nebulae to new window size
      stars = stars.map(s => ({ ...s, x: Math.random() * w, y: Math.random() * h }));
      nebulae = nebulae.map(n => ({ ...n, x: Math.random() * w, y: Math.random() * h }));
    };
    window.addEventListener("resize", handleResize);

    let frame: number;
    const animate = () => {
      py += (scrollY - py) * 0.02;

      ctx.fillStyle = "rgb(5,8,20)";
      ctx.fillRect(0, 0, w, h);

      nebulae.forEach(n => {
        const oy = py * n.d * 0.05;
        const g = ctx.createRadialGradient(n.x, n.y + oy, 0, n.x, n.y + oy, n.r);
        g.addColorStop(0, n.c);
        g.addColorStop(1, "transparent");

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        n.x += n.dx;
        n.y += n.dy;

        if (n.x < -n.r) n.x = w + n.r;
        if (n.x > w + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = h + n.r;
        if (n.y > h + n.r) n.y = -n.r;
      });

      stars.forEach(s => {
        s.a += (Math.random() - 0.5) * s.tw;
        s.a = Math.max(0.15, Math.min(1, s.a));

        ctx.beginPath();
        ctx.arc(s.x, s.y + py * s.d * 0.08, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });

      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
      glow.addColorStop(0, "rgba(255,255,255,0.08)");
      glow.addColorStop(0.4, "rgba(139,92,246,0.05)");
      glow.addColorStop(1, "transparent");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}

export default Space_bg;
