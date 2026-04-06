// Load jest-dom matchers when available, without hard-failing test runs
// in environments where the optional package is not installed.
try {
  // eslint-disable-next-line global-require
  require("@testing-library/jest-dom");
} catch (error) {
  // No-op fallback.
}
