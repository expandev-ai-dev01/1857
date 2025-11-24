import sql from 'mssql';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: config.env === 'development',
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (pool) return pool;
  try {
    pool = await new sql.ConnectionPool(dbConfig).connect();
    logger.info('Database connected successfully');
    return pool;
  } catch (error) {
    logger.error('Database connection failed', error);
    throw error;
  }
};

export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

export const dbRequest = async (
  procedure: string,
  params: Record<string, any> = {},
  expectedReturn: ExpectedReturn = ExpectedReturn.Single,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> => {
  try {
    const connection = transaction || (await getPool());
    const request = connection.request();

    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value);
    });

    const result = await request.execute(procedure);

    if (expectedReturn === ExpectedReturn.None) {
      return null;
    }

    if (expectedReturn === ExpectedReturn.Single) {
      return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
    }

    if (expectedReturn === ExpectedReturn.Multi) {
      // Cast recordsets to any[] to avoid TS union type issues (IRecordSet[] | Dictionary)
      const recordsets = result.recordsets as any[];

      if (resultSetNames && resultSetNames.length > 0) {
        const mappedResults: Record<string, any[]> = {};
        for (let i = 0; i < recordsets.length; i++) {
          const name = resultSetNames[i] || `result${i}`;
          mappedResults[name] = recordsets[i];
        }
        return mappedResults;
      }
      return recordsets;
    }

    return result.recordset;
  } catch (error) {
    logger.error(`Database request failed: ${procedure}`, error);
    throw error;
  }
};
