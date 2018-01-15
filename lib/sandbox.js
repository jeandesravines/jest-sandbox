/**
 * @class Sandbox
 */
class Sandbox {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @private
     * @const {Array.<Function>}
     */
    this.spies = [];
  }

  /**
   * Restore all mocks
   */
  restoreAllMocks() {
    this.spies.forEach((spy) => spy.mockRestore());
    this.spies.splice(0);
  }

  /**
   * Create a mock
   * @param {Object} target - an object
   * @param {string} property - the property of the target
   * @param {boolean} [create] - if true, creates property if not exists
   * @return {Function} - the mocked function
   */
  spyOn(target, property, create = false) {
    if (!target[property] && create) {
      target[property] = () => void 0;
    }

    return (this.spies[this.spies.length] = jest.spyOn(target, property));
  }
}


module.exports = Sandbox;