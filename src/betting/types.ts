export class Credit {
  readonly amount: number
  constructor (amount: number) {
    this.amount = Math.round(amount)
  }

  add (credit: Credit) {
    return new Credit(this.amount + credit.amount)
  }

  subtract (credit: Credit) {
    return new Credit(this.amount - credit.amount)
  }

  equals (credit?: Credit) {
    return (credit && credit.amount) === this.amount
  }
}