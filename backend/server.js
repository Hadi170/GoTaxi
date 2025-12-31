import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import session from "express-session";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

/* ===========================
   CORS + BODY
   =========================== */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

/* ===========================
   SESSION
   =========================== */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret_change_later",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 6,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

function requireAdmin(req, res, next) {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ error: "Not logged in" });
}

/* ===========================
   DB POOL
   =========================== */
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "gotaxi",
  port: Number(process.env.DB_PORT || 3307),
  waitForConnections: true,
  connectionLimit: 10,
});

/* ===========================
   RATE LIMITER (ADMIN LOGIN)
   =========================== */
const adminLoginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,                  // attempts per window per IP
  message: { error: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ===========================
   ADMIN AUTH
   =========================== */
app.post("/api/admin/login", adminLoginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ ok: false, error: "Missing credentials" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM admins WHERE username = ? LIMIT 1",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    const admin = rows[0];
    const ok = await bcrypt.compare(password, admin.password_hash);

    if (!ok) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    req.session.isAdmin = true;
    req.session.adminId = admin.id;
    req.session.adminUser = admin.username;

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

/* ===========================
   DRIVER APPLICATIONS
   =========================== */

// ADMIN: list applications
app.get("/api/driver-applications", requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM driver_applications ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// PUBLIC: submit application
app.post("/api/driver-applications", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      city,
      experienceYears,
      availability,
      carModel,
      carYear,
      carColor,
      licenseNumber,
      mood,
      photo,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !email ||
      !city ||
      !carModel ||
      !carYear ||
      !carColor ||
      !licenseNumber ||
      !photo
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exp = Number(experienceYears || 0);

    await pool.query(
      `INSERT INTO driver_applications
       (full_name, phone, email, city, experience_years, availability,
        car_model, car_year, car_color, license_number, driving_style, status, photo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      [
        fullName,
        phone,
        email,
        city,
        exp,
        availability || "full-time",
        carModel,
        carYear,
        carColor,
        licenseNumber,
        mood || null,
        photo,
      ]
    );

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ADMIN: approve application (move to drivers table + mark approved)
app.post("/api/admin/applications/:id/approve", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [rows] = await pool.query(
      "SELECT * FROM driver_applications WHERE id = ?",
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    const a = rows[0];

    if (a.status !== "pending") {
      return res.status(400).json({ error: "Application is not pending" });
    }

    // insert into drivers
    await pool.query(
      `INSERT INTO drivers
       (full_name, phone, email, city, experience_years, availability,
        car_model, car_year, car_color, license_number, driving_style, photo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        a.full_name,
        a.phone,
        a.email,
        a.city,
        a.experience_years,
        a.availability,
        a.car_model,
        a.car_year,
        a.car_color,
        a.license_number,
        a.driving_style,
        a.photo,
      ]
    );

    // mark approved
    await pool.query(
      "UPDATE driver_applications SET status='approved' WHERE id = ?",
      [id]
    );

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ADMIN: decline = delete application
app.delete("/api/admin/applications/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [result] = await pool.query(
      "DELETE FROM driver_applications WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/* ===========================
   DRIVERS (PUBLIC)
   =========================== */
app.get("/api/drivers", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM drivers ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/* ===========================
   CONTACT
   =========================== */

// PUBLIC submit
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), message.trim()]
    );

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ADMIN list
app.get("/api/admin/contact", requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/* ===========================
   START
   =========================== */
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
