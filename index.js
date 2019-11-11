import './config/database';
import server from './config/server';
import {
  PORT
} from './config/config';
import {
  getInstance as Logger
} from './utils/logger';

server.listen(PORT, () => {
  Logger.log('info', `app running on port ${PORT}`);
});