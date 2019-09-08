function beforeEachSuite(title, fn) {
  before(title, function() {
    const suites = this.test.parent.suites || []
    suites.forEach(s => {
      s.beforeAll(fn)
      const hook = s._beforeAll.pop()
      s._beforeAll.unshift(hook)
    })
  })
}

export { beforeEachSuite }
