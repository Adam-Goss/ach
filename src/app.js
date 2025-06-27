// ACH Digital Workbench App
// Main app logic will be implemented here

console.log('ACH Digital Workbench app loaded');

// --- HypothesisCanvas Component ---
const workbench = document.getElementById('workbench');

// Hypotheses state
let hypotheses = [];

function renderHypothesisCanvas() {
  // Clear previous
  let existing = document.getElementById('hypothesis-canvas');
  if (existing) existing.remove();

  // Container
  const container = document.createElement('section');
  container.id = 'hypothesis-canvas';
  container.className = 'mb-10';

  // Header
  const header = document.createElement('div');
  header.className = 'mb-2';
  header.innerHTML = `<h2 class="text-xl font-bold text-[#1a2332] tracking-wide">Hypotheses</h2>`;
  container.appendChild(header);

  // Add Hypothesis Button
  const addBtn = document.createElement('button');
  addBtn.id = 'add-hypothesis-btn';
  addBtn.className = 'mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold shadow';
  addBtn.textContent = 'Add Hypothesis';
  container.appendChild(addBtn);

  // Hypotheses list
  const list = document.createElement('div');
  list.className = 'flex flex-wrap gap-6';
  hypotheses.forEach((hypo, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-[#f6f8fa] border border-gray-200 rounded-2xl shadow p-6 w-72 relative';
    card.innerHTML = `
      <input type="text" value="${hypo.title}" class="font-bold text-lg w-full mb-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white rounded" data-idx="${idx}" />
      <textarea class="w-full text-gray-700 mb-2 p-2 border border-gray-100 rounded resize-none outline-none focus:ring-2 focus:ring-blue-100 bg-white" rows="2" placeholder="Description (optional)" data-idx="${idx}">${hypo.description || ''}</textarea>
      <button class="absolute top-2 right-2 text-red-400 hover:text-red-700 text-xl" data-del="${idx}" title="Delete">&times;</button>
    `;
    list.appendChild(card);
  });
  container.appendChild(list);

  workbench.prepend(container);

  // Add event listeners
  addBtn.onclick = () => {
    hypotheses.push({
      id: Date.now().toString(),
      title: 'New Hypothesis',
      description: '',
      color: '',
      inconsistencyScore: 0
    });
    saveCurrentProject();
    renderHypothesisCanvas();
  };

  // Edit title/description
  list.querySelectorAll('input[type="text"]').forEach(input => {
    input.oninput = (e) => {
      const idx = +input.dataset.idx;
      hypotheses[idx].title = input.value;
      saveCurrentProject();
    };
    input.onblur = () => renderHypothesisCanvas();
  });
  list.querySelectorAll('textarea').forEach(textarea => {
    textarea.oninput = (e) => {
      const idx = +textarea.dataset.idx;
      hypotheses[idx].description = textarea.value;
      saveCurrentProject();
    };
    textarea.onblur = () => renderHypothesisCanvas();
  });
  // Delete
  list.querySelectorAll('button[data-del]').forEach(btn => {
    btn.onclick = () => {
      const idx = +btn.dataset.del;
      hypotheses.splice(idx, 1);
      saveCurrentProject();
      renderHypothesisCanvas();
    };
  });
}

// Initial render
// renderHypothesisCanvas();

// --- EvidenceLocker Component ---
let evidenceList = [];

function renderEvidenceLocker() {
  // Remove previous
  let existing = document.getElementById('evidence-locker');
  if (existing) existing.remove();

  // Container
  const container = document.createElement('section');
  container.id = 'evidence-locker';
  container.className = 'mb-10';

  // Header
  const header = document.createElement('div');
  header.className = 'mb-2';
  header.innerHTML = `<h2 class="text-xl font-bold text-[#1a2332] tracking-wide">Evidence Locker</h2>`;
  container.appendChild(header);

  // Add Evidence Button
  const addBtn = document.createElement('button');
  addBtn.id = 'add-evidence-btn';
  addBtn.className = 'mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold shadow';
  addBtn.textContent = 'Add Evidence';
  container.appendChild(addBtn);

  // Evidence list
  const list = document.createElement('div');
  list.className = 'flex flex-wrap gap-6';
  evidenceList.forEach((ev, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-[#f6f8fa] border border-gray-200 rounded-2xl shadow p-6 w-96 relative';
    card.innerHTML = `
      <input type="text" value="${ev.statement}" placeholder="Evidence statement" class="font-bold text-base w-full mb-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white rounded" data-idx="${idx}" data-field="statement" />
      <input type="text" value="${ev.source}" placeholder="Source (URL, report, etc.)" class="w-full text-gray-700 mb-2 p-2 border border-gray-100 rounded outline-none focus:ring-2 focus:ring-blue-100 bg-white" data-idx="${idx}" data-field="source" />
      <div class="flex items-center mb-2 gap-2">
        <label class="text-sm text-[#1a2332]">Source Reliability:</label>
        <select class="p-1 border rounded bg-white" data-idx="${idx}" data-field="sourceReliability">
          <option value="A" ${ev.sourceReliability === 'A' ? 'selected' : ''}>A (Completely reliable)</option>
          <option value="B" ${ev.sourceReliability === 'B' ? 'selected' : ''}>B (Usually reliable)</option>
          <option value="C" ${ev.sourceReliability === 'C' ? 'selected' : ''}>C (Fairly reliable)</option>
          <option value="D" ${ev.sourceReliability === 'D' ? 'selected' : ''}>D (Not usually reliable)</option>
          <option value="E" ${ev.sourceReliability === 'E' ? 'selected' : ''}>E (Unreliable)</option>
          <option value="F" ${ev.sourceReliability === 'F' ? 'selected' : ''}>F (Cannot be judged)</option>
        </select>
      </div>
      <div class="flex items-center mb-2 gap-2">
        <label class="text-sm text-[#1a2332]">Information Credibility:</label>
        <select class="p-1 border rounded bg-white" data-idx="${idx}" data-field="infoCredibility">
          <option value="1" ${ev.infoCredibility === '1' ? 'selected' : ''}>1 (Confirmed by other sources)</option>
          <option value="2" ${ev.infoCredibility === '2' ? 'selected' : ''}>2 (Probably true)</option>
          <option value="3" ${ev.infoCredibility === '3' ? 'selected' : ''}>3 (Possibly true)</option>
          <option value="4" ${ev.infoCredibility === '4' ? 'selected' : ''}>4 (Doubtful)</option>
          <option value="5" ${ev.infoCredibility === '5' ? 'selected' : ''}>5 (Improbable)</option>
          <option value="6" ${ev.infoCredibility === '6' ? 'selected' : ''}>6 (Cannot be judged)</option>
        </select>
      </div>
      <button class="absolute top-2 right-2 text-red-400 hover:text-red-700 text-xl" data-del="${idx}" title="Delete">&times;</button>
    `;
    list.appendChild(card);
  });
  container.appendChild(list);

  // Insert below HypothesisCanvas
  const hypoCanvas = document.getElementById('hypothesis-canvas');
  if (hypoCanvas && hypoCanvas.nextSibling) {
    workbench.insertBefore(container, hypoCanvas.nextSibling);
  } else {
    workbench.appendChild(container);
  }

  // Add event listeners
  addBtn.onclick = () => {
    evidenceList.push({
      id: Date.now().toString(),
      statement: '',
      source: '',
      sourceReliability: 'C',
      infoCredibility: '3',
      diagnosticityScore: 0
    });
    saveCurrentProject();
    renderEvidenceLocker();
  };

  // Edit fields
  list.querySelectorAll('input[type="text"], select').forEach(input => {
    input.oninput = () => {
      const idx = +input.dataset.idx;
      const field = input.dataset.field;
      evidenceList[idx][field] = input.value;
      saveCurrentProject();
    };
    input.onblur = () => renderEvidenceLocker();
  });
  // Delete
  list.querySelectorAll('button[data-del]').forEach(btn => {
    btn.onclick = () => {
      const idx = +btn.dataset.del;
      evidenceList.splice(idx, 1);
      saveCurrentProject();
      renderEvidenceLocker();
    };
  });
}

// Initial render
// renderEvidenceLocker();

// --- ACH_Matrix Component ---
const CONSISTENCY_STATES = [
  { label: 'CC', color: 'bg-green-300 text-green-900', tooltip: 'Very Consistent', value: -2 },
  { label: 'C', color: 'bg-green-100 text-green-700', tooltip: 'Consistent', value: -1 },
  { label: 'N/A', color: 'bg-gray-100 text-gray-700', tooltip: 'Not Applicable', value: 0 },
  { label: 'I', color: 'bg-red-100 text-red-700', tooltip: 'Inconsistent', value: 1 },
  { label: 'II', color: 'bg-red-400 text-red-900', tooltip: 'Very Inconsistent', value: 2 }
];

// Matrix state: evidenceList.length x hypotheses.length
let matrixRatings = [];

function ensureMatrixSize() {
  // Ensure matrix matches evidence/hypotheses
  while (matrixRatings.length < evidenceList.length) {
    matrixRatings.push(Array(hypotheses.length).fill(2)); // Default to N/A
  }
  while (matrixRatings.length > evidenceList.length) {
    matrixRatings.pop();
  }
  for (let i = 0; i < matrixRatings.length; ++i) {
    while (matrixRatings[i].length < hypotheses.length) {
      matrixRatings[i].push(2); // Default to N/A
    }
    while (matrixRatings[i].length > hypotheses.length) {
      matrixRatings[i].pop();
    }
  }
}

// --- Sensitivity Analysis: Evidence Activation ---
let evidenceActive = [];

function ensureEvidenceActiveSize() {
  while (evidenceActive.length < evidenceList.length) evidenceActive.push(true);
  while (evidenceActive.length > evidenceList.length) evidenceActive.pop();
}

function renderACHMatrix() {
  ensureMatrixSize();
  ensureEvidenceActiveSize();
  // Remove previous
  let existing = document.getElementById('ach-matrix');
  if (existing) existing.remove();

  // Container
  const container = document.createElement('section');
  container.id = 'ach-matrix';
  container.className = 'mb-10';

  // Header
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between mb-4';
  header.innerHTML = `<h2 class="text-xl font-bold text-[#1a2332] tracking-wide">ACH Matrix</h2>`;
  container.appendChild(header);

  // Table
  const tableWrap = document.createElement('div');
  tableWrap.className = 'overflow-auto max-w-full';
  const table = document.createElement('table');
  table.className = 'min-w-max border-collapse bg-white rounded-xl shadow';

  // Table Head
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.appendChild(document.createElement('th')); // Empty corner
  hypotheses.forEach(hypo => {
    const th = document.createElement('th');
    th.className = 'sticky top-0 bg-white z-10 px-4 py-2 border-b font-bold text-[#1a2332]';
    th.textContent = hypo.title;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Table Body
  const tbody = document.createElement('tbody');
  evidenceList.forEach((ev, rowIdx) => {
    const tr = document.createElement('tr');
    tr.className = evidenceActive[rowIdx] ? '' : 'opacity-40 bg-gray-100';
    // Evidence label (sticky) + eye icon
    const evTh = document.createElement('th');
    evTh.className = 'sticky left-0 bg-white z-10 px-2 py-2 border-r text-sm max-w-xs w-48 text-left flex items-center gap-2 text-[#1a2332]';
    evTh.innerHTML = `
      <button title="Toggle evidence" class="focus:outline-none" style="font-size:1.1em;">
        <span>${evidenceActive[rowIdx] ? '👁️' : '🚫'}</span>
      </button>
      <span>${ev.statement || `Evidence ${rowIdx+1}`}</span>
    `;
    // Eye icon toggle
    evTh.querySelector('button').onclick = () => {
      evidenceActive[rowIdx] = !evidenceActive[rowIdx];
      renderACHMatrix();
      renderResultsDashboard();
    };
    tr.appendChild(evTh);
    // Matrix cells
    hypotheses.forEach((hypo, colIdx) => {
      const td = document.createElement('td');
      const stateIdx = matrixRatings[rowIdx]?.[colIdx] ?? 2; // Default to N/A
      const state = CONSISTENCY_STATES[stateIdx];
      td.className = `px-4 py-2 text-center border ${state.color} font-semibold transition-colors text-[#1a2332]`;
      td.title = state.tooltip;
      td.textContent = state.label;
      if (evidenceActive[rowIdx]) {
        td.classList.add('cursor-pointer');
        td.onclick = () => {
          matrixRatings[rowIdx][colIdx] = (stateIdx + 1) % CONSISTENCY_STATES.length;
          renderACHMatrix();
          renderResultsDashboard();
        };
      } else {
        td.classList.remove('cursor-pointer');
        td.onclick = null;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  container.appendChild(tableWrap);

  // Insert below EvidenceLocker
  const evidenceLocker = document.getElementById('evidence-locker');
  if (evidenceLocker && evidenceLocker.nextSibling) {
    workbench.insertBefore(container, evidenceLocker.nextSibling);
  } else {
    workbench.appendChild(container);
  }
}

// Patch renders to update matrix
const _oldRenderHypothesisCanvas = renderHypothesisCanvas;
renderHypothesisCanvas = function() {
  _oldRenderHypothesisCanvas();
  renderACHMatrix();
};
const _oldRenderEvidenceLocker = renderEvidenceLocker;
renderEvidenceLocker = function() {
  ensureEvidenceActiveSize();
  _oldRenderEvidenceLocker();
  renderACHMatrix();
};

// Initial render
// renderACHMatrix();

// --- ResultsDashboard Component ---
function calculateInconsistencyScores() {
  // For each hypothesis (column), sum weighted inconsistency values, only for active evidence
  return hypotheses.map((hypo, colIdx) => {
    let score = 0;
    for (let rowIdx = 0; rowIdx < evidenceList.length; ++rowIdx) {
      if (!evidenceActive[rowIdx]) continue;
      const stateIdx = matrixRatings[rowIdx]?.[colIdx] ?? 2; // Default to N/A
      score += CONSISTENCY_STATES[stateIdx].value;
    }
    return { ...hypo, inconsistencyScore: score };
  });
}

function renderResultsDashboard() {
  // Remove previous
  let existing = document.getElementById('results-dashboard');
  if (existing) existing.remove();

  // Container
  const container = document.createElement('section');
  container.id = 'results-dashboard';
  container.className = 'mb-10';

  // Header
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between mb-4';
  header.innerHTML = `<h2 class="text-xl font-bold text-[#1a2332] tracking-wide">Results Dashboard</h2>`;
  container.appendChild(header);

  // Calculate and sort
  const scored = calculateInconsistencyScores().slice().sort((a, b) => a.inconsistencyScore - b.inconsistencyScore);
  // The max possible score is the number of active evidence rows
  const maxPossibleScore = evidenceActive.filter(Boolean).length || 1;

  // --- Most Likely Hypotheses ---
  const minScore = scored.length > 0 ? scored[0].inconsistencyScore : null;
  const mostLikely = scored.filter(h => h.inconsistencyScore === minScore);
  const likelySection = document.createElement('div');
  likelySection.className = 'mb-8 flex-1';
  likelySection.innerHTML = `<h3 class="text-lg font-semibold mb-2 text-[#1a2332]">Most Likely Hypotheses</h3>`;
  const likelyList = document.createElement('ol');
  likelyList.className = 'mb-2';
  mostLikely.forEach((hypo, idx) => {
    const li = document.createElement('li');
    li.className = 'flex items-center gap-4 mb-2';
    li.innerHTML = `
      <span class="w-6 text-right font-bold">${idx + 1}.</span>
      <span class="flex-1">${hypo.title} <span class="text-xs text-gray-500 ml-2">(Inconsistency: ${hypo.inconsistencyScore})</span></span>
    `;
    likelyList.appendChild(li);
  });
  likelySection.appendChild(likelyList);

  // --- Key Pieces of Evidence ---
  const keyEvidenceSection = document.createElement('div');
  keyEvidenceSection.className = 'mb-4 flex-1';
  keyEvidenceSection.innerHTML = `<h3 class="text-lg font-semibold mb-2 text-[#1a2332]">Key Pieces of Evidence</h3>`;
  const keyList = document.createElement('ol');
  keyList.className = 'mb-2 list-decimal pl-6';

  // Collect and score key evidence
  let keyEvidenceArr = [];
  evidenceList.forEach((ev, rowIdx) => {
    if (!evidenceActive[rowIdx]) return;
    let count = 0;
    for (let colIdx = 0; colIdx < hypotheses.length; ++colIdx) {
      const stateIdx = matrixRatings[rowIdx]?.[colIdx] ?? 2;
      const label = CONSISTENCY_STATES[stateIdx].label;
      if (label === 'C' || label === 'CC' || label === 'I' || label === 'II') {
        count++;
      }
    }
    if (count > 0) {
      keyEvidenceArr.push({ ev, count });
    }
  });
  // Sort by count descending
  keyEvidenceArr.sort((a, b) => b.count - a.count);
  keyEvidenceArr.forEach(({ ev }) => {
    const admiralty = `${ev.sourceReliability || ''}${ev.infoCredibility || ''}`;
    const li = document.createElement('li');
    li.innerHTML = `<span class="font-semibold">${ev.statement}</span> <span class="text-xs text-gray-500">(Admiralty: ${admiralty})</span>`;
    keyList.appendChild(li);
  });
  if (!keyList.hasChildNodes()) {
    const li = document.createElement('li');
    li.innerHTML = '<span class="text-gray-400">No key evidence identified.</span>';
    keyList.appendChild(li);
  }
  keyEvidenceSection.appendChild(keyList);

  // --- Two-column flex layout ---
  const flexRow = document.createElement('div');
  flexRow.className = 'flex flex-row gap-10';
  flexRow.appendChild(likelySection);
  flexRow.appendChild(keyEvidenceSection);
  container.appendChild(flexRow);

  // Insert below ACH_Matrix
  const achMatrix = document.getElementById('ach-matrix');
  if (achMatrix && achMatrix.nextSibling) {
    workbench.insertBefore(container, achMatrix.nextSibling);
  } else {
    workbench.appendChild(container);
  }
}

// Patch renders to update dashboard
const _oldRenderACHMatrix = renderACHMatrix;
renderACHMatrix = function() {
  _oldRenderACHMatrix();
  renderResultsDashboard();
};

// --- Project Management ---
let projects = [];
let currentProjectIdx = -1;

function makeBlankProject(name) {
  return {
    name: name || `Untitled Project ${projects.length + 1}`,
    hypotheses: [],
    evidenceList: [],
    matrixRatings: [],
    evidenceActive: [],
    analystConfidence: 80
  };
}

const STORAGE_KEY = 'ach-projects-v1';

function saveProjectsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects, currentProjectIdx }));
}

function loadProjectsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed.projects)) {
        projects = parsed.projects;
        currentProjectIdx = typeof parsed.currentProjectIdx === 'number' ? parsed.currentProjectIdx : 0;
      }
    } catch {}
  }
}

function saveCurrentProject() {
  if (currentProjectIdx >= 0 && projects[currentProjectIdx]) {
    projects[currentProjectIdx].hypotheses = JSON.parse(JSON.stringify(hypotheses));
    projects[currentProjectIdx].evidenceList = JSON.parse(JSON.stringify(evidenceList));
    projects[currentProjectIdx].matrixRatings = JSON.parse(JSON.stringify(matrixRatings));
    projects[currentProjectIdx].evidenceActive = JSON.parse(JSON.stringify(evidenceActive));
    saveProjectsToStorage();
  }
}

function loadProject(idx) {
  if (idx < 0 || idx >= projects.length) return;
  if (currentProjectIdx !== idx) saveCurrentProject();
  currentProjectIdx = idx;
  const p = projects[idx];
  hypotheses = JSON.parse(JSON.stringify(p.hypotheses));
  evidenceList = JSON.parse(JSON.stringify(p.evidenceList));
  matrixRatings = JSON.parse(JSON.stringify(p.matrixRatings));
  evidenceActive = JSON.parse(JSON.stringify(p.evidenceActive));
  renderHypothesisCanvas();
  renderEvidenceLocker();
  renderACHMatrix();
  renderResultsDashboard();
  renderProjectList();
  saveProjectsToStorage();
}

function renderProjectList() {
  const list = document.getElementById('project-list');
  if (!list) return;
  list.innerHTML = '';
  projects.forEach((proj, idx) => {
    const li = document.createElement('li');
    li.className = `mb-2 px-2 py-1 rounded cursor-pointer ${idx === currentProjectIdx ? 'bg-[#C6372F] text-white font-bold' : 'bg-[#C6372F] text-white hover:opacity-80'}`;
    li.textContent = proj.name;
    li.onclick = () => loadProject(idx);
    li.ondblclick = (e) => {
      e.stopPropagation();
      const newName = prompt('Rename project:', proj.name);
      if (newName && newName.trim()) {
        proj.name = newName.trim();
        renderProjectList();
        saveProjectsToStorage();
      }
    };
    list.appendChild(li);
  });
}

function setupNewAnalysisButton() {
  let newAnalysisBtn = Array.from(document.querySelectorAll('button')).find(
    btn => btn.textContent && btn.textContent.trim() === 'New Analysis'
  );
  if (newAnalysisBtn) {
    newAnalysisBtn.onclick = () => {
      saveCurrentProject();
      const name = prompt('Enter project name:', `Untitled Project ${projects.length + 1}`);
      if (name === null) return;
      const newProj = makeBlankProject(name);
      projects.push(newProj);
      loadProject(projects.length - 1);
      saveProjectsToStorage();
    };
  }
}

// --- Add Clear Project button ---
function setupClearProjectButton() {
  let sidebar = document.querySelector('aside');
  if (!sidebar) return;
  let clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Project';
  clearBtn.className = 'px-4 py-2 bg-gray-200 text-[#C6372F] rounded hover:bg-gray-300 transition font-semibold';
  clearBtn.onclick = () => {
    if (!confirm('Are you sure you want to clear all data in this project?')) return;
    hypotheses = [];
    evidenceList = [];
    matrixRatings = [];
    evidenceActive = [];
    saveCurrentProject();
    renderHypothesisCanvas();
    renderEvidenceLocker();
    renderACHMatrix();
    renderResultsDashboard();
  };
  // Move below the projects list
  let projectList = sidebar.querySelector('ul');
  if (projectList) {
    // Add margin to top for spacing
    clearBtn.classList.add('mt-8');
    projectList.insertAdjacentElement('afterend', clearBtn);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadProjectsFromStorage();
  setupNewAnalysisButton();
  setupClearProjectButton();
  renderProjectList();
  // Create initial project if none exist
  if (projects.length === 0) {
    projects.push(makeBlankProject('Untitled Project 1'));
    loadProject(0);
  } else {
    loadProject(currentProjectIdx >= 0 ? currentProjectIdx : 0);
  }
});

