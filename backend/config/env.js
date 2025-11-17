import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 🧩 Load the .env file explicitly from backend/
dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("✅ Loaded env from:", path.join(__dirname, "../.env"));
console.log("✅ Example check:", process.env.DB_URI);
