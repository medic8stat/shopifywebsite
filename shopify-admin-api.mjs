#!/usr/bin/env node
/**
 * Shopify Admin API Client for White Pine Medical
 *
 * Usage:
 *   node shopify-admin-api.mjs list-pages
 *   node shopify-admin-api.mjs get-page <id>
 *   node shopify-admin-api.mjs create-page "Title" "handle" "HTML content"
 *   node shopify-admin-api.mjs update-page <id> "New Title" "HTML content"
 *   node shopify-admin-api.mjs delete-page <id>
 *   node shopify-admin-api.mjs list-navigation
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

// Load .env from script directory
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '.env') });

const STORE = process.env.SHOPIFY_STORE;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

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
  // Convert numeric ID to GID if needed
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

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  try {
    switch (command) {
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
        let body = args[2];
        // Support @filename syntax for reading HTML from file
        if (body.startsWith('@')) {
          const filePath = body.slice(1);
          if (!existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            process.exit(1);
          }
          body = readFileSync(filePath, 'utf-8');
        }
        await createPage(args[0], args[1], body);
        break;

      case 'update-page':
        if (args.length < 3) {
          console.error('Usage: update-page <id> "Title" "HTML content"');
          console.error('Or:    update-page <id> "Title" @file.html');
          process.exit(1);
        }
        let updateBody = args[2];
        if (updateBody.startsWith('@')) {
          const filePath = updateBody.slice(1);
          if (!existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            process.exit(1);
          }
          updateBody = readFileSync(filePath, 'utf-8');
        }
        await updatePage(args[0], args[1], updateBody);
        break;

      case 'delete-page':
        if (!args[0]) {
          console.error('Usage: delete-page <id>');
          process.exit(1);
        }
        await deletePage(args[0]);
        break;

      case 'list-navigation':
        await listNavigation();
        break;

      default:
        console.log(`
Shopify Admin API CLI for White Pine Medical

Usage:
  node shopify-admin-api.mjs <command> [args]

Commands:
  list-pages                          List all pages
  get-page <id>                       Get page details
  create-page "Title" "handle" "HTML" Create new page
  create-page "Title" "handle" @file  Create page from HTML file
  update-page <id> "Title" "HTML"     Update existing page
  delete-page <id>                    Delete a page
  list-navigation                     List navigation menus

Examples:
  node shopify-admin-api.mjs list-pages
  node shopify-admin-api.mjs create-page "Urgent Care" "urgent-care" "<h1>Coming Soon</h1>"
  node shopify-admin-api.mjs create-page "About" "about" @pages/about.html
        `);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
