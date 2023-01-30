# Ethereum Calculator app exercise for interview
This was a short coding exercise written for a job interview. The requirements were to build a calculator UI with the ability to convert between subdivided units of Ethereum.

## Getting started
1. `npm install`
2. To run static build locally: `npm run preview`
3. To run in dev mode with HMR: `npm run dev`

## Tools used
* Vite
* React
* TypeScript
* Styled Components (probably wasn't needed)
* Material UI (MUI)

## Known issues
Things I would probably improve on given more time:
* Cleaner UI, alignment, dark mode toggle
* Evaluate preview after each input
* Follow up on desired behavior around unit switching (should the input change? or just the result?)
* Add logic to evaluate function to allow for copy-pasting of alternate operator symbols like ÷, X, etc.
* Drill into edge cases around incorrect quirky floats using toLocaleString to format Gwei/Wei values (e.g. 530000.325 Eth produces incorrect Gwei value) - a BigNumber library would likely help this
* Write some Jest tests for a baseline of code coverage
* Find alternatives to eval() for safer input
* Optimizations:
    * Move some components or logic to separate files, reduce repetition
    * Possibly consolidate various state varibles into a single reducer
    * Look at reducing bundle size, import less of MUI
 