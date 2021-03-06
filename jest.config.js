module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/test", "<rootDir>/src/test"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
