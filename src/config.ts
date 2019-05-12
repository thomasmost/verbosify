interface IGranularVerbosifySetting {
  parametersAtTimeOfCall: boolean;
  returnValue: boolean;
}

type VerbosifySetting = true | false | IGranularVerbosifySetting;

export interface IVerbosifyConfig {
  features: Record<string, VerbosifySetting>;
  logger: string;
  winston?: any;
}

class VerbosityConfig implements IVerbosifyConfig {
  features: Record<string, VerbosifySetting>;
  logger: string;
  initialized: boolean;
  winston?: any;
  constructor() {
    this.features = {};
    this.logger = '';
    this.initialized = false;
  }

  unmount() {
    this.features = {};
    this.logger = '';
    this.initialized = false;
  }

  initialize(config: IVerbosifyConfig) {
    this.features = { ...config.features };
    this.logger = config.logger;
    if (config.logger === 'winston') {
      if (!config.winston) {
        throw new Error('Expected a winston instance in the config.');
      }
      this.winston = config.winston;
    }
    this.initialized = true;
  }

  consoleLog(message: string, keyValues: Record<string, any>) {
    const keyValuesString = keyValues ? JSON.stringify(keyValues) : '';
    console.log(message + ': ' + keyValuesString);
  }

  log(message: string, keyValues: Record<string, any>) {
    if (this.logger === 'console') {
      return this.consoleLog(message, keyValues);
    }
    if (this.logger === 'winston') {
      return this.winston.info(message, keyValues);
    }
    throw new Error('Unrecognized Logger: ' + this.logger);
  }
}

export const Config = new VerbosityConfig();
