#!/usr/bin/env node
/**
 * Shopify Admin API Client for White Pine Medical
 * Full control: Pages, Navigation, Theme Files, Settings
 *
 * Usage:
 *   # Pages
 *   node shopify-admin-api.mjs list-pages
 *   node shopify-admin-api.mjs create-page "Title" "handle" "HTML content"
 *   node shopify-admin-api.mjs update-page <id> "New Title" "HTML content"
 *   node shopify-admin-api.mjs delete-page <id>
 *
 *   # Navigation
 *   node shopify-admin-api.mjs list-navigation
 *
 *   # Themes
 *   node shopify-admin-api.mjs list-themes
 *   node shopify-admin-api.mjs get-theme-file <theme-id> <filename>
 *   node shopify-admin-api.mjs update-theme-file <theme-id> <filename> <content|@file>
 *
 *   # Settings (settings_data.json)
 *   node shopify-admin-api.mjs get-settings [theme-id]
 *   node shopify-admin-api.mjs update-settings <theme-id> <json-content|@file>
 *   node shopify-admin-api.mjs set-color <theme-id> <setting-name> <hex-color>
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync, writeFileSync } from 'fs';

// Load .env from script directory
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '.env') });

const STORE = process.env.SHOPIFY_STORE;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

// Default theme IDs from CLAUDE.md
const DEV_THEME_ID = '182960718119';
const LIVE_THEME_ID = '178766348583'; // NEVER modify this one

if (!STORE || !TOKEN || TOKEN === 'your_token_here') {
  console.error('Error: Missing Shopify credentials');
  console.error('1. Copy .env.example to .env');
  console.error('2. Add your Admin API token from Shopify Admin > Settings > Apps > Develop apps');
  process.exit(1);
}

const GRAPHQL_URL = `https://${STORE}/admin/api/${API_VERSION}/graphql.json`;

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(data.errors, null, 2)}`);
  }

  return data;
}

// ============ THEME OPERATIONS ============

async function listThemes() {
  const query = `
    query {
      themes(first: 20) {
        edges {
          node {
            id
            name
            role
            createdAt
            updatedAt
          }
        }
      }
    }
  `;

  const result = await graphqlRequest(query);
  const themes = result.data.themes.edges.map(e => e.node);

  console.log('\n🎨 Themes:\n');
  themes.forEach(t => {
    const roleIcon = t.role === 'MAIN' ? '🟢 LIVE' : t.role === 'UNPUBLISHED' ? '🟡 DEV' : '⚪';
    const numericId = t.id.split('/').pop();
    console.log(`${roleIcon} ${t.name}`);
    console.log(`   ID: ${numericId}`);
    console.log(`   GID: ${t.id}`);
    console.log(`   Role: ${t.role}`);
    console.log(`   Updated: ${t.updatedAt}\n`);
  });

  return themes;
}

async function getThemeFile(themeId, filename) {
  const gid = themeId.startsWith('gid://') ? themeId : `gid://shopify/OnlineStoreTheme/${themeId}`;

  const query = `
    query getThemeFile($themeId: ID!, $filenames: [String!]!) {
      theme(id: $themeId) {
        id
        name
        files(filenames: $filenames) {
          edges {
            node {
              filename
              body {
                ... on OnlineStoreThemeFileBodyText {
                  content
                }
                ... on OnlineStoreThemeFileBodyBase64 {
                  contentBase64
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await graphqlRequest(query, { themeId: gid, filenames: [filename] });

  if (!result.data.theme) {
    console.error(`Theme not found: ${themeId}`);
    return null;
  }

  const files = result.data.theme.files.edges;
  if (files.length === 0) {
    console.error(`File not found: ${filename}`);
    return null;
  }

  const file = files[0].node;
  const content = file.body.content || file.body.contentBase64;

  console.log(`\n📄 ${filename} from ${result.data.theme.name}:\n`);
  console.log(content);

  return { filename: file.filename, content };
}

async function updateThemeFile(themeId, filename, content) {
  // Safety check: never modify live theme
  const numericId = themeId.startsWith('gid://') ? themeId.split('/').pop() : themeId;
  if (numericId === LIVE_THEME_ID) {
    console.error('🚫 BLOCKED: Cannot modify live theme (178766348583)');
    console.error('Use the dev theme ID: 182960718119');
    process.exit(1);
  }

  const gid = themeId.startsWith('gid://') ? themeId : `gid://shopify/OnlineStoreTheme/${themeId}`;

  const query = `
    mutation themeFilesUpsert($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
      themeFilesUpsert(themeId: $themeId, files: $files) {
        upsertedThemeFiles {
          filename
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    themeId: gid,
    files: [{
      filename,
      body: {
        type: 'TEXT',
        value: content,
      },
    }],
  };

  const result = await graphqlRequest(query, variables);

  if (result.data.themeFilesUpsert.userErrors.length > 0) {
    console.error('Errors:', result.data.themeFilesUpsert.userErrors);
    return false;
  }

  console.log(`\n✅ Updated: ${filename}`);
  return true;
}

async function getSettings(themeId) {
  const id = themeId || DEV_THEME_ID;
  const result = await getThemeFile(id, 'config/settings_data.json');

  if (result && result.content) {
    // Also save to local file for editing
    const localPath = join(__dirname, 'config', 'settings_data.json');
    try {
      const settings = JSON.parse(result.content);
      console.log('\n📊 Current Theme Settings (parsed):\n');
      console.log(JSON.stringify(settings.current, null, 2).slice(0, 2000) + '...\n');
    } catch (e) {
      console.log('(Raw content shown above)');
    }
  }

  return result;
}

async function updateSettings(themeId, content) {
  // Validate JSON
  try {
    JSON.parse(content);
  } catch (e) {
    console.error('Invalid JSON:', e.message);
    process.exit(1);
  }

  return await updateThemeFile(themeId, 'config/settings_data.json', content);
}

async function setColor(themeId, settingName, hexColor) {
  // First, get current settings
  const result = await getThemeFile(themeId, 'config/settings_data.json');
  if (!result) return false;

  try {
    const settings = JSON.parse(result.content);

    // Navigate to the current theme's settings
    const currentPreset = settings.current;
    if (typeof currentPreset === 'string') {
      // It's a preset name, need to modify the preset
      if (settings.presets && settings.presets[currentPreset]) {
        settings.presets[currentPreset][settingName] = hexColor;
      }
    } else {
      // Direct settings object
      settings.current[settingName] = hexColor;
    }

    console.log(`\n🎨 Setting ${settingName} = ${hexColor}`);

    const updatedContent = JSON.stringify(settings, null, 2);
    return await updateThemeFile(themeId, 'config/settings_data.json', updatedContent);
  } catch (e) {
    console.error('Error updating settings:', e.message);
    return false;
  }
}

// ============ PAGE OPERATIONS ============

async function listPages() {
  const query = `
    query {
      pages(first: 50) {
        edges {
          node {
            id
            title
            handle
            createdAt
            updatedAt
            isPublished
          }
        }
      }
    }
  `;

  const result = await graphqlRequest(query);
  const pages = result.data.pages.edges.map(e => e.node);

  console.log('\n📄 Pages:\n');
  pages.forEach(p => {
    const status = p.isPublished ? '✅' : '❌';
    console.log(`${status} ${p.title}`);
    console.log(`   Handle: ${p.handle}`);
    console.log(`   ID: ${p.id}`);
    console.log(`   Updated: ${p.updatedAt}\n`);
  });

  return pages;
}

async function getPage(id) {
  const gid = id.startsWith('gid://') ? id : `gid://shopify/Page/${id}`;

  const query = `
    query getPage($id: ID!) {
      page(id: $id) {
        id
        title
        handle
        body
        bodySummary
        isPublished
        createdAt
        updatedAt
      }
    }
  `;

  const result = await graphqlRequest(query, { id: gid });
  const page = result.data.page;

  if (!page) {
    console.error(`Page not found: ${id}`);
    return null;
  }

  console.log('\n📄 Page Details:\n');
  console.log(`Title: ${page.title}`);
  console.log(`Handle: ${page.handle}`);
  console.log(`ID: ${page.id}`);
  console.log(`Published: ${page.isPublished}`);
  console.log(`\nBody:\n${page.body}\n`);

  return page;
}

async function createPage(title, handle, body, published = true) {
  const query = `
    mutation createPage($page: PageCreateInput!) {
      pageCreate(page: $page) {
        page {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    page: {
      title,
      handle,
      body,
      isPublished: published,
    },
  };

  const result = await graphqlRequest(query, variables);

  if (result.data.pageCreate.userErrors.length > 0) {
    console.error('Errors:', result.data.pageCreate.userErrors);
    return null;
  }

  const page = result.data.pageCreate.page;
  console.log(`\n✅ Created page: ${page.title}`);
  console.log(`   Handle: ${page.handle}`);
  console.log(`   ID: ${page.id}`);
  console.log(`   URL: https://${STORE}/pages/${page.handle}\n`);

  return page;
}

async function updatePage(id, title, body) {
  const gid = id.startsWith('gid://') ? id : `gid://shopify/Page/${id}`;

  const query = `
    mutation updatePage($id: ID!, $page: PageUpdateInput!) {
      pageUpdate(id: $id, page: $page) {
        page {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    id: gid,
    page: {
      title,
      body,
    },
  };

  const result = await graphqlRequest(query, variables);

  if (result.data.pageUpdate.userErrors.length > 0) {
    console.error('Errors:', result.data.pageUpdate.userErrors);
    return null;
  }

  const page = result.data.pageUpdate.page;
  console.log(`\n✅ Updated page: ${page.title}`);
  console.log(`   ID: ${page.id}\n`);

  return page;
}

async function deletePage(id) {
  const gid = id.startsWith('gid://') ? id : `gid://shopify/Page/${id}`;

  const query = `
    mutation deletePage($id: ID!) {
      pageDelete(id: $id) {
        deletedPageId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const result = await graphqlRequest(query, { id: gid });

  if (result.data.pageDelete.userErrors.length > 0) {
    console.error('Errors:', result.data.pageDelete.userErrors);
    return false;
  }

  console.log(`\n✅ Deleted page: ${result.data.pageDelete.deletedPageId}\n`);
  return true;
}

// ============ NAVIGATION OPERATIONS ============

async function listNavigation() {
  const query = `
    query {
      menus(first: 10) {
        edges {
          node {
            id
            title
            handle
            items(first: 20) {
              edges {
                node {
                  id
                  title
                  url
                  type
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await graphqlRequest(query);
  const menus = result.data.menus.edges.map(e => e.node);

  console.log('\n🧭 Navigation Menus:\n');
  menus.forEach(menu => {
    console.log(`📁 ${menu.title} (${menu.handle})`);
    console.log(`   ID: ${menu.id}`);
    menu.items.edges.forEach(item => {
      console.log(`   └─ ${item.node.title}: ${item.node.url}`);
    });
    console.log('');
  });

  return menus;
}

// ============ CLI HANDLER ============

function readFileArg(arg) {
  if (arg.startsWith('@')) {
    const filePath = arg.slice(1);
    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    return readFileSync(filePath, 'utf-8');
  }
  return arg;
}

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  try {
    switch (command) {
      // Theme commands
      case 'list-themes':
        await listThemes();
        break;

      case 'get-theme-file':
        if (args.length < 2) {
          console.error('Usage: get-theme-file <theme-id> <filename>');
          console.error('Example: get-theme-file 182960718119 config/settings_data.json');
          process.exit(1);
        }
        await getThemeFile(args[0], args[1]);
        break;

      case 'update-theme-file':
        if (args.length < 3) {
          console.error('Usage: update-theme-file <theme-id> <filename> <content|@file>');
          process.exit(1);
        }
        await updateThemeFile(args[0], args[1], readFileArg(args[2]));
        break;

      case 'get-settings':
        await getSettings(args[0]);
        break;

      case 'update-settings':
        if (args.length < 2) {
          console.error('Usage: update-settings <theme-id> <json-content|@file>');
          process.exit(1);
        }
        await updateSettings(args[0], readFileArg(args[1]));
        break;

      case 'set-color':
        if (args.length < 3) {
          console.error('Usage: set-color <theme-id> <setting-name> <hex-color>');
          console.error('Example: set-color 182960718119 colors_accent_1 "#0066CC"');
          process.exit(1);
        }
        await setColor(args[0], args[1], args[2]);
        break;

      // Page commands
      case 'list-pages':
        await listPages();
        break;

      case 'get-page':
        if (!args[0]) {
          console.error('Usage: get-page <id>');
          process.exit(1);
        }
        await getPage(args[0]);
        break;

      case 'create-page':
        if (args.length < 3) {
          console.error('Usage: create-page "Title" "handle" "HTML content"');
          console.error('Or:    create-page "Title" "handle" @file.html');
          process.exit(1);
        }
        await createPage(args[0], args[1], readFileArg(args[2]));
        break;

      case 'update-page':
        if (args.length < 3) {
          console.error('Usage: update-page <id> "Title" "HTML content"');
          console.error('Or:    update-page <id> "Title" @file.html');
          process.exit(1);
        }
        await updatePage(args[0], args[1], readFileArg(args[2]));
        break;

      case 'delete-page':
        if (!args[0]) {
          console.error('Usage: delete-page <id>');
          process.exit(1);
        }
        await deletePage(args[0]);
        break;

      // Navigation commands
      case 'list-navigation':
        await listNavigation();
        break;

      default:
        console.log(`
Shopify Admin API CLI for White Pine Medical

Usage:
  node shopify-admin-api.mjs <command> [args]

THEME COMMANDS:
  list-themes                              List all themes
  get-theme-file <theme-id> <filename>     Get theme file content
  update-theme-file <theme-id> <file> <content>  Update theme file
  get-settings [theme-id]                  Get settings_data.json (default: dev theme)
  update-settings <theme-id> <json|@file>  Update settings_data.json
  set-color <theme-id> <name> <hex>        Set a color setting

PAGE COMMANDS:
  list-pages                               List all pages
  get-page <id>                            Get page details
  create-page "Title" "handle" "HTML"      Create new page
  update-page <id> "Title" "HTML"          Update existing page
  delete-page <id>                         Delete a page

NAVIGATION COMMANDS:
  list-navigation                          List navigation menus

THEME IDs:
  Dev (Broadcast): ${DEV_THEME_ID} - Safe to modify
  Live (TS Media): ${LIVE_THEME_ID} - NEVER modify

Examples:
  node shopify-admin-api.mjs list-themes
  node shopify-admin-api.mjs get-settings
  node shopify-admin-api.mjs set-color ${DEV_THEME_ID} colors_accent_1 "#0066CC"
  node shopify-admin-api.mjs create-page "Urgent Care" "urgent-care" "<h1>Coming Soon</h1>"
        `);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
