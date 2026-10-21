
"use strict";

// ============================================
// DATA AWAL PROYEK
// ============================================

const projects = [
  {
    id: 1,
    title: "Sistem Inventaris Keuangan",
    category: "Web App",
    budget: 2500000,
    completed: true
  },
  {
    id: 2,
    title: "Sistem Kasir Digital POS",
    category: "Desktop App",
    budget: 5000000,
    completed: true
  },
  {
    id: 3,
    title: "Landing Page Profil Perusahaan",
    category: "Web App",
    budget: 1500000,
    completed: false
  },
  {
    id: 4,
    title: "Aplikasi Presensi GPS Mobile",
    category: "Mobile App",
    budget: 4500000,
    completed: false
  }
];

// ============================================
// FORMAT RUPIAH
// ============================================

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
};

// ============================================
// REFERENSI ELEMEN DOM
// ============================================

const projectForm = document.getElementById("project-form");
const titleInput = document.getElementById("project-title");
const categoryInput = document.getElementById("project-category");
const budgetInput = document.getElementById("project-budget");
const completedInput = document.getElementById("project-completed");

const searchInput = document.getElementById("project-search");
const projectList = document.getElementById("project-list");
const projectCount = document.getElementById("project-count");
const formMessage = document.getElementById("form-message");

const totalProjectsElement =
  document.getElementById("stat-total-projects");

const totalBudgetElement =
  document.getElementById("stat-total-budget");

const completedProjectsElement =
  document.getElementById("stat-completed-projects");

const filterButtons = document.querySelectorAll(".btn-filter");

// ============================================
// STATE FILTER DAN PENCARIAN
// ============================================

let selectedCategory = "Semua";
let searchKeyword = "";

// ============================================
// FUNGSI KEAMANAN TEKS HTML
// ============================================

function escapeHTML(text) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(text).replace(/[&<>"']/g, character => {
    return entities[character];
  });
}

// ============================================
// FITUR 1: UPDATE STATISTIK
// ============================================

function updateStats() {
  // Menghitung jumlah seluruh proyek
  const totalProjects = projects.length;

  // Menghitung total seluruh anggaran
  const totalBudget = projects.reduce(
    (total, project) => total + project.budget,
    0
  );

  // Menghitung proyek yang sudah selesai
  const completedCount = projects.filter(
    project => project.completed === true
  ).length;

  totalProjectsElement.textContent = totalProjects;
  totalBudgetElement.textContent = formatRupiah(totalBudget);
  completedProjectsElement.textContent = completedCount;
}

// ============================================
// FITUR 2: RENDER PROYEK
// ============================================

function renderProjects() {
  // Filter kategori dan pencarian digabungkan
  const filteredProjects = projects.filter(project => {
    const matchesCategory =
      selectedCategory === "Semua" ||
      project.category === selectedCategory;

    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Update jumlah proyek yang sedang ditampilkan
  projectCount.textContent =
    `${filteredProjects.length} proyek ditampilkan`;

  // Pesan jika tidak ada proyek yang cocok
  if (filteredProjects.length === 0) {
    projectList.innerHTML = `
      <div class="empty-message">
        Tidak ada proyek yang cocok dengan pencarian atau filter.
      </div>
    `;

    return;
  }

  // Membuat kartu proyek secara dinamis
  const htmlString = filteredProjects.map(project => {
    const badgeClass = project.completed
      ? "badge-success"
      : "badge-pending";

    const statusText = project.completed
      ? "Selesai"
      : "Dalam Pengerjaan";

    return `
      <article class="project-card">

        <div class="project-info">

          <span class="project-category">
            ${escapeHTML(project.category)}
          </span>

          <h4>${escapeHTML(project.title)}</h4>

          <p class="project-budget">
            Anggaran: ${formatRupiah(project.budget)}
          </p>

          <div class="project-actions">

            <button
              type="button"
              class="btn-toggle"
              data-action="toggle"
              data-id="${project.id}"
              aria-label="Ubah status ${escapeHTML(project.title)}"
            >
              Ubah Status
            </button>

            <button
              type="button"
              class="btn-delete"
              data-action="delete"
              data-id="${project.id}"
              aria-label="Hapus ${escapeHTML(project.title)}"
            >
              Hapus Proyek
            </button>

          </div>

        </div>

        <div class="project-status">
          <span class="badge ${badgeClass}">
            ${statusText}
          </span>
        </div>

      </article>
    `;
  }).join("");

  projectList.innerHTML = htmlString;
}

// ============================================
// UPDATE SELURUH DASHBOARD
// ============================================

function refreshDashboard() {
  updateStats();
  renderProjects();
}

// ============================================
// PESAN FORM
// ============================================

function showFormMessage(message, isError = false) {
  formMessage.textContent = message;

  formMessage.style.color = isError
    ? "#dc2626"
    : "#15803d";
}

// ============================================
// FITUR 3: FORM HANDLING & VALIDATION
// ============================================

projectForm.addEventListener("submit", function (e) {
  // Mencegah halaman reload saat form dikirim
  e.preventDefault();

  // Mengambil nilai dari input
  const title = titleInput.value.trim();
  const category = categoryInput.value;
  const budgetValue = budgetInput.value.trim();
  const budget = Number(budgetValue);
  const completed = completedInput.checked;

  // Validasi judul proyek
  if (title === "") {
    showFormMessage(
      "Judul proyek tidak boleh kosong.",
      true
    );

    titleInput.focus();
    return;
  }

  // Validasi anggaran
  if (
    budgetValue === "" ||
    !Number.isFinite(budget) ||
    budget <= 0
  ) {
    showFormMessage(
      "Anggaran harus berupa angka lebih besar dari 0.",
      true
    );

    budgetInput.focus();
    return;
  }

  // Membuat objek proyek dengan ID unik
  const newProject = {
    id: Date.now(),
    title: title,
    category: category,
    budget: budget,
    completed: completed
  };

  // Memasukkan proyek baru ke array
  // Menggunakan spread operator sesuai materi
  projects.push(newProject);

  // Mengosongkan form setelah berhasil
  projectForm.reset();

  // Reset filter supaya proyek baru langsung terlihat
  selectedCategory = "Semua";
  searchKeyword = "";
  searchInput.value = "";

  filterButtons.forEach(button => {
    const isActive = button.dataset.category === "Semua";

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  // Memperbarui tampilan dan statistik
  refreshDashboard();

  showFormMessage(
    "Proyek berhasil ditambahkan ke daftar!"
  );

  titleInput.focus();
});

// ============================================
// FITUR 4: PENCARIAN REAL-TIME
// ============================================

searchInput.addEventListener("input", function (e) {
  searchKeyword = e.target.value.trim();

  // Render ulang setiap kali pengguna mengetik
  renderProjects();
});

// ============================================
// FITUR 5: FILTER KATEGORI
// ============================================

filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    selectedCategory = this.dataset.category;

    filterButtons.forEach(item => {
      const isActive = item === this;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Filter kategori tetap mengikuti kata pencarian
    renderProjects();
  });
});

// ============================================
// FITUR 6: UBAH STATUS & HAPUS PROYEK
// ============================================

// Event delegation untuk tombol pada setiap kartu
projectList.addEventListener("click", function (e) {
  const button = e.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const projectId = Number(button.dataset.id);
  const action = button.dataset.action;

  // Mencari posisi proyek berdasarkan ID
  const projectIndex = projects.findIndex(
    project => project.id === projectId
  );

  if (projectIndex === -1) {
    return;
  }

  // Aksi ubah status
  if (action === "toggle") {
    projects[projectIndex].completed =
      !projects[projectIndex].completed;

    refreshDashboard();
    return;
  }

  // Aksi hapus proyek
  if (action === "delete") {
    const confirmed = confirm(
      "Apakah kamu yakin ingin menghapus proyek ini?"
    );

    if (!confirmed) {
      return;
    }

    // Hapus item berdasarkan ID yang ditemukan
    projects.splice(projectIndex, 1);

    refreshDashboard();
  }
});

// ============================================
// INISIALISASI DASHBOARD
// ============================================

refreshDashboard();
