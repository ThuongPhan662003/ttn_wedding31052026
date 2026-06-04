"use client";
import { useEffect, useRef } from "react";

export default function RosePetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let petals = [];
    const maxPetals = 15;

    const img = new Image();
    img.src = "/images/rose1.png"; // 👈 ảnh cánh hoa

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Petal {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random()  * 10 + 8;; // ảnh cần lớn hơn ellipse
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.opacity = Math.random() * 0.5 + 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1 - 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!img.complete) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        ctx.drawImage(
          img,
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size,
        );

        ctx.restore();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < maxPetals; i++) {
      petals.push(new Petal());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
}
