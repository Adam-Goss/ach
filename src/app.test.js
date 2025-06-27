const {
  calculateInconsistencyScores,
  makeBlankProject,
  ensureMatrixSize,
  ensureEvidenceActiveSize,
  CONSISTENCY_STATES
} = require('./logic');

describe('makeBlankProject', () => {
  it('creates a blank project with the given name', () => {
    const proj = makeBlankProject('Test Project', 0);
    expect(proj.name).toBe('Test Project');
    expect(Array.isArray(proj.hypotheses)).toBe(true);
    expect(Array.isArray(proj.evidenceList)).toBe(true);
    expect(Array.isArray(proj.matrixRatings)).toBe(true);
    expect(Array.isArray(proj.evidenceActive)).toBe(true);
    expect(typeof proj.analystConfidence).toBe('number');
  });
});

describe('ensureMatrixSize', () => {
  it('ensures matrixRatings matches evidenceList and hypotheses', () => {
    let matrixRatings = [];
    let evidenceList = [{}, {}];
    let hypotheses = [{}, {}, {}];
    ensureMatrixSize(matrixRatings, evidenceList, hypotheses);
    expect(matrixRatings.length).toBe(2);
    expect(matrixRatings[0].length).toBe(3);
    expect(matrixRatings[1].length).toBe(3);
  });
});

describe('ensureEvidenceActiveSize', () => {
  it('ensures evidenceActive matches evidenceList length', () => {
    let evidenceActive = [true];
    let evidenceList = [{}, {}, {}];
    ensureEvidenceActiveSize(evidenceActive, evidenceList);
    expect(evidenceActive.length).toBe(3);
    expect(evidenceActive.every(Boolean)).toBe(true);
  });
});

describe('calculateInconsistencyScores', () => {
  it('calculates correct scores for hypotheses', () => {
    // 2 evidence, 2 hypotheses
    const hypotheses = [
      { title: 'H1' },
      { title: 'H2' }
    ];
    const evidenceList = [{}, {}];
    const matrixRatings = [
      [0, 1], // CC, C
      [3, 4]  // I, II
    ];
    const evidenceActive = [true, true];
    const scored = calculateInconsistencyScores(hypotheses, evidenceList, matrixRatings, evidenceActive);
    // H1: CC(-2) + I(1) = -1, H2: C(-1) + II(2) = 1
    expect(scored[0].inconsistencyScore).toBe(-1);
    expect(scored[1].inconsistencyScore).toBe(1);
  });
}); 