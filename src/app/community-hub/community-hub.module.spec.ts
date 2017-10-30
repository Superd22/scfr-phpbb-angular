import { CommunityHubModule } from './community-hub.module';

describe('CommunityHubModule', () => {
  let communityHubModule: CommunityHubModule;

  beforeEach(() => {
    communityHubModule = new CommunityHubModule();
  });

  it('should create an instance', () => {
    expect(communityHubModule).toBeTruthy();
  });
});
