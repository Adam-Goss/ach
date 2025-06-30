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
  header.innerHTML = `<h2 class=\"text-xl font-bold text-[#1a2332] tracking-wide\">💡 Hypotheses</h2>`;
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
    card.className = 'bg-white/80 border border-gray-200 rounded-2xl shadow p-4 w-64 relative transition-all duration-200 hover:shadow-xl';
    card.innerHTML = `
      <input type="text" value="${hypo.title}" class="font-bold text-base w-full mb-2 outline-none focus:ring-2 focus:ring-green-300 bg-white rounded-lg transition-all duration-200" data-idx="${idx}" />
      <textarea class="w-full text-gray-700 mb-2 p-2 border border-gray-100 rounded-lg resize-none outline-none focus:ring-2 focus:ring-green-100 bg-white transition-all duration-200 text-sm" rows="2" placeholder="Description (optional)" data-idx="${idx}">${hypo.description || ''}</textarea>
      <button class="absolute top-2 right-2 text-red-400 hover:text-red-700 text-lg transition-all duration-200" data-del="${idx}" title="Delete">&times;</button>
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
  header.innerHTML = `<h2 class=\"text-xl font-bold text-[#1a2332] tracking-wide\">🗃️ Evidence Locker</h2>`;
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
    card.className = 'bg-white/80 border border-gray-200 rounded-2xl shadow p-4 w-80 relative transition-all duration-200 hover:shadow-xl overflow-hidden';
    card.innerHTML = `
      <input type="text" value="${ev.statement}" placeholder="Evidence statement" class="font-bold text-sm w-full mb-2 outline-none focus:ring-2 focus:ring-green-300 bg-white rounded-lg transition-all duration-200 truncate" data-idx="${idx}" data-field="statement" />
      <input type="text" value="${ev.source}" placeholder="Source (URL, report, etc.)" class="w-full text-gray-700 mb-2 p-2 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-green-100 bg-white transition-all duration-200 text-sm truncate" data-idx="${idx}" data-field="source" />
      <div class="flex flex-col gap-2 mb-2">
        <div class="flex items-center gap-2">
          <label class="text-sm text-[#1a2332]">Source Reliability:</label>
          <select class="p-1 border rounded-lg bg-white transition-all duration-200 text-sm w-40 max-w-full" data-idx="${idx}" data-field="sourceReliability">
            <option value="A" ${ev.sourceReliability === 'A' ? 'selected' : ''}>A (Completely reliable)</option>
            <option value="B" ${ev.sourceReliability === 'B' ? 'selected' : ''}>B (Usually reliable)</option>
            <option value="C" ${ev.sourceReliability === 'C' ? 'selected' : ''}>C (Fairly reliable)</option>
            <option value="D" ${ev.sourceReliability === 'D' ? 'selected' : ''}>D (Not usually reliable)</option>
            <option value="E" ${ev.sourceReliability === 'E' ? 'selected' : ''}>E (Unreliable)</option>
            <option value="F" ${ev.sourceReliability === 'F' ? 'selected' : ''}>F (Cannot be judged)</option>
          </select>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <label class="text-sm text-[#1a2332]">Information Credibility:</label>
          <select class="p-1 border rounded-lg bg-white transition-all duration-200 text-sm w-40 max-w-full" data-idx="${idx}" data-field="infoCredibility">
            <option value="1" ${ev.infoCredibility === '1' ? 'selected' : ''}>1 (Confirmed by other sources)</option>
            <option value="2" ${ev.infoCredibility === '2' ? 'selected' : ''}>2 (Probably true)</option>
            <option value="3" ${ev.infoCredibility === '3' ? 'selected' : ''}>3 (Possibly true)</option>
            <option value="4" ${ev.infoCredibility === '4' ? 'selected' : ''}>4 (Doubtful)</option>
            <option value="5" ${ev.infoCredibility === '5' ? 'selected' : ''}>5 (Improbable)</option>
            <option value="6" ${ev.infoCredibility === '6' ? 'selected' : ''}>6 (Cannot be judged)</option>
          </select>
        </div>
      </div>
      <button class="absolute top-2 right-2 text-red-400 hover:text-red-700 text-lg transition-all duration-200" data-del="${idx}" title="Delete">&times;</button>
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
  { label: 'CC', color: 'bg-emerald-500 text-white', tooltip: 'Very Consistent', value: -2, description: 'Evidence strongly supports this hypothesis' },
  { label: 'C', color: 'bg-green-400 text-white', tooltip: 'Consistent', value: -1, description: 'Evidence supports this hypothesis' },
  { label: 'N/A', color: 'bg-gray-200 text-gray-700', tooltip: 'Not Applicable', value: 0, description: 'Evidence is not relevant to this hypothesis' },
  { label: 'I', color: 'bg-orange-400 text-white', tooltip: 'Inconsistent', value: 1, description: 'Evidence contradicts this hypothesis' },
  { label: 'II', color: 'bg-red-500 text-white', tooltip: 'Very Inconsistent', value: 2, description: 'Evidence strongly contradicts this hypothesis' }
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

  // Header with legend
  const header = document.createElement('div');
  header.className = 'mb-6';
  header.innerHTML = `
    <div class="flex items-center justify-between mb-4 ach-matrix-header">
      <h2 class="text-2xl font-bold text-[#1a2332] tracking-wide flex items-center gap-3">
        <span class="text-3xl">🗂️</span>
        ACH Matrix
        <span class="text-sm font-normal text-gray-500 ml-2">(Click cells or press Enter/Space to cycle through ratings)</span>
      </h2>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Active Evidence:</span>
        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
          ${evidenceActive.filter(Boolean).length}/${evidenceList.length}
        </span>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
      <h3 class="text-sm font-semibold text-gray-700 mb-3">Consistency Ratings:</h3>
      <div class="flex flex-wrap gap-3 ach-matrix-legend">
        ${CONSISTENCY_STATES.map(state => `
          <div class="flex items-center gap-2 group relative">
            <div class="w-8 h-8 ${state.color} rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
              ${state.label}
            </div>
            <span class="text-sm text-gray-600">${state.tooltip}</span>
            <div class="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
              ${state.description}
              <div class="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  container.appendChild(header);

  // Matrix container with better styling
  const matrixContainer = document.createElement('div');
  matrixContainer.className = 'bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden';

  // Table wrapper with improved scrolling and responsive design
  const tableWrap = document.createElement('div');
  tableWrap.className = 'overflow-auto max-w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 matrix-scroll-x';
  const table = document.createElement('table');
  table.className = 'w-full border-collapse';
  table.setAttribute('role', 'grid');
  table.setAttribute('aria-label', 'ACH Matrix - Evidence vs Hypotheses Consistency Ratings');

  // Table Head with improved styling
  const thead = document.createElement('thead');
  thead.className = 'bg-gradient-to-r from-gray-50 to-gray-100';
  const headRow = document.createElement('tr');

  // Empty corner cell
  const cornerTh = document.createElement('th');
  cornerTh.className = 'sticky top-0 left-0 bg-gradient-to-br from-gray-50 to-gray-100 z-20 px-4 py-4 border-b-2 border-r-2 border-gray-300 min-w-[200px]';
  cornerTh.innerHTML = `
    <div class="flex items-center justify-between">
      <span class="font-bold text-gray-700">Evidence</span>
      <div class="flex items-center gap-1">
        <span class="text-xs text-gray-500">Toggle</span>
        <span class="text-xs">👁️</span>
      </div>
    </div>
  `;
  headRow.appendChild(cornerTh);

  // Hypothesis headers
  hypotheses.forEach((hypo, idx) => {
    const th = document.createElement('th');
    th.className = 'sticky top-0 bg-gradient-to-b from-gray-50 to-gray-100 z-10 px-4 py-4 border-b-2 border-gray-300 font-bold text-[#1a2332] whitespace-normal break-words max-w-xs text-center';
    th.innerHTML = `
      <div class="flex flex-col items-center gap-1">
        <span class="text-sm font-semibold">H${idx + 1}</span>
        <span class="text-xs text-gray-600 leading-tight">${hypo.title}</span>
      </div>
    `;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Table Body with enhanced styling
  const tbody = document.createElement('tbody');
  evidenceList.forEach((ev, rowIdx) => {
    const tr = document.createElement('tr');
    tr.className = evidenceActive[rowIdx] ? 'hover:bg-gray-50 transition-colors duration-150' : 'opacity-50 bg-gray-100';

    // Evidence label with improved toggle
    const evTh = document.createElement('th');
    evTh.className = 'sticky left-0 bg-white z-10 px-4 py-3 border-r-2 border-gray-200 text-left min-w-[200px]';
    evTh.innerHTML = `
      <div class="flex items-center gap-3">
        <button 
          title="${evidenceActive[rowIdx] ? 'Deactivate evidence' : 'Activate evidence'}" 
          class="flex-shrink-0 w-8 h-8 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${evidenceActive[rowIdx]
        ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
        : 'border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100'
      }"
        >
          <span class="text-sm">${evidenceActive[rowIdx] ? '👁️' : '🚫'}</span>
        </button>
        <div class="flex-1 min-w-0">
          <div class="font-medium text-sm text-gray-900 truncate" title="${ev.statement || `Evidence ${rowIdx + 1}`}">
            ${ev.statement || `Evidence ${rowIdx + 1}`}
          </div>
          ${ev.source ? `<div class="text-xs text-gray-500 truncate" title="${ev.source}">${ev.source}</div>` : ''}
        </div>
      </div>
    `;

    // Enhanced toggle button
    const toggleBtn = evTh.querySelector('button');
    toggleBtn.onclick = (e) => {
      e.stopPropagation();
      evidenceActive[rowIdx] = !evidenceActive[rowIdx];
      renderACHMatrix();
      renderResultsDashboard();
      saveCurrentProject();
    };
    tr.appendChild(evTh);

    // Matrix cells with improved styling
    hypotheses.forEach((hypo, colIdx) => {
      const td = document.createElement('td');
      const stateIdx = matrixRatings[rowIdx]?.[colIdx] ?? 2; // Default to N/A
      const state = CONSISTENCY_STATES[stateIdx];

      td.className = `px-4 py-3 text-center border border-gray-200 transition-all duration-200 ${evidenceActive[rowIdx]
        ? `${state.color} font-bold text-sm cursor-pointer hover:scale-105 hover:shadow-md transform focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2`
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`;

      td.title = evidenceActive[rowIdx] ? `${state.tooltip}: ${state.description}` : 'Evidence is deactivated';
      td.setAttribute('role', 'gridcell');
      td.setAttribute('tabindex', evidenceActive[rowIdx] ? '0' : '-1');
      td.setAttribute('aria-label', evidenceActive[rowIdx] ? `Cell ${rowIdx + 1}-${colIdx + 1}: ${state.tooltip}` : 'Cell disabled');
      td.innerHTML = `
        <div class="flex flex-col items-center gap-1">
          <span class="text-lg font-bold">${state.label}</span>
          <span class="text-xs opacity-75">${state.tooltip}</span>
        </div>
      `;

      if (evidenceActive[rowIdx]) {
        const handleCellAction = () => {
          matrixRatings[rowIdx][colIdx] = (stateIdx + 1) % CONSISTENCY_STATES.length;
          renderACHMatrix();
          renderResultsDashboard();
          saveCurrentProject();
        };

        td.onclick = handleCellAction;
        td.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCellAction();
          }
        };
      } else {
        td.onclick = null;
        td.onkeydown = null;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  matrixContainer.appendChild(tableWrap);
  container.appendChild(matrixContainer);

  // Action buttons with improved styling
  const actionBar = document.createElement('div');
  actionBar.className = 'flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 ach-matrix-action-bar';

  actionBar.innerHTML = `
    <div class="flex items-center gap-3">
      <button 
        id="reset-matrix-btn"
        class="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 font-semibold text-sm border border-red-200 hover:border-red-300"
      >
        🔄 Reset Matrix
      </button>
      <button 
        id="toggle-all-evidence-btn"
        class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-semibold text-sm border border-blue-200 hover:border-blue-300"
      >
        ${evidenceActive.every(Boolean) ? '🚫' : '👁️'} ${evidenceActive.every(Boolean) ? 'Deactivate All' : 'Activate All'}
      </button>
    </div>
  `;

  // Enhanced button event handlers
  const resetBtn = actionBar.querySelector('#reset-matrix-btn');
  resetBtn.onclick = () => {
    if (confirm('Are you sure you want to reset all matrix ratings to "Not Applicable"?')) {
      for (let i = 0; i < matrixRatings.length; ++i) {
        for (let j = 0; j < matrixRatings[i].length; ++j) {
          matrixRatings[i][j] = 2; // N/A
        }
      }
      renderACHMatrix();
      renderResultsDashboard();
      saveCurrentProject();
    }
  };

  const toggleAllBtn = actionBar.querySelector('#toggle-all-evidence-btn');
  toggleAllBtn.onclick = () => {
    const allActive = evidenceActive.every(Boolean);
    evidenceActive.fill(!allActive);
    renderACHMatrix();
    renderResultsDashboard();
    saveCurrentProject();
  };

  container.appendChild(actionBar);

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
renderHypothesisCanvas = function () {
  _oldRenderHypothesisCanvas();
  renderACHMatrix();
};
const _oldRenderEvidenceLocker = renderEvidenceLocker;
renderEvidenceLocker = function () {
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
  container.className = 'mb-10 bg-white/80 rounded-2xl border border-gray-200 shadow-xl p-8';

  // Header
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between mb-4';
  header.innerHTML = `<h2 class=\"text-xl font-bold text-[#1a2332] tracking-wide\">Results Dashboard</h2>`;
  container.appendChild(header);

  // Calculate and sort
  const scored = calculateInconsistencyScores().slice().sort((a, b) => a.inconsistencyScore - b.inconsistencyScore);
  // The max possible score is the number of active evidence rows
  const maxPossibleScore = evidenceActive.filter(Boolean).length || 1;

  // --- Most Likely Hypotheses ---
  const minScore = scored.length > 0 ? scored[0].inconsistencyScore : null;
  const likelySection = document.createElement('div');
  likelySection.className = 'mb-8 flex-1';
  likelySection.innerHTML = `<h3 class=\"text-lg font-semibold mb-2 text-[#1a2332]\">Most Likely Hypotheses</h3>`;
  const likelyList = document.createElement('ol');
  likelyList.className = 'mb-2';
  scored.forEach((hypo, idx) => {
    const isMostLikely = hypo.inconsistencyScore === minScore;
    const li = document.createElement('li');
    li.className = `flex items-center gap-4 mb-2 ${isMostLikely ? 'border-2 border-green-500 bg-green-50 rounded-lg' : ''}`;
    li.innerHTML = `
      <span class=\"w-6 text-right font-bold\">${idx + 1}.</span>
      <span class=\"flex-1\">${hypo.title} <span class=\"text-lg align-bottom ml-2\">📊 <span class=\"ml-1\">${hypo.inconsistencyScore}</span></span></span>
    `;
    likelyList.appendChild(li);
  });
  likelySection.appendChild(likelyList);
  container.appendChild(likelySection);

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
    li.innerHTML = `<span class=\"font-semibold truncate max-w-xs inline-block align-bottom\">${ev.statement}</span> <span class=\"text-lg align-bottom ml-2\">🏅${admiralty}</span>`;
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
renderACHMatrix = function () {
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
    } catch { }
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
    li.className = `project-item mb-2 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 font-semibold select-none group relative ${idx === currentProjectIdx ? 'bg-[#C6372F] text-white shadow-lg' : 'bg-[#23272a] text-gray-200 hover:bg-[#374151] hover:text-white hover:shadow-md'}`;

    li.innerHTML = `
      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <span class="flex-1 font-semibold">${proj.name}</span>
        </div>
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <button 
            class="reset-project-btn px-2 py-1 text-orange-400 hover:text-orange-200 hover:bg-orange-900/30 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md border border-orange-500/20 hover:border-orange-400/40 flex-1"
            title="Reset this project - Clear all hypotheses, evidence, and matrix data while keeping the project"
            data-project-idx="${idx}"
          >
            <span class="flex items-center justify-center gap-1">
              <span class="text-sm">🔄</span>
              <span class="text-xs">Reset</span>
            </span>
          </button>
          <button 
            class="delete-project-btn px-2 py-1 text-red-400 hover:text-red-200 hover:bg-red-900/30 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md border border-red-500/20 hover:border-red-400/40 flex-1"
            title="Delete this project - Permanently remove the project and all its data"
            data-project-idx="${idx}"
          >
            <span class="flex items-center justify-center gap-1">
              <span class="text-sm">🗑️</span>
              <span class="text-xs">Delete</span>
            </span>
          </button>
        </div>
      </div>
    `;

    // Project click handler
    li.onclick = (e) => {
      // Don't trigger if clicking action buttons
      if (e.target.classList.contains('delete-project-btn') || e.target.classList.contains('reset-project-btn')) return;
      loadProject(idx);
    };

    // Double click to rename
    li.ondblclick = (e) => {
      e.stopPropagation();
      if (e.target.classList.contains('delete-project-btn') || e.target.classList.contains('reset-project-btn')) return;
      const newName = prompt('Rename project:', proj.name);
      if (newName && newName.trim()) {
        proj.name = newName.trim();
        renderProjectList();
        saveProjectsToStorage();
      }
    };

    // Reset button handler
    const resetBtn = li.querySelector('.reset-project-btn');
    resetBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      const projectName = proj.name;
      if (confirm(`Are you sure you want to reset "${projectName}"? All hypotheses, evidence, and matrix data will be cleared. This action cannot be undone.`)) {
        // Reset the project data
        hypotheses = [];
        evidenceList = [];
        matrixRatings = [];
        evidenceActive = [];
        saveCurrentProject();
        renderHypothesisCanvas();
        renderEvidenceLocker();
        renderACHMatrix();
        renderResultsDashboard();
      }
    };

    // Delete button handler
    const deleteBtn = li.querySelector('.delete-project-btn');
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (projects.length <= 1) {
        alert('Cannot delete the last project. Please create a new project first.');
        return;
      }

      const projectName = proj.name;
      if (confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
        // Remove the project
        projects.splice(idx, 1);

        // Adjust current project index if needed
        if (currentProjectIdx >= idx) {
          currentProjectIdx = Math.max(0, currentProjectIdx - 1);
        }

        // Load the current project (or first project if none selected)
        if (currentProjectIdx >= 0 && currentProjectIdx < projects.length) {
          loadProject(currentProjectIdx);
        } else if (projects.length > 0) {
          loadProject(0);
        } else {
          // Create a new project if all were deleted
          projects.push(makeBlankProject('Untitled Project 1'));
          loadProject(0);
        }

        saveProjectsToStorage();
        renderProjectList();
      }
    };

    list.appendChild(li);
  });
}

function setupNewAnalysisButton() {
  let newAnalysisBtn = document.getElementById('new-analysis-btn');
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
  } else {
    console.warn('New Analysis button not found');
  }
}

// --- Reset Project functionality is now integrated into each project item ---
function setupClearProjectButton() {
  // This function is now deprecated since reset functionality is integrated into project items
  // The reset button is now part of each project item in renderProjectList()
  console.log('Reset Project functionality is now integrated into project items');
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

  // Webpage fullscreen toggle for main panel
  const fsBtn = document.getElementById('fullscreen-toggle');
  const mainPanel = document.getElementById('main-panel-container');
  const sidebar = document.querySelector('aside');
  let closeBtn = null;
  if (fsBtn && mainPanel) {
    fsBtn.onclick = () => {
      if (!mainPanel.classList.contains('fullscreen-mode')) {
        mainPanel.classList.add('fullscreen-mode');
        if (sidebar) sidebar.style.display = 'none';
        fsBtn.style.display = 'none';
        // Add close button
        closeBtn = document.createElement('button');
        closeBtn.className = 'fullscreen-close';
        closeBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        closeBtn.onclick = () => {
          mainPanel.classList.remove('fullscreen-mode');
          if (sidebar) sidebar.style.display = '';
          if (closeBtn) closeBtn.remove();
          fsBtn.style.display = '';
        };
        mainPanel.appendChild(closeBtn);
      } else {
        mainPanel.classList.remove('fullscreen-mode');
        if (sidebar) sidebar.style.display = '';
        if (closeBtn) closeBtn.remove();
        fsBtn.style.display = '';
      }
    };
  }
});

// Export for unit testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateInconsistencyScores,
    makeBlankProject,
    ensureMatrixSize,
    ensureEvidenceActiveSize,
    CONSISTENCY_STATES
  };
}

// Add DOMPurify for sanitization
// If running in browser, load from CDN if not present
if (typeof window !== 'undefined' && typeof window.DOMPurify === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js';
  document.head.appendChild(script);
}
function sanitizeHTML(html) {
  if (typeof window !== 'undefined' && window.DOMPurify) {
    return window.DOMPurify.sanitize(html);
  }
  return html;
}

