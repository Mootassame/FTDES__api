export default (app) => {
  app.post(
    `/tenant/:tenantId/mediatique`,
    require('./mediatiqueCreate').default,
  );
  app.put(
    `/tenant/:tenantId/mediatique/:id`,
    require('./mediatiqueUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/mediatique/import`,
    require('./mediatiqueImport').default,
  );
  app.delete(
    `/tenant/:tenantId/mediatique`,
    require('./mediatiqueDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/mediatique/autocomplete`,
    require('./mediatiqueAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/mediatique`,
    require('./mediatiqueList').default,
  );
  app.get(
    `/tenant/:tenantId/mediatique/:id`,
    require('./mediatiqueFind').default,
  );
};