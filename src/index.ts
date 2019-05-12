// Verbosify is a JavaScript logging library intended to wrap functions for better logging.

interface IGranularVerbosifySetting {
  parametersAtTimeOfCall: boolean;
  returnValue: boolean;
}

type VerbosifySetting = true | false | IGranularVerbosifySetting;

const verbosifyFeatures: Record<string, VerbosifySetting> = {};

// export function verbosify(config) {

// }

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;
function getParameterNames(func: Function) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

export function verbosify<T extends Function>(originalFunction: T) {
  const parameterNames = getParameterNames(originalFunction);
  return function(...args: any[]) {
    const argsRng = Array.prototype.slice.call(args);
    const argsToLog: Record<string, any> = {};
    for (let i = 0; i < parameterNames.length; i++) {
      const param = parameterNames[i];
      argsToLog[param] = argsRng[i];
    }
    console.log(JSON.stringify(argsToLog));
    const result = originalFunction(...args);
    console.log(result);
    return result;
  };
}
