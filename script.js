document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.querySelector("#todoForm");
    const taskInput = document.querySelector("#taskInput");
    const inputError = document.querySelector("#inputError");
    const todoList = document.querySelector("#todoList");
    const taskCounter = document.querySelector("#taskCounter");
    const clearCompletedBtn = document.querySelector("#clearCompletedBtn");

    const getTasks = () => JSON.parse(localStorage.getItem("todo_tasks")) || [];
    const saveTasks = (tasks) => localStorage.setItem("todo_tasks", JSON.stringify(tasks));

    // Update Penghitung Tugas & Tombol Clear (Fitur 1 & 2)
    const updateCounterAndButtons = (tasks) => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const uncompleted = total - completed;

        taskCounter.textContent = `Total: ${total} Tugas | Selesai: ${completed} | Belum Selesai: ${uncompleted}`;
        clearCompletedBtn.style.display = completed > 0 ? "block" : "none";
    };

    const renderTasks = () => {
        const tasks = getTasks();
        todoList.innerHTML = "";

        updateCounterAndButtons(tasks);

        if (tasks.length === 0) {
            todoList.innerHTML = "<p style='text-align:center; color:#64748b; font-size:13px; padding:10px;'>Belum ada tugas tersimpan.</p>";
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="todo-text">${task.text}</span>
                <div class="todo-actions">
                    <button class="action-btn complete-btn" data-index="${index}">
                        ${task.completed ? 'Batal' : 'Selesai'}
                    </button>
                    <button class="action-btn delete-btn" data-index="${index}">Hapus</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    // Tambah Tugas
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const tasks = getTasks();

        // 1. Validasi Batas Maksimal 5 Tugas
        if (tasks.length >= 5) {
            inputError.textContent = "Maksimal tugas adalah 5! Hapus tugas terlebih dahulu.";
            inputError.style.display = "block";
            taskInput.classList.add("error");
            return;
        }

        // 2. Validasi Minimal 3 Karakter
        if (taskText.length < 3) {
            inputError.textContent = "Tugas tidak boleh kosong atau kurang dari 3 karakter!";
            inputError.style.display = "block";
            taskInput.classList.add("error");
            return;
        }

        // Reset tampilan error jika validasi lolos
        taskInput.classList.remove("error");
        inputError.style.display = "none";

        // Simpan tugas baru
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        taskInput.value = "";
        renderTasks();
    });

    // Event Klik Selesai / Hapus dengan Konfirmasi (Fitur 3)
    todoList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;

        const tasks = getTasks();

        if (e.target.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.classList.contains("delete-btn")) {
            // Confirm Dialog sebelum hapus
            if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks();
            }
        }
    });

    // Tombol Bersihkan Tugas Selesai (Fitur 2)
    clearCompletedBtn.addEventListener("click", () => {
        const tasks = getTasks();
        const activeTasks = tasks.filter(task => !task.completed);
        saveTasks(activeTasks);
        renderTasks();
    });

    renderTasks();
});