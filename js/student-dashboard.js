// CAMS frontend prototype. This file uses local sample data only—no API or backend.
const sampleTimetable = {
  Monday: [
    ["09:00 AM – 10:00 AM", "Data Structures", "Prof. S. Sharma", "C-101"],
    ["10:00 AM – 11:00 AM", "Discrete Mathematics", "Dr. A. Verma", "B-204"],
    ["11:30 AM – 12:30 PM", "Digital Electronics", "Prof. R. Gupta", "Lab 2"],
    ["01:30 PM – 02:30 PM", "Database Systems", "Prof. N. Singh", "C-203"],
    ["02:30 PM – 03:30 PM", "Web Development", "Lab Faculty", "Computer Lab"],
    ["03:30 PM – 04:30 PM", "Technical Communication", "Ms. P. Jain", "A-105"],
  ],
  Tuesday: [
    ["09:00 AM – 10:00 AM", "Discrete Mathematics", "Dr. A. Verma", "B-204"],
    ["10:00 AM – 11:00 AM", "Data Structures", "Prof. S. Sharma", "C-101"],
    ["11:30 AM – 12:30 PM", "Database Systems", "Prof. N. Singh", "C-203"],
    ["01:30 PM – 02:30 PM", "Digital Electronics", "Prof. R. Gupta", "Lab 2"],
    ["02:30 PM – 03:30 PM", "Web Development", "Lab Faculty", "Computer Lab"],
  ],
  Wednesday: [
    ["09:00 AM – 10:00 AM", "Digital Electronics", "Prof. R. Gupta", "Lab 2"],
    ["10:00 AM – 11:00 AM", "Database Systems", "Prof. N. Singh", "C-203"],
    ["11:30 AM – 12:30 PM", "Data Structures", "Prof. S. Sharma", "C-101"],
    ["01:30 PM – 02:30 PM", "Discrete Mathematics", "Dr. A. Verma", "B-204"],
    ["02:30 PM – 03:30 PM", "Technical Communication", "Ms. P. Jain", "A-105"],
  ],
  Thursday: [
    ["09:00 AM – 10:00 AM", "Web Development", "Lab Faculty", "Computer Lab"],
    ["10:00 AM – 11:00 AM", "Data Structures", "Prof. S. Sharma", "C-101"],
    ["11:30 AM – 12:30 PM", "Discrete Mathematics", "Dr. A. Verma", "B-204"],
    ["01:30 PM – 02:30 PM", "Database Systems", "Prof. N. Singh", "C-203"],
    ["02:30 PM – 03:30 PM", "Digital Electronics", "Prof. R. Gupta", "Lab 2"],
  ],
  Friday: [
    ["09:00 AM – 10:00 AM", "Database Systems", "Prof. N. Singh", "C-203"],
    ["10:00 AM – 11:00 AM", "Digital Electronics", "Prof. R. Gupta", "Lab 2"],
    ["11:30 AM – 12:30 PM", "Web Development", "Lab Faculty", "Computer Lab"],
    ["01:30 PM – 02:30 PM", "Data Structures", "Prof. S. Sharma", "C-101"],
    ["02:30 PM – 03:30 PM", "Discrete Mathematics", "Dr. A. Verma", "B-204"],
  ],
};

const assignments = [
  {
    id: 1,
    title: "Data Structures Assignment",
    subject: "Data Structures",
    due: "12 Oct 2026",
    status: "pending",
    description:
      "Implement a linked list and demonstrate insertion and deletion.",
  },
  {
    id: 2,
    title: "Database Systems Quiz",
    subject: "Database Systems",
    due: "14 Oct 2026",
    status: "pending",
    description:
      "Revise normalization, keys and SQL queries from Chapters 3–5.",
  },
  {
    id: 3,
    title: "Web Development Project",
    subject: "Web Development",
    due: "18 Oct 2026",
    status: "pending",
    description: "Prepare and submit the responsive frontend prototype.",
  },
  {
    id: 4,
    title: "Array Programs",
    subject: "Data Structures",
    due: "07 Oct 2026",
    status: "completed",
    description:
      "Practice array traversal, reverse, maximum and minimum programs.",
  },
  {
    id: 5,
    title: "Logic Gates Worksheet",
    subject: "Digital Electronics",
    due: "05 Oct 2026",
    status: "completed",
    description: "Complete the basic logic gates worksheet.",
  },
];

const notes = [
  {
    title: "Linked List — Class Notes",
    subject: "Data Structures",
    type: "PDF",
    kind: "pdf",
    description: "Singly linked list, insertion, deletion and traversal.",
    size: "1.8 MB",
  },
  {
    title: "Array & Sorting Revision",
    subject: "Data Structures",
    type: "PDF",
    kind: "pdf",
    description: "Array programs, bubble sort and selection sort.",
    size: "1.2 MB",
  },
  {
    title: "K-Map Practice Sheet",
    subject: "Digital Electronics",
    type: "PDF",
    kind: "pdf",
    description: "Boolean expressions and Karnaugh map examples.",
    size: "980 KB",
  },
  {
    title: "Complex Numbers & Matrices",
    subject: "Discrete Mathematics",
    type: "DOC",
    kind: "doc",
    description: "Solved examples and quick revision points.",
    size: "740 KB",
  },
  {
    title: "SQL Basics & Normalization",
    subject: "Database Systems",
    type: "PDF",
    kind: "pdf",
    description: "SQL commands, keys and normalization summary.",
    size: "1.4 MB",
  },
  {
    title: "HTML & CSS Quick Guide",
    subject: "Web Development",
    type: "DOC",
    kind: "doc",
    description: "Semantic HTML, CSS layout and responsive basics.",
    size: "860 KB",
  },
];

const notices = [
  {
    title: "Mid-semester examination schedule",
    category: "academic",
    label: "Academic",
    date: "10 Oct 2026",
    source: "Examination Cell",
    icon: "fa-calendar-days",
    description:
      "The tentative mid-semester examination schedule will be shared with students. Keep checking the official college notice board for confirmed dates and room details.",
  },
  {
    title: "Project review submissions",
    category: "academic",
    label: "Academic",
    date: "08 Oct 2026",
    source: "Department of Computer Science",
    icon: "fa-laptop-code",
    description:
      "Students should keep their project synopsis, current progress and demonstration ready for the upcoming review.",
  },
  {
    title: "Library book return reminder",
    category: "academic",
    label: "Academic",
    date: "06 Oct 2026",
    source: "Central Library",
    icon: "fa-book",
    description:
      "Please check your issued books and return any items that are due. This is a sample reminder for the prototype.",
  },
  {
    title: "Coding club meetup",
    category: "events",
    label: "Event",
    date: "04 Oct 2026",
    source: "Student Activities",
    icon: "fa-code",
    description:
      "A sample student meetup announcement for discussing programming practice, projects and peer learning.",
  },
  {
    title: "Innovation and entrepreneurship session",
    category: "events",
    label: "Event",
    date: "02 Oct 2026",
    source: "E-Cell",
    icon: "fa-lightbulb",
    description:
      "A sample session notice for students interested in startup ideas, product thinking and entrepreneurship.",
  },
];

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
let toastTimer;

function showToast(message) {
  $("#toastMessage").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 3000);
}

function closeDrawer() {
  $("#sidebar").classList.remove("open");
  $("#drawerBackdrop").classList.remove("show");
  document.body.classList.remove("drawer-open");
}

function openDrawer() {
  $("#sidebar").classList.add("open");
  $("#drawerBackdrop").classList.add("show");
  document.body.classList.add("drawer-open");
}

function showView(viewName) {
  const target = $(`#view-${viewName}`);
  if (!target) return;
  $$(".page-view").forEach((view) =>
    view.classList.toggle("active", view === target),
  );
  $$(".nav-item[data-view]").forEach((item) =>
    item.classList.toggle("active", item.dataset.view === viewName),
  );
  $("#breadcrumbCurrent").textContent = target.dataset.title || "Dashboard";
  closeDrawer();
  $("#globalSearch").value = "";
  applyGlobalSearch("");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

$("#menuToggle").addEventListener("click", openDrawer);
$("#drawerClose").addEventListener("click", closeDrawer);
$("#drawerBackdrop").addEventListener("click", closeDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrawer();
});

$("#logoutButton").addEventListener("click", () =>
  showToast(
    "This is a frontend demo. Login and logout are not connected to an account.",
  ),
);

$("#notificationButton").addEventListener("click", () => {
  showView("notices");
  showToast("Showing sample college notices.");
});

function renderTimetable(day = "Monday") {
  $("#timetableDayTitle").textContent = `${day}'s classes`;
  $("#timetableList").innerHTML = sampleTimetable[day]
    .map(
      ([time, subject, teacher, room]) => `
    <div class="timetable-row" data-searchable>
      <div class="timetable-time">${time.replace(" – ", "<small>– ") + "</small>"}</div>
      <span class="timetable-color"></span>
      <div class="timetable-subject"><strong>${subject}</strong><span>${teacher}</span></div>
      <span class="room-chip"><i class="fa-solid fa-location-dot"></i> ${room}</span>
    </div>`,
    )
    .join("");
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const classesToday = sampleTimetable[dayName];
  if (classesToday && classesToday.length) {
    const time = now.getHours() * 60 + now.getMinutes();
    const current = classesToday.find((item) => {
      const match = item[0].match(
        /(\d{1,2}):(\d{2})\s*(AM|PM)\s*–\s*(\d{1,2}):(\d{2})\s*(AM|PM)/,
      );
      if (!match) return false;
      const toMinutes = (h, m, ap) =>
        ((Number(h) % 12) + (ap === "PM" ? 12 : 0)) * 60 + Number(m);
      return (
        time >= toMinutes(match[1], match[2], match[3]) &&
        time < toMinutes(match[4], match[5], match[6])
      );
    });
    if (current) {
      $("#currentLectureTitle").textContent = current[1];
      $("#currentLectureTeacher").textContent =
        `${current[2]} · Room ${current[3]}`;
      $("#currentLectureTime").textContent = current[0];
      $("#currentLectureRoom").textContent = current[3];
      $("#lectureStatus").textContent = "Ongoing";
    } else {
      $("#currentLectureTitle").textContent = "No ongoing lecture";
      $("#currentLectureTeacher").textContent =
        "Check your sample timetable for the next class.";
      $("#currentLectureTime").textContent = "No class right now";
      $("#currentLectureRoom").textContent = "—";
      $("#lectureStatus").textContent = "Between classes";
    }
  }
}
$$("[data-day]").forEach((button) =>
  button.addEventListener("click", () => {
    $$("[data-day]").forEach((tab) =>
      tab.classList.toggle("active", tab === button),
    );
    renderTimetable(button.dataset.day);
  }),
);
renderTimetable();

function renderAssignments(filter = "all") {
  const filtered = assignments.filter(
    (item) => filter === "all" || item.status === filter,
  );
  $("#assignmentTable").innerHTML = filtered
    .map(
      (item) => `
    <tr data-searchable>
      <td>${item.title}</td><td>${item.subject}</td><td>${item.due}</td>
      <td><span class="status-badge ${item.status}">${item.status === "pending" ? "Pending" : "Completed"}</span></td>
      <td><button class="small-action" data-assignment-action="${item.id}">${item.status === "pending" ? "Mark complete" : "View details"}</button></td>
    </tr>`,
    )
    .join("");
  if (!filtered.length)
    $("#assignmentTable").innerHTML =
      `<tr><td colspan="5">No assignments match this filter.</td></tr>`;
  $$("[data-assignment-action]").forEach((button) =>
    button.addEventListener("click", () => {
      const item = assignments.find(
        (assignment) =>
          assignment.id === Number(button.dataset.assignmentAction),
      );
      if (item.status === "pending") {
        item.status = "completed";
        renderAssignments($("#assignmentFilter").value);
        showToast(`${item.title} marked complete in this demo.`);
      } else {
        showToast(item.description);
      }
    }),
  );
}
$("#assignmentFilter").addEventListener("change", (event) =>
  renderAssignments(event.target.value),
);
renderAssignments();

function renderNotes() {
  const query = $("#notesSearch").value.trim().toLowerCase();
  const subject = $("#notesSubjectFilter").value;
  const filtered = notes.filter(
    (note) =>
      (subject === "all" || note.subject === subject) &&
      `${note.title} ${note.subject} ${note.description}`
        .toLowerCase()
        .includes(query),
  );
  $("#notesGrid").innerHTML = filtered
    .map(
      (note, index) => `
    <article class="note-card" data-searchable>
      <div class="note-card-top"><span class="file-icon ${note.kind}"><i class="fa-regular ${note.kind === "pdf" ? "fa-file-pdf" : "fa-file-word"}"></i></span><span class="file-type">${note.type}</span></div>
      <h3>${note.title}</h3><p>${note.description}</p>
      <div class="note-card-bottom"><span class="note-subject">${note.subject} · ${note.size}</span><button class="note-download" data-note-index="${index}"><i class="fa-solid fa-download"></i> Download</button></div>
    </article>`,
    )
    .join("");
  if (!filtered.length)
    $("#notesGrid").innerHTML =
      `<div class="empty-state"><i class="fa-regular fa-folder-open"></i>No notes found. Try another search.</div>`;
  $$("[data-note-index]").forEach((button) =>
    button.addEventListener("click", () =>
      showToast(
        "Sample note only — add a real PDF/DOC file to enable downloading.",
      ),
    ),
  );
}
$("#notesSearch").addEventListener("input", renderNotes);
$("#notesSubjectFilter").addEventListener("change", renderNotes);
renderNotes();

function renderNotices(filter = "all") {
  const filtered = notices.filter(
    (notice) => filter === "all" || notice.category === filter,
  );
  $("#noticeFeed").innerHTML = filtered
    .map(
      (notice) => `
    <article class="notice-card" data-searchable>
      <span class="notice-card-icon"><i class="fa-solid ${notice.icon}"></i></span>
      <div class="notice-card-content"><h3>${notice.title}</h3><span class="notice-meta">${notice.source} · ${notice.date}</span><p>${notice.description}</p></div>
      <span class="notice-category">${notice.label}</span>
    </article>`,
    )
    .join("");
}
$$("[data-notice-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    $$("[data-notice-filter]").forEach((tab) =>
      tab.classList.toggle("active", tab === button),
    );
    renderNotices(button.dataset.noticeFilter);
  }),
);
renderNotices();

function applyGlobalSearch(query) {
  const activeView = $(".page-view.active");
  if (!activeView) return;
  const normalized = query.trim().toLowerCase();
  $$("[data-searchable]", activeView).forEach((item) => {
    item.style.display =
      !normalized || item.textContent.toLowerCase().includes(normalized)
        ? ""
        : "none";
  });
}
$("#globalSearch").addEventListener("input", (event) =>
  applyGlobalSearch(event.target.value),
);

let profileEditing = false;
$("#editProfileButton").addEventListener("click", () => {
  profileEditing = !profileEditing;
  $$("input", $("#profileForm")).forEach(
    (input) => (input.disabled = !profileEditing),
  );
  $("#saveProfileButton").disabled = !profileEditing;
  $("#editProfileButton").innerHTML = profileEditing
    ? '<i class="fa-solid fa-xmark"></i> Cancel editing'
    : '<i class="fa-regular fa-pen-to-square"></i> Edit details';
  $("#profileFormHint").textContent = profileEditing
    ? "Edit the fields and select Save changes."
    : "Fields are locked until you select Edit details.";
});
$$("input", $("#profileForm")).forEach((input) => (input.disabled = true));
$("#profileForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").trim();
  if (name) {
    $(".student-mini-info strong").textContent = name;
    $(".profile-card h2").textContent = name;
    $("#breadcrumbCurrent").textContent = "Profile";
  }
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  $$(".avatar, .profile-avatar").forEach(
    (avatar) => (avatar.textContent = initials),
  );
  profileEditing = false;
  $$("input", $("#profileForm")).forEach((input) => (input.disabled = true));
  $("#saveProfileButton").disabled = true;
  $("#editProfileButton").innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i> Edit details';
  $("#profileFormHint").textContent =
    "Changes are shown in this page only; no database is connected.";
  showToast("Profile updated for this demo session.");
});

$$("[data-view]").forEach((button) => {
  if (button.matches(".top-profile"))
    button.addEventListener("click", () => showView("profile"));
});
