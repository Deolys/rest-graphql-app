// vitest.config.ts
import path from "path";
import react from "file:///home/alexius/Programming/graphiql/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { configDefaults, defineConfig } from "file:///home/alexius/Programming/graphiql/node_modules/vitest/dist/config.js";
var __vite_injected_original_dirname = "/home/alexius/Programming/graphiql";
var vitest_config_default = defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__tests__/setup.ts",
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    },
    coverage: {
      include: ["src/**/*.{js,ts,tsx}"],
      exclude: [
        ...configDefaults.exclude,
        ".eslintrc.cjs",
        "next.config.mjs",
        "next-env.d.ts",
        "**/__tests__/**",
        "**/node_modules/**"
      ]
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2FsZXhpdXMvUHJvZ3JhbW1pbmcvZ3JhcGhpcWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2FsZXhpdXMvUHJvZ3JhbW1pbmcvZ3JhcGhpcWwvdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9hbGV4aXVzL1Byb2dyYW1taW5nL2dyYXBoaXFsL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzLCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICB0ZXN0OiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBzZXR1cEZpbGVzOiAnLi9zcmMvX190ZXN0c19fL3NldHVwLnRzJyxcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi57anMsdHMsdHN4fSddLFxuICAgICAgZXhjbHVkZTogW1xuICAgICAgICAuLi5jb25maWdEZWZhdWx0cy5leGNsdWRlLFxuICAgICAgICAnLmVzbGludHJjLmNqcycsXG4gICAgICAgICduZXh0LmNvbmZpZy5tanMnLFxuICAgICAgICAnbmV4dC1lbnYuZC50cycsXG4gICAgICAgICcqKi9fX3Rlc3RzX18vKionLFxuICAgICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJyxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0UixPQUFPLFVBQVU7QUFFN1MsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZ0JBQWdCLG9CQUFvQjtBQUg3QyxJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsTUFBTTtBQUFBLElBQ0osYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixTQUFTLENBQUMsc0JBQXNCO0FBQUEsTUFDaEMsU0FBUztBQUFBLFFBQ1AsR0FBRyxlQUFlO0FBQUEsUUFDbEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
