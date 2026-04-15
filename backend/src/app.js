const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const usersRoutes = require("./routes/users.route");
const alumnosRoutes = require("./routes/alumnos.route");
const maestrosRoutes = require("./routes/maestros.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", alumnosRoutes);
app.use("/api", maestrosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

