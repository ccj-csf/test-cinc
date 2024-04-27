// const columns = [
//   "node_id",
//   "status",
//   "status_duration",
//   "is_working",
//   "hardware_name",
//   "hardware_quantity",
//   "brand_name",
// ];

const STATUS = ["CREATED", "DEPLOYING", "COMPLETED", "RUNNING", "FAILED"];
const BRAND_NAMES = [
  "8x A100 80GB PCIe",
  "8x A100 80GB NVLink",
  "A100 80GB PCIe",
  "RTX A4000",
  "RTX A6000",
  "RTX A5000",
  "RTX 3080",
  "Rayzen 7000",
  "H100 80G PCIe",
  "M2 ULTRA",
  "L40",
];

function randomStatus() {
  let index = randomInt(0, STATUS.length - 1);
  return STATUS[index];
}

function randomStatusDuration() {
  let hour = randomInt(0, 1000);
  let mins = randomInt(0, 1000);
  return hour + " Hrs " + mins + " Mins ";
}

function randomBrandName() {
  let index = randomInt(0, BRAND_NAMES.length - 1);
  return BRAND_NAMES[index];
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNodeId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function createMockData() {
  let r = [];
  for (let i = 0; i < 100; i++) {
    let row = {
      id: i,
      node_id: randomNodeId(),
      hardware_name: "test-ludwig-train=test-basem-" + i,
      hardware_quantity: randomInt(60, 100),
      brand_name: randomBrandName(),
      status: randomStatus(),
      status_duration: randomStatusDuration(),
      is_working: true,
      brand_icon: "",
    };
    r.push(row);
  }
  return r;
}

export const data = createMockData();
