import { isProduction, isTest } from './environment';

const active = !isProduction() && !isTest;

type Parameter = string | Error;

export const log = (...messages: Parameter[]) => {
  if (active) {
    console.log(...messages);
  }
};

export const logError = (...messages: Parameter[]) => {
  if (active) {
    console.error(...messages);
  }
};
