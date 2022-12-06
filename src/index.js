/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const compare = (obj1, obj2) => {
  const arrayKeys1 = Object.keys(obj1);
  const arrayKeys2 = Object.keys(obj2);
  const uniqueKeysFrom1 = _.difference(arrayKeys1, arrayKeys2);
  const result = [];

  for (const key of uniqueKeysFrom1) {
    const sign = '  - ';
    result.push([key, obj1[key], sign]);
  }

  for (const key of arrayKeys1) {
    if (arrayKeys2.includes(key)) {
      if (obj2[key] === obj1[key]) {
        const sign = '    ';
        result.push([key, obj1[key], sign]);
      }

      if (obj2[key] !== obj1[key]) {
        let sign = '  - ';
        result.push([key, obj1[key], sign]);
        sign = '  + ';
        result.push([key, obj2[key], sign]);
      }
    }
  }

  for (const key of arrayKeys2) {
    if (!arrayKeys1.includes(key)) {
      const sign = '  + ';
      result.push([key, obj2[key], sign]);
    }
  }

  const sortedResult = _.sortBy(result, [0]);

  const formattedArray = sortedResult.map((elem) => {
    const [key, value, sign] = elem;
    return `${sign}${key}: ${value}`;
  });
  formattedArray.unshift('{');
  formattedArray.push('}');
  const outputString = formattedArray.join('\n');
  console.log(outputString);
  return outputString;
};

export default (path1, path2) => {
  const fileData1 = JSON.parse(fs.readFileSync(path.resolve(path1)));
  const fileData2 = JSON.parse(fs.readFileSync(path.resolve(path2)));
  const output = compare(fileData1, fileData2);
  return output;
};