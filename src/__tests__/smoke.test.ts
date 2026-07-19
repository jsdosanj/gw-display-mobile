// Proves the Jest/jest-expo setup actually runs before real logic lands in
// Phase 1 (the shared kiosk-state.ts port) — delete once that test suite
// exists and this becomes redundant.
describe('test runner smoke check', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
