const production = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';

export const isProduction = (): boolean => production;
export const isTest = (): boolean => test;
