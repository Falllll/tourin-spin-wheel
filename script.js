/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

function generatePieChartSegments(count) {
  const totalDegrees = 360;
  const degreesPerSegment = totalDegrees / count;

  let spinValues = [];
  let size = [];
  let labels = [];

  for (let i = 0; i < count; i++) {
    const minDegree = i * degreesPerSegment;
    const maxDegree = (i + 1) * degreesPerSegment;
    const value = (i + 1) * 100; // Adjust the value calculation as needed
    const label = i + 1;

    spinValues.push({
      minDegree,
      maxDegree,
      value,
    });

    size.push(degreesPerSegment);
    labels.push(label);
  }

  return { spinValues, size, labels };
}

// Example: Generate spinValues, size, and labels arrays with 11 segments
const { spinValues, size, labels } = generatePieChartSegments(42);

// Display the generated arrays
console.log("Spin Values:", spinValues);
console.log("Size:", size);
console.log("Labels:", labels);
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
// const spinValues = [
//   { minDegree: 61, maxDegree: 90, value: 100 },
//   { minDegree: 31, maxDegree: 60, value: 200 },
//   { minDegree: 0, maxDegree: 30, value: 300 },
//   { minDegree: 331, maxDegree: 360, value: 400 },
//   { minDegree: 301, maxDegree: 330, value: 500 },
//   { minDegree: 271, maxDegree: 300, value: 600 },
//   { minDegree: 241, maxDegree: 270, value: 700 },
//   { minDegree: 211, maxDegree: 240, value: 800 },
//   { minDegree: 181, maxDegree: 210, value: 900 },
//   { minDegree: 151, maxDegree: 180, value: 1000 },
//   { minDegree: 121, maxDegree: 150, value: 1100 },
//   { minDegree: 91, maxDegree: 120, value: 1200 },
// ];
/* --------------- Size Of Each Piece  --------------------- */
// const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: labels,
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        align: 'start',
        anchor: 'end',
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {

      // DEBUGGING
      // console.log(angleValue);
      // DEBUGGING

      text.innerHTML = `<p>Congratulations, You Have Won $${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  // let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  // SET ANGKA PEMENANG DARI SINI
  // ITUNG KIRA2 BRP DERAJAT, ANTI-CLOCKWISE DARI ATAS (INDICATOR)
  let randomDegree = 80;


  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;

    console.log(`count: ${count}`);
    console.log("spinChart.options.rotation");
    console.log(spinChart.options.rotation);

    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = spinChart.options.rotation % 360;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */