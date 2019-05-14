import { Config } from '.';

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getFunctionName(func: Function): string {
  var ret = func.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

function getParameterNames(func: Function): string[] {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

export function verbosify<T extends Function>(originalFunction: T): Function {
  if (!Config.initialized) {
    throw new Error('Must call initializeVerbosify before wrapping functions.');
  }
  const functionName = getFunctionName(originalFunction);
  const parameterNames = getParameterNames(originalFunction);
  return function(...args: any[]) {
    const argsRng = Array.prototype.slice.call(args);
    const argsToLog: Record<string, any> = {};
    for (let i = 0; i < parameterNames.length; i++) {
      const param = parameterNames[i];
      argsToLog[param] = argsRng[i];
    }

    Config.log(functionName + ' CALLED', argsToLog);

    const result = originalFunction(...args);

    Config.log(functionName + ' RETURNED', result);

    return result;
  };
}
