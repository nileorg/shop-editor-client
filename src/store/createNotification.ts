import generateId from '@/utils/generateId';
import { Notification } from './types';

type Parameters = {
  title: string;
  description: string;
};

export default ({ title, description }: Parameters): Notification => ({
  id: generateId(),
  title,
  description,
  date: Date.now(),
});
