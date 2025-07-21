window.addEventListener("DOMContentLoaded", () => {
  // === SMART APPLIANCES FILTERS ===

  const devices = [
    { name: "Fridge", usage: 120, status: "online" },
    { name: "Washer", usage: 300, status: "online" },
    { name: "TV", usage: 50, status: "offline" },
    { name: "AC Unit", usage: 400, status: "online" }
  ];

  renderDevices(devices);

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", searchDevices);
  }

  function renderDevices(list) {
    const container = document.getElementById("device-list");
    if (!container) return;
    container.innerHTML = "";

    list.forEach(device => {
      const div = document.createElement("div");
      div.className = "info-group";
      div.innerHTML = `
        <span class="label">${device.name}:</span>
        <span class="value">${(device.usage / 1000).toFixed(1)} kW • $${(device.usage * 0.12 / 1000).toFixed(2)}/hr</span>
      `;
      container.appendChild(div);
    });
  }

  function searchDevices() {
    const query = searchInput.value.toLowerCase();
    const filtered = devices.filter(d => d.name.toLowerCase().includes(query));
    renderDevices(filtered);
  }

  window.filterDevices = function (type) {
    let filtered = [];

    if (type === "high") {
      filtered = devices.filter(d => d.usage > 200);
    } else if (type === "offline") {
      filtered = devices.filter(d => d.status === "offline");
    } else {
      filtered = devices;
    }

    renderDevices(filtered);
  };

  // === TOEVOEGEN NIEUW APPARAAT ===

  const addBtn = document.getElementById("addDeviceBtn");
  const input = document.getElementById("deviceNameInput");
  const devicesContainer = document.getElementById("added-devices");

  if (addBtn && input && devicesContainer) {
    addBtn.addEventListener("click", () => {
      const name = input.value.trim();
      if (name === "") return;

      const div = document.createElement("div");
      div.className = "device-entry";
      div.innerHTML = `
        <span class="device-name">${name}</span>
        <div class="device-actions">
          <button class="rename-btn">Hernoemen</button>
          <button class="delete-btn">Verwijderen</button>
        </div>
      `;

      // Nieuwe apparaten bovenaan tonen
      devicesContainer.prepend(div);
      input.value = "";

      // Event listeners toevoegen aan knoppen
      const renameBtn = div.querySelector(".rename-btn");
      const deleteBtn = div.querySelector(".delete-btn");
      const nameSpan = div.querySelector(".device-name");

      renameBtn.addEventListener("click", () => {
        const newName = prompt("Voer een nieuwe naam in voor het apparaat:", nameSpan.textContent);
        if (newName) {
          nameSpan.textContent = newName.trim();
        }
      });

      deleteBtn.addEventListener("click", () => {
        if (confirm("Weet je zeker dat je dit apparaat wilt verwijderen?")) {
          div.remove();
        }
      });
    });
  }

  // === LIVE USAGE CHART ===
  const ctx = document.getElementById("liveChart")?.getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1s', '2s', '3s', '4s', '5s'],
        datasets: [{
          label: 'kW Usage',
          data: [1.2, 1.5, 1.3, 1.7, 1.4],
          borderColor: '#003366',
          backgroundColor: 'rgba(0, 51, 102, 0.2)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#003366'
            }
          },
          x: {
            ticks: {
              color: '#003366'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#003366'
            }
          }
        }
      }
    });
  }
});
