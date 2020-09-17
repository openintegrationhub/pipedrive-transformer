/* eslint max-len: 'off' */
/* eslint camelcase: 'off' */
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

// const jsonata = require('jsonata');

module.exports.getExpression = (msg) => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }

  let email;
  let mobile_phone;
  let phone;
  let private_street;
  let private_street_number;
  let private_town;
  let private_country;
  let private_zip_code;

  if (msg.body.data.contactData) {
    const foundEmail = msg.body.data.contactData.find(
      (cd) => cd.type === "email"
    );
    if (foundEmail) email = foundEmail.value;

    const foundMobile = msg.body.data.contactData.find(
      (cd) => cd.type === "mobil" || cd.type === "mobile"
    );
    if (foundMobile) mobile_phone = foundMobile.value;

    const foundPhone = msg.body.data.contactData.find(
      (cd) => cd.type === "phone"
    );
    if (foundPhone) phone = foundPhone.value;
  }

  if (msg.body.data.addresses) {
    const foundAddress = msg.body.data.addresses.find(
      (adr) => adr.description === "primary"
    );

    if (foundAddress) {
      private_street = foundAddress.street; 
      private_street_number = foundAddress.streetNumber;
      private_town = foundAddress.city;
      private_country = foundAddress.country;
      private_zip_code = foundAddress.zipCode;
    }
  }

  // const rowids = (jsonata(`$filter(${JSON.stringify(msg.body.oihApplicationRecords)}, function($v, $i, $a) { ($v.recordUid != '') })`).evaluate());
  // const lastModifications = (jsonata(`$filter(${JSON.stringify(msg.body.oihApplicationRecords)}, function($v, $i, $a) { ($v.lastModified.timestamp != '') })`).evaluate());

  // oihApplicationRecords.$sift(function($v, $k) {
  //   ($v != ""
  //     and $k~ > /^recordUid/)
  // })

  // $filter(oihApplicationRecords, function($v, $i, $a) {
  //   ($v.recordUid != "")
  // }).recordUid

  // $map(oihApplicationRecords, function($v, $k) {
  // $v.recordUid
  // })

  // const filteredRowids = (jsonata(`$map(${JSON.stringify(rowids)}, function($v, $k) {$v.recordUid})`).evaluate());

  const expression = {
    meta: {
      operation: msg.body.operation,
      oihUid: msg.body.meta.oihUid ? msg.body.meta.oihUid : "",
      applicationUid: msg.body.meta.applicationUid
        ? msg.body.meta.applicationUid
        : "",
      iamToken: msg.body.meta.iamToken ? msg.body.meta.iamToken : undefined,
      recordUid: msg.body.meta.recordUid,
    },
    data: {
      name: msg.body.data.name,
      email,
      mobile_phone,
      phone,
      private_street,
      private_street_number,
      private_town,
      private_country,
      private_zip_code,
      // email: (msg.body.data.contactData && msg.body.data.contactData.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.contactData)}, function($v) { $v.type = 'email'})`).evaluate()).value : undefined,
      // mobile_phone: (msg.body.data.contactData && msg.body.data.contactData.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.contactData)}, function($v) { $v.description = 'secondary'})`).evaluate()).value : undefined,
      // phone: (msg.body.data.contactData && msg.body.data.contactData.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.contactData)}, function($v) { $v.description = 'primary'})`).evaluate()).value : undefined,
      // private_street: (msg.body.data.addresses && msg.body.data.addresses.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).street : undefined,
      // private_street_number: (msg.body.data.addresses && msg.body.data.addresses.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).streetNumber : undefined,
      // private_town: (msg.body.data.addresses && msg.body.data.addresses.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).city : undefined,
      // private_country: (msg.body.data.addresses && msg.body.data.addresses.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).country : undefined,
      // private_zip_code: (msg.body.data.addresses && msg.body.data.addresses.length > 0) ? (jsonata(`$filter(${JSON.stringify(msg.body.data.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).zipCode : undefined,
    },
  };

  return expression;
};
