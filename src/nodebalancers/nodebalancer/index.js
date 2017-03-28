import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import IndexPage from './layouts/IndexPage';
import EditConfigPage from './layouts/EditConfigPage';
import AddConfigPage from './layouts/AddConfigPage';
import ConfigViewSummaryPage from './configs';

export default (
  <Route path=":nbLabel">
    <IndexRoute component={IndexPage} />
    <Route path="configs">
      <IndexRedirect to=".." />
      <Route path="create" component={AddConfigPage} />
      <Route path=":port/edit" component={EditConfigPage} />
      {ConfigViewSummaryPage}
    </Route>
  </Route>
);
