const goalseekLib = require("./lib/goalseek");

const fn = (x, y, z) => x * y * z;
const fnParams = [1, 2, 3];


try {
    const result = goalseekLib.goalSeek({
        fn,
        fnParams,
        percentTolerance: 1,
        maxIterations: 1000,
        maxStep: 1,
        goal: 140,
        independentVariableIdx: 2
    });

    console.log(`result: ${result}`);
} catch (e) {
    console.log('error', e);
}

// result: 