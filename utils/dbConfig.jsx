import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

neonConfig.fetchConnectionCache = true;


const sql = neon('postgresql://neondb_owner:npg_CxnaMFsOX40E@ep-wild-cherry-a8dmsao0-pooler.eastus2.azure.neon.tech/BadyetBuddy?sslmode=require');
export const db = drizzle(sql, {schema} );