// A basic interface for the planet object returned by the api (just so we don't have a ton of 'any' types laying around all over)
export interface Planet {
  climate: string;
  diameter: string;
  gravity: string;
  name: string;
  population: string;

  // not the best practice, but just an app for fun and adding this so we don't have to add all fields here
  [key: string]: any;
}
