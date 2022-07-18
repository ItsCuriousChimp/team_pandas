export class DateTimeHelper {
  public getCurrentDate(): Date {
    return new Date();
  }

  public getDaysAfter(delta: number): Date {
    const oneDayInMilliseconds: number = 1000 * 60 * 60 * 24;
    return new Date(new Date().getTime() + oneDayInMilliseconds * delta);
  }
}
