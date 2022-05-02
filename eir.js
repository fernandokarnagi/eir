import moment from 'moment'

const PMT = (rate, nper, pv, fv, type) => {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv) / nper;

    var pvif = Math.pow(1 + rate, nper);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
        pmt /= (1 + rate);
    };

    return pmt.toFixed(2) * -1;
}

const loanAmount = 1000;
const tenor = 12; // in months
const eir = 35.074;
const nominalInterestRateMonthly = 1;
const startMonth = "04/2022";
const nominalInterestRateAnnually = nominalInterestRateMonthly * tenor / 100;
const totalInterest = nominalInterestRateAnnually * loanAmount;

const startMoment = moment(startMonth, "MM/YYYY").add(-1, "month");
let outstandingPrincipal = loanAmount;

const pmt = PMT(eir / (12 * 100), tenor, loanAmount);

console.log("Interest Rate Calculator");
console.log("----------------------------");
console.log("Loan amount S$         : " + loanAmount);
console.log("EIR (%)                : " + eir);
console.log("Tenor (months)         : " + tenor);
console.log("Total interest S$      : " + totalInterest);
console.log("Start month            : " + moment(startMonth, "MM/YYYY").format("MMM-YYYY"));
console.log("Monthly installment S$ : " + pmt);
console.log("----------------------------");

let accumInterest = 0;
for (let i = 0; i < tenor; i++) {
    const newMoment = startMoment.add(1, "month");
    const numOfDaysInMonth = newMoment.daysInMonth();

    const interest = (eir / 100) / 365 * numOfDaysInMonth * outstandingPrincipal;
    const principalPaid = (i == tenor - 1) ? outstandingPrincipal : pmt - interest;
    outstandingPrincipal -= principalPaid;
    console.log(newMoment.format("MMM-YYYY"), pmt, principalPaid, interest, outstandingPrincipal);
    accumInterest += interest;

}
console.log("----------------------------");
const differentOfInterestVal = accumInterest - totalInterest;
console.log("Total accumulated interest S$ : " + accumInterest);
console.log("Difference in interest S$ : " + differentOfInterestVal);
