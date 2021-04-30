export function appLog(this: any, ...logArguments: any) {
  if (__DEV__) {
    let LOG_PREFIX = '[APP]';
    let args = Array.prototype.slice.call(logArguments);
    args.unshift(LOG_PREFIX + ' ');
    let log: any;
    if (Function.prototype.bind) {
      log = Function.prototype.bind.call(console.log, console);
    } else {
      log = function () {
        Function.prototype.apply.call(console.log, console, args);
      };
    }
    log.apply(this, args);
  }
}
// Return a parsed object or null when json is invalid
export function safeJsonParse(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    appLog('isValidJson Error:', error);
    return null;
  }
}
