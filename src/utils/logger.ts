import { isProduction, isTest } from './environment';

const active = !isProduction() && !isTest;

type Parameter = string | Error;

export const log = (...messages: Parameter[]): void => {
  if (active) {
    console.log(...messages);
  }
};

export const logError = (...messages: Parameter[]): void => {
  if (active) {
    console.error(...messages);
  }
};
