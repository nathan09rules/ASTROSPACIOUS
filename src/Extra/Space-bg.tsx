import { useEffect } from "react";

function Space_bg() {
    useEffect(() => {
        const canvas = document.getElementById("space-bg") as HTMLCanvasElement | null;
        if (!canvas) return;

        const ctx = canvas.getContext("2d")!;
        let w = canvas.clientWidth;
        let h = canvas.clientHeight;
        let animationId: number;

        function resize() {
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w;
            canvas.height = h;
            drawNebulaOnce();
        }

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const starCount = 150;
        const stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.2 + 0.4,
            alpha: Math.random() * 0.7 + 0.3,
            drift: Math.random() * 0.08 + 0.02
        }));

        function nebula(x: number, y: number) {
            return (
                Math.sin(x * 0.00002) * Math.cos(y * 0.002) +
                Math.sin((x + y) * 0.004) * 0.5
            );
        }

        function drawNebulaOnce() {
            const image = ctx.createImageData(w, h);
            const data = image.data;

            for (let i = 0; i < data.length; i += 4) {
                const px = (i / 4) % w;
                const py = Math.floor(i / 4 / w);
                const n = nebula(px, py);

                const r = 10 + n * 80;
                const g = 10 + n * 30;
                const b = 50 + n * 100;

                data[i] = Math.max(0, Math.min(255, r));
                data[i + 1] = Math.max(0, Math.min(255, g));
                data[i + 2] = Math.max(0, Math.min(255, b));
                data[i + 3] = 40;
            }
            ctx.putImageData(image, 0, 0);
        }

        function drawStars() {
            stars.forEach(s => {
                s.alpha += (Math.random() - 0.5) * 0.02;
                s.alpha = Math.max(0.2, Math.min(0.9, s.alpha));
                s.y += s.drift;

                if (s.y > h) s.y = -s.r;

                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            drawNebulaOnce();
            drawStars();
            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <canvas
            id="space-bg"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1
            }}
        />
    );
}

export default Space_bg;
