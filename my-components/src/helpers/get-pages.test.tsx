import { getPages } from '../constants/get-pages';
import EditRequest from 'pages/edit-request/edit-request';
import { NotFoundPage } from 'pages/error-page/error-page';
import { PAGE_TITLES } from '../constants/content.const';

describe('getPages', () => {
  [
    { permission: { root: true } },
    { permission: { adc: true } },
    { permission: { sdm: true } },
  ].forEach(({ permission }) => {
    it('should return a component if allowed by permissions', () => {
      const editRequest = getPages(permission).find(
        (e) => e.name === PAGE_TITLES.editRequest,
      );
      const component = editRequest?.component === EditRequest;

      expect(component).toBeTruthy();
    });

    it('should return error page if denied by permission', () => {
      const editRequest = getPages({}).find(
        (e) => e.name === PAGE_TITLES.editRequest,
      );
      const component = editRequest?.component === NotFoundPage;

      expect(component).toBeTruthy();
    });
  });
});
