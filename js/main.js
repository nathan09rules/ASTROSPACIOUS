        const canvas = document.getElementById("stars");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 300; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let r = Math.random() * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }