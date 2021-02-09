import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PickupTimeslotsService {

  constructor() { }



  maxLength: number;

  firstTimeslotStartHour: number = 10;
  firstTimeslotStartMinute: number = 0;

  lastTimeslotStartHour: number = 17
  lastTimselotStartMinute: number = 0;

  timeslotDurationInMilliseconds: number = 60 * 60 * 1000;

  // THE AMOUNT OF MINUTES BEFORE THE UNAVAILABILITY OF THE APPROACHING TIMESLOT SETS IN 
  minutesBeforeAvailabilityStops: number = 10
  
  private createStartPickupTimestamps(selectedDate) {
    // CREATE AN ARRAY WITH A TIMESTAMP FOR THE START OF EACH TIMESLOT, STARTING TODAY AT 17:00 UNTILL 19:45, WITH FITEEN MINUTES IN BETWEEN
    const minutesInterval = 15;
    const startPickupTimestamps: number[] = [];

    let firstTimeslotStart = selectedDate.setHours(this.firstTimeslotStartHour, this.firstTimeslotStartMinute);
    startPickupTimestamps.push(firstTimeslotStart);
    const lastTimeslotStart = selectedDate.setHours(this.lastTimeslotStartHour, this.lastTimselotStartMinute);
    while(firstTimeslotStart < lastTimeslotStart) {
      firstTimeslotStart = firstTimeslotStart + this.timeslotDurationInMilliseconds
      startPickupTimestamps.push(firstTimeslotStart);
    }
    this.maxLength = startPickupTimestamps.length;
    return startPickupTimestamps
  }

  private filterTimestamps(selectedDate) {
    // TAKE OUT THE TIMESTAMPS THAT OCCUR BEFORE THE GIVEN ARGUMENT
    const filteredTimestamps = [];
    const startPickupTimestamps = this.createStartPickupTimestamps(selectedDate)
    startPickupTimestamps.forEach((stamp: number) => {
      // ? now
      // SLOT AVAILABLE UNTIL 10 MINUTES BEFORE THE NEXT SLOT EXPIRES
      if ((stamp - (this.minutesBeforeAvailabilityStops * 60 * 1000)) > new Date().getTime()) {
        filteredTimestamps.push(stamp);
      }
    });
    return filteredTimestamps
    
  }
  private createTimestampSlots(selectedDate) {
    // CREATE AN ARRAY OF ARRAYS WITH THE STARTSTAMP AND ENDSTAMP FOR EACH STARTSTAMP
    const filteredTimestamps = this.filterTimestamps(selectedDate);
    const filteredStampSlots = []
    filteredTimestamps.forEach((stamp: number) => {
      filteredStampSlots.push([stamp, stamp + this.timeslotDurationInMilliseconds]);
    })
    return filteredStampSlots  
  }
  
  private convertTimestampsToStrings(selectedDate) {
    // FOR EACH ARRAY IN THE ARRAY: CREATE A STRING SHOWING THE HOUR AND MINUTES FOR THE BEGINSTAMP AND THE ENDSTAMP AND SEPARATE WITH '-'
    // RETURN THE ARRAY
    const filteredStampSlots = this.createTimestampSlots(selectedDate)
    const filteredStringSlots = [];
    filteredStampSlots.forEach((slot: number[]) => {
      filteredStringSlots.push(
        new Date(slot[0]).toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'}) + ' - ' +
        new Date(slot[1]).toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'})
        // new Date(slot[0]).toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'})
        
      )
    });
    // if(filteredStringSlots.length < this.maxLength) {
    //   filteredStringSlots.unshift('haast?, bel [ADD PHONE NUMBER]');
    //   filteredStringSlots.push('last');
    // }
    return filteredStringSlots;
  }

  public getTimeslots(selectedDate: Date) {
    // CARRY selectedDate ALL THE WAY UP TO "this.createStartPickupTimestamps()"
    return this.convertTimestampsToStrings(selectedDate)
  }
}
