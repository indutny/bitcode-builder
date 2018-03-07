# bitcode-builder
[![Build Status](https://secure.travis-ci.org/indutny/bitcode-builder.svg)](http://travis-ci.org/indutny/bitcode-builder)
[![NPM version](https://badge.fury.io/js/bitcode-builder.svg)](https://badge.fury.io/js/bitcode-builder)

## Usage

```typescript
const Builder = require('bitcode-builder').Builder;

const b = new Builder();

const i32 = b.i(32);
const sig = b.signature(i32, [ i32, i32 ]);

const fn = sig.defineFunction(sig, [ 'param1', 'param2' ]);

const sum = fn.body.binop('add',
                          fn.getArgument('param1'),
                          fn.getArgument('param2'));
fn.body.ret(sum);

// Pass `fn` to `bitcode` module (WIP)
```

#### LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2018.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
