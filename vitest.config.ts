import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts"],
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "src/**/*.stories.ts",
        "**/*.config.ts",
        "**/dist/**",
        "**/.storybook/**",
      ],
    },
  },
});
