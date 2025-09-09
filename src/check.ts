import { exec } from "child_process";
import { promises as fs } from "fs";
import * as path from "path";

const runCommand = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

const getChangedFiles = async (): Promise<string[]> => {
  const output = await runCommand("git diff --cached --name-only");
  return output.split("\n").filter(Boolean);
};

const runLintOnFiles = async (files: string[]): Promise<void> => {
  const lintable = files.filter(f => f.endsWith(".ts") || f.endsWith(".tsx"));
  if (lintable.length === 0) return;

  console.log("🔧 Running ESLint auto-fix on:", lintable.join(", "));

  try {
    await runCommand(`pnpm lint-fix -- ${lintable.join(" ")}`);
    await runCommand(`git add ${lintable.join(" ")}`);
    console.log("✅ Lint fixes applied and files re-staged.");
  } catch (err) {
    console.error("❌ ESLint failed. Please fix manually.");
    process.exit(1);
  }
};

const checkTestWarnings = async (files: string[]): Promise<void> => {
  const srcFiles = files.filter(f => f.startsWith("src/"));

  for (const srcFile of srcFiles) {
    const testFile = srcFile
      .replace(/^src\//, "tests/")
      .replace(/\.ts$/, ".test.ts")
      .replace(/\.tsx$/, ".test.tsx");

    try {
      await fs.access(path.resolve(testFile));
      console.log(
        `⚠️  You changed ${srcFile}, which has tests in ${testFile}.\n   Make sure tests are updated, otherwise workflow may fail.`
      );
    } catch {
      console.log(
        `ℹ️  You changed ${srcFile}, but no test file found at ${testFile}.`
      );
    }
  }
};

export const runChecks = async (): Promise<void> => {
  const changedFiles = await getChangedFiles();

  if (changedFiles.length === 0) {
    console.log("No staged files found.");
    return;
  }

  await runLintOnFiles(changedFiles);
  await checkTestWarnings(changedFiles);
};

if (require.main === module) {
  runChecks().catch(err => {
    console.error("Unexpected error:", err);
    process.exit(1);
  });
}
