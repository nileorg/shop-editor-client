const production = process.env.NODE_ENV === 'production';
const test = process.env.NODE_ENV === 'test';

export const isProduction = () => production;
export const isTest = () => test;
