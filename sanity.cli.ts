import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './sanity/env';

export default defineCliConfig({
  api: { projectId, dataset },
  // Hosted Studio: https://onelove-blog.sanity.studio (the site's /studio redirects here).
  studioHost: 'onelove-blog',
  deployment: { appId: 'hm2ni4r8weyzjg757df4w532' },
});
