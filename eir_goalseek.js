const moment = require("moment");
const eirLib = require("./lib/eir");
const goalseekLib = require("./lib/goalseek");

const loanAmount = 1000;
const tenor = 24; // in months
const nominalInterestRateMonthly = 1;
const startMonth = "01/2022";
const showLog = false;

const eir = 1;
const fn = (a, b, c, d, e) => {
    const diffInterest = eirLib.caleInterestDiff(a, b, c, d, e, showLog);
    return diffInterest.diff;
};
const fnParams = [loanAmount, tenor, nominalInterestRateMonthly, startMonth, eir];

try {
    const result = goalseekLib.goalSeek({
        fn,
        fnParams,
        amountTolerance: 1,
        maxIterations: 10000000,
        maxStep: 0.005,
        goal: 0,
        independentVariableIdx: 4
    });

    console.log("EIR: ", result);
} catch (e) {
    console.log('error', e);
}


