/* eslint consistent-return: "off" */

/**
 * Copyright 2020 Cloudecosytem Gmbh

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* eslint no-invalid-this: 0 no-console: 0 */

const eioUtils = require("elasticio-node").messages;
const { getExpression } = require("./../expressions/personToOih.js");
const { transform } = require("./transform.js");

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 */
async function processAction(msg) {
  try {
    // const expression = getExpression(msg);
    // const result = await transform(expression);

    // console.log("This is the result from the transformation:", result.body);
    // if (result !== undefined) {
    //   return eioUtils.newMessageWithBody(result.body);
    // }
    const result = getExpression(msg);
    console.log("This is the result from the transformation:", result);
    if (result !== undefined) {
      this.emit("data", eioUtils.newMessageWithBody(result));
    }

    return;
  } catch (e) {
    console.log("ERROR: ", e);
    throw new Error(e);
  }
}

module.exports.process = processAction;
