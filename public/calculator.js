// export anonymous function that returns object
export default function (bill, tip, numOfPeople) {
    return {
        // make sure all values are numbers
        bill: Number(bill),
        tip: Number(tip),
        numOfPeople: Number(numOfPeople),
        getTotal() {
            // return the total bill for one person & the tip for one person
            let eachBill = this.bill / this.numOfPeople
            let total = eachBill + Number(this.getTip())

            return total.toFixed(2)
        },
        getTip() {
            // calculate the tip amount and divide it for everyone
            if (this.tip >= 1) {
                this.tip = this.tip / 100
            }
            return ((this.bill * this.tip) / this.numOfPeople).toFixed(2)
        }
    }
}