import { ConfigService } from './modules/config/config.service';
import * as path from 'path';

ConfigService.init(path.join(__dirname, '..', 'config', `${process.env.NODE_ENV || ''}.env`));

import { App } from './app';
App.start();
