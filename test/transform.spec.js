/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { messages } = require('elasticio-node');
const { personFromOih, personToOih } = require('./seed/person');
const transformPersonFromOih = require('../lib/actions/transformPersonFromOih');
const transformPersonToOih = require('../lib/actions/transformPersonToOih');

describe('Transformation test', () => {
  it('should handle simple person tranformation in direction from OIH', () => {
    const exp = personFromOih();
    return transformPersonFromOih.process(messages.newMessageWithBody(exp))
      .then((result) => {
        expect(result.body).to.be.an('object');
        expect(result.body.data.firstname).to.be.equal('John');
        expect(result.body.data.name).to.be.equal('Doe');
        expect(result.body.data).to.deep.include({
          name: 'Doe',
          firstname: 'John',
          position: 'Sales manager',
          email: 'john@doe.com',
          phone: '00224477',
          mobile_phone: '123456789',
        });
      });
  });

  it('should produce an empty message if transformation returns undefined', () => {
    return transformPersonFromOih.process(messages.newMessageWithBody({}))
      .then((result) => {
        expect(result).to.be.undefined;
      });
  });

  it('should handle simple person tranformation in direction to OIH', () => {
    const exp = personToOih();
    return transformPersonToOih.process(messages.newMessageWithBody(exp))
      .then((result) => {
        expect(result.body).to.be.an('object');
        expect(result.body.data.firstName).to.be.equal('Mark');
        expect(result.body.data.lastName).to.be.equal('Smith');
        expect(result.body.data.jobTitle).to.be.equal('Marketing Manager');
        expect(result.body.data.addresses).to.be.an('array');
        expect(result.body.data.addresses[0]).to.deep.include({
          street: 'Main Str.',
          streetNumber: '120',
        });
        expect(result.body.data.relations).to.be.an('array');
        expect(result.body.data.relations[0].label).to.be.equal('employee');
        expect(result.body.data.relations[0].uids).to.be.an('array');
        expect(result.body.data.relations[0].uids[0]).to.be.equal('36863');
      });
  });

  it('should produce an empty message if transformation returns undefined', () => {
    return transformPersonToOih.process(messages.newMessageWithBody({}))
      .then((result) => {
        expect(result).to.be.undefined;
      });
  });
});
