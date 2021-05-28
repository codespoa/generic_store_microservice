import { pathsToModuleNameMapper } from "ts-jest/utils";
import { compilerOptions } from "./tsconfig.json";

export default {
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/modules/**/services/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text-summary", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
};
