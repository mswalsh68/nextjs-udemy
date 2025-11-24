import sql from 'mssql';

const config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_DATABASE || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
    enableArithAbort: true,
    instancename: process.env.DB_INSTANCE_NAME || '',
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
  },
};

// Log configuration for debugging
// console.log('DB Config:', {
//   server: process.env.DB_SERVER,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   user: process.env.DB_USER,
//   encrypt: process.env.DB_ENCRYPT === 'true',
//   trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
// });

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch((err) => {
    console.error('Database connection failed:', JSON.stringify(err, null, 2));
    throw err;
  });

export async function executeStoredProcedure(procedureName, params = {}) {
  const pool = await poolPromise;
  const request = pool.request();

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }

  const result = await request.execute(procedureName);
  return result.recordset;
}

export async function queryDatabase(query, params = {}) {
  const pool = await poolPromise;
  const request = pool.request();

  for (const [key, value] of Object.entries(params)) {
    request.input(key, value);
  }

  const result = await request.query(query);
  return result.recordset;
}
