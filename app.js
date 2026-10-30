const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Jenkins CI/CD Project</title>
            <style>
                body {
                    font-family: Arial;
                    text-align: center;
                    background: #f0f4f8;
                    padding: 100px;
                }
                h1 { color: #2563eb; }
                .box {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>Welcome to Jenkins CI/CD Pipeline!</h1>
                <h2>Application deployed successfully on AWS EC2</h2>
                <p>Technologies: GitHub, Jenkins, Docker and AWS</p>
                <p>Version: 1.0</p>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Application running on port ${PORT}`);
});
