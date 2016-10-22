import { PhpbbAngularPage } from './app.po';

describe('phpbb-angular App', function() {
  let page: PhpbbAngularPage;

  beforeEach(() => {
    page = new PhpbbAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
