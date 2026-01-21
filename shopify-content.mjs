#!/usr/bin/env node
/**
 * Shopify Content Manager for White Pine Medical
 * Uses Shopify CLI authentication (no separate token needed)
 *
 * Usage:
 *   node shopify-content.mjs list-pages
 *   node shopify-content.mjs create-page "Title" "handle" "<h1>Content</h1>"
 *   node shopify-content.mjs list-themes
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE = 'whitepinemedical.myshopify.com';
const DEV_THEME_ID = '182960718119';

function runShopifyGraphQL(query, variables = {}) {
  const payload = JSON.stringify({ query, variables });
  const tempFile = '/tmp/shopify-query.json';
  writeFileSync(tempFile, payload);

  try {
    const result = execSync(
      `shopify app function run --path /dev/null 2>/dev/null || curl -s -X POST "https://${STORE}/admin/api/2024-10/graphql.json" -H "Content-Type: application/json" -d @${tempFile}`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    return JSON.parse(result);
  } catch (e) {
    console.error('GraphQL request failed:', e.message);
    return null;
  }
}

// Use REST API via curl with session cookie from CLI
async function shopifyREST(endpoint, method = 'GET', data = null) {
  // Get auth from CLI config
  const cmd = method === 'GET'
    ? `shopify theme pull --store ${STORE} --theme ${DEV_THEME_ID} --only config/settings_data.json --path /tmp/shopify-test 2>&1`
    : null;

  // For now, let's use a simpler approach - output instructions
  console.log(`\nTo perform this action, the Shopify CLI needs direct API access.`);
  console.log(`The CLI stores auth in macOS Keychain which we cannot extract.\n`);
  return null;
}

// ============ PAGE OPERATIONS (via theme files) ============

async function listPages() {
  console.log('\n📄 To list pages, go to:');
  console.log(`   https://admin.shopify.com/store/whitepinemedical/pages\n`);
  console.log('Or use the Shopify CLI to check theme files:');
  console.log('   shopify theme pull --store whitepinemedical.myshopify.com --only "templates/page.*"\n');
}

async function listThemes() {
  console.log('\nFetching themes via CLI...\n');
  try {
    const result = execSync(
      `shopify theme list --store ${STORE}`,
      { encoding: 'utf-8' }
    );
    console.log(result);
  } catch (e) {
    console.error('Failed:', e.message);
  }
}

async function pullSettings() {
  console.log('\nPulling settings_data.json from dev theme...\n');
  try {
    execSync(
      `cd "${__dirname}" && shopify theme pull --store ${STORE} --theme ${DEV_THEME_ID} --only "config/settings_data.json"`,
      { encoding: 'utf-8', stdio: 'inherit' }
    );
    console.log('\n✅ Settings pulled to config/settings_data.json');
    console.log('   Edit this file, then run: node shopify-content.mjs push-settings\n');
  } catch (e) {
    console.error('Failed:', e.message);
  }
}

async function pushSettings() {
  console.log('\nPushing settings_data.json to dev theme...\n');
  try {
    execSync(
      `cd "${__dirname}" && shopify theme push --store ${STORE} --theme ${DEV_THEME_ID} --only "config/settings_data.json"`,
      { encoding: 'utf-8', stdio: 'inherit' }
    );
    console.log('\n✅ Settings pushed to Shopify\n');
  } catch (e) {
    console.error('Failed:', e.message);
  }
}

async function pullFile(filename) {
  console.log(`\nPulling ${filename} from dev theme...\n`);
  try {
    execSync(
      `cd "${__dirname}" && shopify theme pull --store ${STORE} --theme ${DEV_THEME_ID} --only "${filename}"`,
      { encoding: 'utf-8', stdio: 'inherit' }
    );
    console.log(`\n✅ File pulled: ${filename}\n`);
  } catch (e) {
    console.error('Failed:', e.message);
  }
}

async function pushFile(filename) {
  console.log(`\nPushing ${filename} to dev theme...\n`);
  try {
    execSync(
      `cd "${__dirname}" && shopify theme push --store ${STORE} --theme ${DEV_THEME_ID} --only "${filename}"`,
      { encoding: 'utf-8', stdio: 'inherit' }
    );
    console.log(`\n✅ File pushed: ${filename}\n`);
  } catch (e) {
    console.error('Failed:', e.message);
  }
}

// ============ CLI HANDLER ============

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  switch (command) {
    case 'list-themes':
      await listThemes();
      break;

    case 'list-pages':
      await listPages();
      break;

    case 'pull-settings':
      await pullSettings();
      break;

    case 'push-settings':
      await pushSettings();
      break;

    case 'pull':
      if (!args[0]) {
        console.error('Usage: pull <filename>');
        console.error('Example: pull config/settings_data.json');
        process.exit(1);
      }
      await pullFile(args[0]);
      break;

    case 'push':
      if (!args[0]) {
        console.error('Usage: push <filename>');
        console.error('Example: push config/settings_data.json');
        process.exit(1);
      }
      await pushFile(args[0]);
      break;

    default:
      console.log(`
Shopify Content Manager for White Pine Medical
(Uses Shopify CLI authentication - no separate token needed)

Usage:
  node shopify-content.mjs <command> [args]

THEME COMMANDS:
  list-themes              List all themes
  pull-settings            Pull settings_data.json (colors, fonts, etc.)
  push-settings            Push settings_data.json to dev theme
  pull <filename>          Pull specific file from dev theme
  push <filename>          Push specific file to dev theme

PAGE COMMANDS:
  list-pages               Show how to manage pages

WORKFLOW:
  1. Pull settings:  node shopify-content.mjs pull-settings
  2. Edit locally:   Edit config/settings_data.json
  3. Push changes:   node shopify-content.mjs push-settings

Theme IDs:
  Dev (Broadcast): ${DEV_THEME_ID}
      `);
  }
}

main().catch(console.error);
