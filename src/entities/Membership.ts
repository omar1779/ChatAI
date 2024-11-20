export class Membership {
  constructor(
    public id: string,
    public userId: string,
    public type: MembershipType,
    public startDate: Date,
    public endDate: Date
  ) {}
}

export enum MembershipType {
  ONE_MONTH = 'ONE_MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  ONE_YEAR = 'ONE_YEAR'
}