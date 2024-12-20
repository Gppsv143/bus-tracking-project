
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_ATLAS_CONNECTION_STRING", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BusSchema = new mongoose.Schema({
  number: String,
  location: { lat: Number, lng: Number },
});

const Bus = mongoose.model("Bus", BusSchema);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  setInterval(async () => {
    const buses = await Bus.find();
    io.emit("busLocationUpdate", buses);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.post("/updateLocation", async (req, res) => {
  const { number, location } = req.body;
  const bus = await Bus.findOneAndUpdate({ number }, { location }, { upsert: true, new: true });
  res.status(200).send(bus);
});

server.listen(3001, () => console.log("Backend running on port 3001"));
