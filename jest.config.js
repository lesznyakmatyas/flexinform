export const preset = "jest-preset-angular";
export const setupFilesAfterEnv = ["<rootDir>/setup-jest.ts"];
export const testPathIgnorePatterns = [
  "<rootDir>/node_modules/",
  "<rootDir>/dist/",
  "/tests/",
];
