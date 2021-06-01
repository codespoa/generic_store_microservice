import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import 'dotenv/config';

import { jsonConfig } from './config/server.config';

(async () => {
  try {
    const { nameApplication, hostApplication, config, security, services } =
      await jsonConfig();

    const app = express();

    if (config.enabledMorgan) {
      app.use(logger('dev'));
    }

    if (security.enabledHelmet) {
      app.use(helmet());
    }

    if (security.enabledJSON) {
      app.use(express.json());
    }

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.get('/', (_, res) => {
      return res.json({ message: 'Running application' });
    });

    services.forEach(({ nameRoute, url }) => {
      app.use(
        `/${nameRoute}`,
        createProxyMiddleware({
          target: `${url}/${nameRoute}`,
          changeOrigin: true,
        }),
      );
    });

    app.listen(process.env.APP_PORT, () => {
      console.log(
        `Application ${nameApplication} is running on host ${hostApplication} on port ${process.env.APP_PORT}`,
      );
    });
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
})();
