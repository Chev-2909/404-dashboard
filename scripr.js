const ctx = document.getElementById('energyChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    datasets: [{
      label: 'Wattage',
      data: [1000, 1100, 1250, 1200, 1250],
      fill: false,
      borderColor: 'rgb(0, 119, 255)',
      tension: 0.2
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

function toggle(button) {
  button.textContent = button.textContent === 'On' ? 'Off' : 'On';
}
