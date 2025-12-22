import sql from 'mssql';

// Define a reasonable default row type — you can extend or replace this
type DatabaseRow = Record<string, unknown>;

type MssqlError = {
  message: string;
  code?: string;
  number?: number;
  state?: number;
  class?: number;
  lineNumber?: number;
  serverName?: string;
  procName?: string;
  originalError?: { info?: unknown };
};

let pool: sql.ConnectionPool | null = null;

const config: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  database: process.env.DB_DATABASE!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
    enableArithAbort: true,
    instanceName: process.env.DB_INSTANCE_NAME || undefined,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 30000,
  connectionTimeout: 30000,
};

async function getPool() {
  if (!pool) {
    pool = await new sql.ConnectionPool(config).connect();
    console.log('Connected to SQL Server');
  }
  return pool;
}

export async function executeStoredProcedure<T = DatabaseRow>(
  procedureName: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  const pool = await getPool();
  const request = pool.request();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      // Safe cast: mssql accepts primitives, null, Date, and sql types
      request.input(key, value as sql.ISqlType | null);
    }
  });

  try {
    const result = await request.execute(procedureName);
    return (result.recordset as T[]) || [];
  } catch (error: unknown) {
    const err = error as MssqlError;

    console.error('=== SQL STORED PROCEDURE ERROR ===');
    console.error('Procedure:', procedureName);
    console.error('Parameters:', params);
    console.error('Message:', err.message);
    console.error('Code:', err.code);
    console.error('Number:', err.number);
    console.error('State:', err.state);
    console.error('Class:', err.class);
    console.error('Line:', err.lineNumber);
    console.error('Server:', err.serverName);
    console.error('ProcName:', err.procName);
    console.error('Original Info:', err.originalError?.info);
    console.error('=====================================');

    throw error;
  }
}


export async function queryDatabase<T = DatabaseRow>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  const pool = await getPool();
  const request = pool.request();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      request.input(key, value as sql.ISqlType | null);
    }
  });

  const result = await request.query(query);
  return (result.recordset as T[]) || [];
}