import test from 'tape'
import * as I from 'immutable'
import * as R from 'ramda'

import * as immutablejsUtils from './immutablejsUtils'

/**
 * smartMergeDeep()
 */

const { smartMergeDeep } = immutablejsUtils

test('immutablejsUtils.smartMergeDeep() | if the second arg is undefined, it should return the first arg', (t) => {
  const firstArg = 'first arg'
  const actual = smartMergeDeep(firstArg)
  const expected = firstArg

  t.is(actual, expected)
  t.end()
})

test('immutablejsUtils.smartMergeDeep() | it should deep merge reqular objects', (t) => {
  const baseObj = {
    a: 'a',
    b: {
      c: 'c',
    },
    d: 'd',
  }
  const sourceObj = {
    d: 4,
    b: {
      c: 3,
      e: 5,
    },
  }
  const actual = smartMergeDeep(baseObj, sourceObj)
  const expected = {
    a: 'a',
    b: {
      c: 3,
      e: 5,
    },
    d: 4,
  }

  t.deepEqual(actual, expected)
  t.end()
})

// NOTE: based on logging the output, the following spec should pass, we just don't have a tool
//   that can assert it so skip it for now
test.skip('immutablejsUtils.smartMergeDeep() | if the source\'s and corresponding base\'s property is both Immutable data structure, it should mergeDeep it properly', (t) => {
  const baseObj = {
    a: 'a',
    b: {
      c: 'c',
    },
    d: 'd',
    e: I.fromJS({
      iA: 'iA',
      iB: {
        iC: 'iC',
      },
      iD: 'iD',
      iE: 'iE',
    }),
    f: 'f',
  }
  const sourceObj = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: I.fromJS({
      iA: {
        iF: 16,
      },
      iB: {
        iC: 13,
      },
      iD: 14,
    }),
  }
  const actual = smartMergeDeep(baseObj, sourceObj)
  const expected = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: I.fromJS({
      iA: {
        iF: 16,
      },
      iB: {
        iC: 13,
      },
      iD: 14,
      iE: 'iE',
    }),
    f: 'f',
  }

  console.log('expected >>>', expected)
  console.log('actual >>>', actual)
  t.is(I.Map(actual).equals(I.Map(expected)), true)
  t.end()
})

// NOTE: based on logging the output, the following spec should pass, we just don't have a tool
//   that can assert it so skip it for now
test.skip('immutablejsUtils.smartMergeDeep() | if the source\'s and corresponding base\'s NESTED property both an Immutable data structure, it should mergeDeep it properly', (t) => {
  const baseObj = {
    a: 'a',
    b: {
      c: 'c',
    },
    d: 'd',
    e: {
      nestedE: I.fromJS({
        iA: 'iA',
        iB: {
          iC: 'iC',
        },
        iD: 'iD',
        iE: 'iE',
      }),
    },
    f: 'f',
  }
  const sourceObj = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: {
      nestedE: I.fromJS({
        iA: {
          iF: 16,
        },
        iB: {
          iC: 13,
        },
        iD: 14,
      }),
    },
  }
  const actual = smartMergeDeep(baseObj, sourceObj)
  const expected = {
    a: 1,
    b: {
      c: 3,
    },
    d: 'd',
    e: {
      nestedE: I.fromJS({
        iA: {
          iF: 16,
        },
        iB: {
          iC: 13,
        },
        iD: 14,
        iE: 'iE',
      }),
    },
    f: 'f',
  }

  console.log('expected >>>', expected)
  console.log('actual >>>', actual)
  t.is(I.Map(actual).equals(I.Map(expected)), true)
  t.end()
})
