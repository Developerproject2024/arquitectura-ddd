import { envValidationSchema } from "@shared/schema/env.schema";


describe('envValidationSchema', () => {
  it('valida correctamente un objeto válido', () => {
    const env = {
      database: {
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USERNAME: 'user',
        DB_PASSWORD: 'pass',
        DB_NAME: 'testdb',
      },
      API_KEY: '12345',
      NODE_ENV: 'development',
    };

    const { error } = envValidationSchema.validate(env);
    expect(error).toBeUndefined();
  });

  it('falla si falta una variable requerida', () => {
    const env = {
      database: {
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USERNAME: 'user',
        DB_PASSWORD: 'pass'
      },
      API_KEY: '12345',
      NODE_ENV: 'development',
    };

    const { error } = envValidationSchema.validate(env);
    expect(error).toBeDefined();
    expect(error?.message).toContain('DB_NAME');
  });
});