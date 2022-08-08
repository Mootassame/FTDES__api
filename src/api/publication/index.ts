export default (app) => {
  app.post(
    `/tenant/:tenantId/publication`,
    require('./publicationCreate').default,
  );
  app.put(
    `/tenant/:tenantId/publication/:id`,
    require('./publicationUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/publication/import`,
    require('./publicationImport').default,
  );
  app.delete(
    `/tenant/:tenantId/publication`,
    require('./publicationDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/publication/autocomplete`,
    require('./publicationAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/publication`,
    require('./publicationList').default,
  );
  app.get(
    `/tenant/:tenantId/publication/:id`,
    require('./publicationFind').default,
  );
};