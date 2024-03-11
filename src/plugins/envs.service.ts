import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import * as env from 'env-var';

expand(config());

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    PROD: env.get('PROD').required().asBool(),

    // MAILER
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),

    // MONGO
    MONGO_URL: env.get('MONGO_URL').required().asString(), // mongodb://${MONGO_USER}:${MONGO_PASS}@localhost:${MONGO_PORT}
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),
    MONGO_PORT: env.get('MONGO_PORT').default(27017).asPortNumber(),

    // POSTGRES
    POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
    POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
    POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
    POSTGRES_PORT: env.get('POSTGRES_PORT').default(5432).asPortNumber(),
    PRISMA_URL: env.get('PRISMA_URL').required().asString(),
};
