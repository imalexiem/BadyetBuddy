import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: './utils/schema.jsx',

  /*driver: "pglite",*/
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_CxnaMFsOX40E@ep-wild-cherry-a8dmsao0-pooler.eastus2.azure.neon.tech/BadyetBuddy?sslmode=require',
  },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  entities: {
    roles: {
      provider: '',
      exclude: [],
      include: []
    }
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
