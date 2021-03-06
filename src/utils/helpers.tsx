export function appLog(this: any, ...logArguments: any) {
  if (__DEV__) {
    let LOG_PREFIX = '[APP]';
    let args = Array.prototype.slice.call(logArguments);
    args.unshift(LOG_PREFIX + ' ');
    let log: any;
    if (Function.prototype.bind) {
      // eslint-disable-next-line no-console
      log = Function.prototype.bind.call(console.log, console);
    } else {
      log = function () {
        // eslint-disable-next-line no-console
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

export function listToMatrix(
  list: Array<any>,
  elementsPerSubArray: number,
): Array<any> {
  let matrix: Array<any> = [],
    i,
    k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}
