const moment = require("moment");
const eirLib = require("./lib/eir");

const loanAmount = 1000;
const tenor = 12; // in months
const nominalInterestRateMonthly = 1;
const startMonth = "04/2022";
const showLog = false;
const maxIteration = 100;
const acceptedDifferencePercentage = 10;

let eir = 21;

const fnParams = [loanAmount, tenor, nominalInterestRateMonthly, startMonth, eir];
// const diffInterest = eirLib.caleInterestDiff(loanAmount, tenor, nominalInterestRateMonthly, startMonth, eir, showLog);
const diffInterest = eirLib.caleInterestDiff.apply(null, fnParams);
console.log("Interest difference:", diffInterest.diff, ", percentage:", diffInterest.percentage);
