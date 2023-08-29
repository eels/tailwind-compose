import * as cva from './suites/cva.js';
import * as tc from './suites/tc.js';
import * as tv from './suites/tv.js';
import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

suite.add('class-variance-authority', () => {
  cva.avatar({ size: 'md' });
  cva.fallback();
  cva.image();
});

suite.add('tailwind-compose', () => {
  tc.avatar({ size: 'md' });
  tc.fallback();
  tc.image();
});

suite.add('tailwind-variants', () => {
  tv.avatar({ size: 'md' });
  tv.fallback();
  tv.image();
});

suite.on('cycle', (event) => {
  console.log(String(event.target));
});

suite.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.run({ async: true });
