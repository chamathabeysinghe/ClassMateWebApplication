import { ClassMateWebAppPage } from './app.po';

describe('class-mate-web-app App', function() {
  let page: ClassMateWebAppPage;

  beforeEach(() => {
    page = new ClassMateWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
