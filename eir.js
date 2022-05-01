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

const loanAmount = 1000; // principal
const tenor = 12; // in months
const eir = 35.074;
const nominalInterestRateMonthly = 1;
const startMonth = "02/2022";

const pmt = PMT(eir / (12 * 100), tenor, loanAmount);
// console.log(pmt);

for (let i = 0; i < tenor; i++) {
    
    const principal = pmt;

}