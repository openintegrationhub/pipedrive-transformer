/* eslint max-len: 'off' */

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

module.exports.getExpression = (msg) => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }

  const addresses = [];

  const pipedriveAddresses = {
    ...(msg.body.data.private_street && {
      street: msg.body.data.private_street,
    }),
    ...(msg.body.data.private_street_number && {
      streetNumber: String(msg.body.data.private_street_number),
    }),
    ...(msg.body.data.private_zip_code && {
      zipcode: String(msg.body.data.private_zip_code),
    }),
    ...(msg.body.data.private_town && { city: msg.body.data.private_town }),
    ...(msg.body.data.private_state && { region: msg.body.data.private_state }),
    ...(msg.body.data.private_country && {
      country: msg.body.data.private_country,
    }),
    ...(msg.body.data.private_country_symbol && {
      countryCode: msg.body.data.private_country_symbol,
    }),
  };

  const pipedriveContactData = [
    {
      type: "email",
      value: msg.body.data.email,
    },
    {
      type: "mobil",
      value: String(msg.body.data.private_mobile_phone),
    },
    {
      type: "mobil",
      value: String(msg.body.data.mobile_phone),
    },
    {
      type: "phone",
      value: String(msg.body.data.phone),
    },
    {
      type: "fax",
      value: String(msg.body.data.fax),
    },
  ];

  const contactData = pipedriveContactData;
  // .forEach(
  //   (cd) => cd.value && cd.value !== "undefined"
  // );

  if (Object.keys(pipedriveAddresses).length >= 1) {
    addresses.push(pipedriveAddresses);
  }

  const relations = [];

  if (msg.body.data.for_rowid && msg.body.data.for_rowid !== 0) {
    relations.push({
      label: "employee",
      uids: [String(msg.body.data.for_rowid)],
    });
  }

  const expression = {
    meta: {
      recordUid: msg.body.meta.recordUid,
      applicationUid:
        msg.body.meta.applicationUid !== undefined &&
        msg.body.meta.applicationUid !== null
          ? msg.body.meta.applicationUid
          : "appUid not set yet",
      iamToken:
        msg.body.meta.iamToken !== undefined && msg.body.meta.iamToken !== null
          ? msg.body.meta.iamToken
          : undefined,
      domainId:
        msg.body.meta.domainId !== undefined && msg.body.meta.domainId !== null
          ? msg.body.meta.domainId
          : undefined,
      schema:
        msg.body.meta.schema !== undefined && msg.body.meta.schema !== null
          ? msg.body.meta.schema
          : undefined,
    },
    data: {
      firstName: msg.body.data.first_name,
      lastName: msg.body.data.last_name,
      title: msg.body.data.title,
      jobTitle: msg.body.data.position,
      photo: msg.body.data.picture_url,
      addresses,
      contactData: [
        { type: "email", value: msg.body.data.email.value },
        { type: "mobil", value: msg.body.data.phone },
      ],
      relations,
    },
  };

  console.log(expression.data);

  return expression;
};
