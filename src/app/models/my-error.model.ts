export class MyError {

    constructor(
      public message: string,
      public location?: string,
      public name?: string,
      public status?: string,
      public statusText?: string

    ) { }
  }