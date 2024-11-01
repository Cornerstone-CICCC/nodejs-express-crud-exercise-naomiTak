"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages/modules
const express_1 = __importDefault(require("express"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set up Express
const app = (0, express_1.default)();
// Middleware
app.use((req, res, next) => {
    if (req.url === "/secure-page") { // Block access to secure url
        res.status(401).send("You are not allowed to visit that url...");
    }
    console.log(`Request made to ${req.url} at ${new Date()}`);
    next(); // Proceed to next middleware or route handler
});
app.use(express_1.default.json()); // Allow incoming json data
// Routes
app.use('/', page_routes_1.default);
app.use('/api/todos', product_routes_1.default);
// Start server
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
