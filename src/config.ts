interface IGranularVerbosifySetting {
  parametersAtTimeOfCall: boolean;
  returnValue: boolean;
}

type VerbosifySetting = true | false | IGranularVerbosifySetting;

type SupportedLogTool = 'winston' | 'console'

export interface IVerbosifyConfig {
  features: Record<string, VerbosifySetting>;
  logger: SupportedLogTool;
  winston?: any;
}

class VerbosityConfig implements IVerbosifyConfig {
  features: Record<string, VerbosifySetting>;
  logger: SupportedLogTool;
  initialized: boolean;
  winston?: any;
  constructor() {
    this.features = {};
    this.logger = 'console';
    this.initialized = false;
  }

  unmount() {
    this.features = {};
    this.logger = 'console';
    this.initialized = false;
    delete this.winston;
  }

  initialize(config: IVerbosifyConfig) {
    this.features = { ...config.features };
    this.logger = config.logger;
    switch(config.logger) {
      case 'console': {
        break;
      }
      case 'winston': {
        if (!config.winston) {
          throw new Error('Expected a winston instance in the config.');
        }
        this.winston = config.winston;
        break;
      }
      default: {
        throw new Error('Unsupported log tool: ' + config.logger)
      }
    }
    this.initialized = true;
  }

  log(message: string, keyValues?: Record<string, any>) {
    switch(this.logger) {
      case 'console': {
        const keyValuesString = keyValues ? ': ' + JSON.stringify(keyValues) : '';
        return console.log(message + keyValuesString);
      }
      case 'winston': {
        return this.winston.info(message, keyValues);
      }
    }
  }
}

export const Config = new VerbosityConfig();
