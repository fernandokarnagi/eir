const IsNanError = TypeError('resulted in NaN');
const FailedToConvergeError = Error('failed to converge');
const InvalidInputsError = Error('invalid inputs');

const goalSeek = ({
    fn,
    fnParams,
    amountTolerance,
    customToleranceFn,
    maxIterations,
    goal,
    maxStep,
    independentVariableIdx,
}) => {
    if (typeof customToleranceFn !== 'function') {
        if (!amountTolerance) {
            throw InvalidInputsError
        }
    }

    let g;
    let y;
    let y1;
    let oldGuess;
    let newGuess;
    let res;

    const absoluteTolerance = amountTolerance;

    // iterate through the guesses
    for (let i = 0; i < maxIterations; i++) {
        // define the root of the function as the error
        res = fn.apply(null, fnParams);
        y = res - goal;
        if (isNaN(y)) throw IsNanError;

        // was our initial guess a good one?
        if (typeof customToleranceFn !== 'function') {
            if (Math.abs(y) <= Math.abs(absoluteTolerance)) return fnParams[independentVariableIdx];
        } else {
            if (customToleranceFn(res)) return fnParams[independentVariableIdx]
        }

        // set the new guess, correcting for maxStep
        oldGuess = fnParams[independentVariableIdx];
        newGuess = oldGuess + y;
        if (Math.abs(newGuess - oldGuess) > maxStep) {
            if (newGuess > oldGuess) {
                newGuess = oldGuess + maxStep;
            } else {
                newGuess = oldGuess - maxStep;
            }
        }


        fnParams[independentVariableIdx] = newGuess;

        // re-run the fn with the new guess
        y1 = fn.apply(null, fnParams) - goal;
        if (isNaN(y1)) throw IsNanError;

        // calculate the error
        g = (y1 - y) / y;
        if (g === 0) g = 0.0001;

        // set the new guess based on the error, correcting for maxStep
        newGuess = oldGuess - y / g;
        if (maxStep && Math.abs(newGuess - oldGuess) > maxStep) {
            if (newGuess > oldGuess) {
                newGuess = oldGuess + maxStep;
            } else {
                newGuess = oldGuess - maxStep;
            }
        }

        fnParams[independentVariableIdx] = newGuess;

        // console.log("EIR: ", newGuess, ", Diff: ", res)
    }

    // done with iterations, and we failed to converge
    throw FailedToConvergeError;
};

module.exports = { goalSeek };
