//@flow
import Pages from 'components/Pages';

type Route = {
  path: string,
  exact?: boolean,
  component: any,
};

const routes: Route[] = [
  {
    path: '/',
    exact: true,
    component: Pages.Landing,
  },
  {
    path: '/last-shot',
    component: Pages.LastShot,
  },
  {
    path: '/last-24-hours',
    component: Pages.Last24H,
  },
  {
    path: '/full-history',
    component: Pages.FullHistory,
  },
];

export default routes;
