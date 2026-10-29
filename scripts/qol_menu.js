#!/usr/bin/env node

const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const magenta = (s) => `\x1b[35m${s}\x1b[0m`;
const blue = (s) => `\x1b[34m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

console.log(`
${bold(cyan('🌐 Sovereignty Atlas 2025 — Developer QoL Commands'))}
${dim('Open-source MIT project by BanguDevClub • 195 Sovereign Nations')}

${bold(green('🚀 Core Development & Build:'))}
  ${cyan('npm run dev')}          ${dim('Start Astro development server (http://localhost:4321/sovereigntyatlas/)')}
  ${cyan('npm run build')}        ${dim('Compile production static build into ./dist/')}
  ${cyan('npm run preview')}      ${dim('Preview the local production build')}

${bold(yellow('🔍 Quality, Linting & Formatting:'))}
  ${cyan('npm run lint')}         ${dim('Run ESLint on all TypeScript, React, and Astro files')}
  ${cyan('npm run lint:fix')}     ${dim('Automatically fix ESLint formatting and rule warnings')}
  ${cyan('npm run format')}       ${dim('Format all codebase files with Prettier')}
  ${cyan('npm run format:check')} ${dim('Check if codebase conforms to Prettier guidelines')}
  ${cyan('npm run fix')}          ${dim('One-command auto-fix: runs format + lint:fix')}

${bold(blue('🛡️ Type-Safety & Validation:'))}
  ${cyan('npm run typecheck')}    ${dim('Strict TypeScript and Astro diagnostics check (astro check && tsc)')}
  ${cyan('npm run data:validate')} ${dim('Validate 195 nations dataset (weights sum, ranks 1-195, mathematical formulas)')}
  ${cyan('npm run data:generate')} ${dim('Regenerate the complete 195-nation dataset using calibration script')}
  ${cyan('npm run validate')}     ${dim('Full CI pipeline: data:validate + typecheck + lint + format:check + build')}

${bold(magenta('🧹 Clean & Maintenance:'))}
  ${cyan('npm run clean')}        ${dim('Clean build artifacts (./dist and ./.astro cache)')}
  ${cyan('npm run clean:all')}    ${dim('Deep clean: removes ./dist, ./.astro, and node_modules/')}
  ${cyan('npm run reinstall')}    ${dim('Nuclear reset: clean:all + clean npm install')}
  ${cyan('npm run help')}         ${dim('Display this command reference anytime')}
`);

