import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const sql = neon('postgresql://neondb_owner:npg_CxnaMFsOX40E@ep-wild-cherry-a8dmsao0-pooler.eastus2.azure.neon.tech/BadyetBuddy?sslmode=require');
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Migrations started...');
    // your migrations will run here
    console.log('Migrations completed.');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

main();