// Pure logic for ACH Digital Workbench

// Consistency states for the ACH matrix
const CONSISTENCY_STATES = [
  { label: 'CC', color: 'bg-green-300 text-green-900', tooltip: 'Very Consistent', value: -2 },
  { label: 'C', color: 'bg-green-100 text-green-700', tooltip: 'Consistent', value: -1 },
  { label: 'N/A', color: 'bg-gray-100 text-gray-700', tooltip: 'Not Applicable', value: 0 },
  { label: 'I', color: 'bg-red-100 text-red-700', tooltip: 'Inconsistent', value: 1 },
  { label: 'II', color: 'bg-red-400 text-red-900', tooltip: 'Very Inconsistent', value: 2 }
];

function makeBlankProject(name, projectsLength = 0) {
  return {
    name: name || `Untitled Project ${projectsLength + 1}`,
    hypotheses: [],
    evidenceList: [],
    matrixRatings: [],
    evidenceActive: [],
    analystConfidence: 80
  };
}

function ensureMatrixSize(matrixRatings, evidenceList, hypotheses) {
  // Mutates matrixRatings to match evidence/hypotheses
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

function ensureEvidenceActiveSize(evidenceActive, evidenceList) {
  while (evidenceActive.length < evidenceList.length) evidenceActive.push(true);
  while (evidenceActive.length > evidenceList.length) evidenceActive.pop();
}

function calculateInconsistencyScores(hypotheses, evidenceList, matrixRatings, evidenceActive) {
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

module.exports = {
  CONSISTENCY_STATES,
  makeBlankProject,
  ensureMatrixSize,
  ensureEvidenceActiveSize,
  calculateInconsistencyScores
}; 