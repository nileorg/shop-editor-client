import generateId from '@/utils/generateId';

type Parameters = {
  title: string;
  description: string;
};

export default ({ title, description }: Parameters) => ({
  id: generateId(),
  title,
  description,
  date: Date.now(),
});
