const moment = require("moment");
const financeLib = require("./finance");

const caleInterestDiff = (loanAmount, tenor, nominalInterestRateMonthly, startMonth, eir, showLog) => {

    const nominalInterestRateAnnually = nominalInterestRateMonthly * tenor / 100;
    const totalInterest = nominalInterestRateAnnually * loanAmount;

    const startMoment = moment(startMonth, "MM/YYYY").add(-1, "month");
    let outstandingPrincipal = loanAmount;

    const pmt = financeLib.PMT(eir / (12 * 100), tenor, loanAmount);

    if (showLog) {
        console.log("Interest Rate Calculator");
        console.log("----------------------------");
        console.log("Loan amount S$         : " + loanAmount);
        console.log("EIR (%)                : " + eir);
        console.log("Tenor (months)         : " + tenor);
        console.log("Total interest S$      : " + totalInterest);
        console.log("Start month            : " + moment(startMonth, "MM/YYYY").format("MMM-YYYY"));
        console.log("Monthly installment S$ : " + pmt);
        console.log("----------------------------");
    }

    let accumInterest = 0;
    for (let i = 0; i < tenor; i++) {
        const newMoment = startMoment.add(1, "month");
        const numOfDaysInMonth = newMoment.daysInMonth();

        const interest = (eir / 100) / 365 * numOfDaysInMonth * outstandingPrincipal;
        const principalPaid = (i == tenor - 1) ? outstandingPrincipal : pmt - interest;
        outstandingPrincipal -= principalPaid;
        if (showLog) {
            console.log(newMoment.format("MMM-YYYY"), pmt, principalPaid, interest, outstandingPrincipal);
        }
        accumInterest += interest;

    }

    const differentOfInterestVal = accumInterest - totalInterest;

    if (showLog) {
        console.log("----------------------------");
        console.log("Total accumulated interest S$ : " + accumInterest);
        console.log("Difference in interest S$ : " + differentOfInterestVal);
    }

    const val = {
        diff: differentOfInterestVal,
        percentage: (differentOfInterestVal / totalInterest) * 100
    };
    
    return val;

}
module.exports = { caleInterestDiff };