import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

console.log("API_GEMINI:", process.env.API_GEMINI ? "OK" : "NO DEFINIDA");
console.log(
	"API_OPENROUTER:",
	process.env.API_OPENROUTER ? "OK" : "NO DEFINIDA"
);

// Ruta para resumen con Gemini
app.post("/api/gemini", async (req, res) => {
	const { inputText } = req.body;
	const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_GEMINI}`;

	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [{ parts: [{ text: inputText }] }],
			}),
		});
		const data = await response.json();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Error en Gemini" });
	}
});

app.post("/api/openrouter", async (req, res) => {
	const { inputText, model } = req.body;
	try {
		const response = await fetch(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.API_OPENROUTER}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model,
					messages: [{ role: "user", content: inputText }],
				}),
			}
		);
		const data = await response.json();
		console.log("Respuesta de OpenRouter:", JSON.stringify(data)); // <-- Agregado para debug
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Error en OpenRouter" });
	}
});
// ...existing code...
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
