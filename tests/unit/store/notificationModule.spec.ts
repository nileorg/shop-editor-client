import notificationModule from '@/store/notificationModule';
import { MutationTypes, NotificationState } from '@/store/types';

const { mutations } = notificationModule;
const incrementLoadingCountMutation = mutations[MutationTypes.INCREMENT_LOADING_COUNT];
const decrementLoadingCountMutation = mutations[MutationTypes.DECREMENT_LOADING_COUNT];
const receiveNotificationMutation = mutations[MutationTypes.RECEIVE_NOTIFICATION];
const removeNotificationMutation = mutations[MutationTypes.REMOVE_NOTIFICATION];

it('should increment loading count', () => {
  const state = { loadingCount: 0 } as NotificationState;
  incrementLoadingCountMutation(state);
  expect(state).toStrictEqual({ loadingCount: 1 });
});

it('should increment loading count', () => {
  const state = { loadingCount: 1 } as NotificationState;
  decrementLoadingCountMutation(state);
  expect(state).toStrictEqual({ loadingCount: 0 });
});

it('should receive notifications', () => {
  const notification = {
    id: 'foo',
    title: 'bar',
    description: 'baz',
    date: 123,
  };
  const state = { notifications: [] } as unknown as NotificationState;
  receiveNotificationMutation(state, notification);
  expect(state).toStrictEqual({ notifications: [notification] });
});

it('should remove notifications', () => {
  const state = {
    notifications: [
      {
        id: 'foo',
        title: 'bar',
        description: 'baz',
        date: 123,
      },
    ],
  } as unknown as NotificationState;
  removeNotificationMutation(state, 'foo');
  expect(state).toStrictEqual({ notifications: [] });
});
