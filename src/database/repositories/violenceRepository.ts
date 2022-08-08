import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Violence from '../models/violence';
import Action from '../models/action';

class ViolenceRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Violence(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        }
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await MongooseRepository.refreshTwoWayRelationOneToMany(
      record,
      'action',
      Action(options.database),
      'violence',
      options,
    );    

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Violence(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Violence(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(
          options,
        ).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    record = await this.findById(id, options);

    await MongooseRepository.refreshTwoWayRelationOneToMany(
      record,
      'action',
      Action(options.database),
      'violence',
      options,
    );

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Violence(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Violence(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Action(options.database),
      'violence',
      options,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await Violence(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    return MongooseRepository.wrapWithSessionIfExists(
      Violence(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Violence(options.database)
        .findOne({_id: id, tenant: currentTenant.id})
      .populate('action'),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let criteriaAnd: any = [];
    
    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            date: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            date: {
              $lte: end,
            },
          });
        }
      }

      if (filter.region) {
        criteriaAnd.push({
          region: filter.region
        });
      }

      if (filter.type) {
        criteriaAnd.push({
          type: filter.type
        });
      }

      if (filter.mode) {
        criteriaAnd.push({
          mode: filter.mode
        });
      }

      if (filter.cadre) {
        criteriaAnd.push({
          cadre: filter.cadre
        });
      }

      if (filter.espace) {
        criteriaAnd.push({
          espace: filter.espace
        });
      }

      if (filter.degre) {
        criteriaAnd.push({
          degre: filter.degre
        });
      }

      if (
        filter.planifie === true ||
        filter.planifie === 'true' ||
        filter.planifie === false ||
        filter.planifie === 'false'
      ) {
        criteriaAnd.push({
          planifie:
            filter.planifie === true ||
            filter.planifie === 'true',
        });
      }

      if (filter.categorie) {
        criteriaAnd.push({
          categorie: filter.categorie
        });
      }

      if (filter.traitement) {
        criteriaAnd.push({
          traitement: filter.traitement
        });
      }

      if (filter.description) {
        criteriaAnd.push({
          description: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.description,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.idAgresseur) {
        criteriaAnd.push({
          idAgresseur: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.idAgresseur,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.objectif) {
        criteriaAnd.push({
          objectif: filter.objectif
        });
      }

      if (filter.explication) {
        criteriaAnd.push({
          explication: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.explication,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.outil) {
        criteriaAnd.push({
          outil: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.outil,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.typeAgresseur) {
        criteriaAnd.push({
          typeAgresseur: filter.typeAgresseur
        });
      }

      if (filter.nombreAgresseurRange) {
        const [start, end] = filter.nombreAgresseurRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            nombreAgresseur: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            nombreAgresseur: {
              $lte: end,
            },
          });
        }
      }

      if (filter.genreAgresseur) {
        criteriaAnd.push({
          genreAgresseur: filter.genreAgresseur
        });
      }

      if (filter.ageAgresseurRange) {
        const [start, end] = filter.ageAgresseurRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            ageAgresseur: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            ageAgresseur: {
              $lte: end,
            },
          });
        }
      }

      if (filter.idAgresse) {
        criteriaAnd.push({
          idAgresse: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.idAgresse,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.nombreAgresseRange) {
        const [start, end] = filter.nombreAgresseRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            nombreAgresse: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            nombreAgresse: {
              $lte: end,
            },
          });
        }
      }

      if (filter.typeAgresse) {
        criteriaAnd.push({
          typeAgresse: filter.typeAgresse
        });
      }
      if (filter.statut) {
        criteriaAnd.push({
          statut: filter.statut
        });
      }

      if (filter.genreAgresse) {
        criteriaAnd.push({
          genreAgresse: filter.genreAgresse
        });
      }

      if (filter.ageAgresseRange) {
        const [start, end] = filter.ageAgresseRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            ageAgresse: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            ageAgresse: {
              $lte: end,
            },
          });
        }
      }

      if (filter.action) {
        criteriaAnd.push({
          action: MongooseQueryUtils.uuid(
            filter.action,
          ),
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await Violence(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('action');

    const count = await Violence(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(this._mapRelationshipsAndFillDownloadUrl),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let criteriaAnd: Array<any> = [{
      tenant: currentTenant.id,
    }];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            type: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('type_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Violence(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.type,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Violence(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;





    return output;
  }
}

export default ViolenceRepository;
