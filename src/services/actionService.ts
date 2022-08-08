import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import ActionRepository from '../database/repositories/actionRepository';
import MouvementRepository from '../database/repositories/mouvementRepository';
import SuicideRepository from '../database/repositories/suicideRepository';
import ViolenceRepository from '../database/repositories/violenceRepository';

export default class ActionService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.mouvement = await MouvementRepository.filterIdInTenant(data.mouvement, { ...this.options, session });
      data.suicide = await SuicideRepository.filterIdsInTenant(data.suicide, { ...this.options, session });
      data.violence = await ViolenceRepository.filterIdsInTenant(data.violence, { ...this.options, session });

      const record = await ActionRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'action',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.mouvement = await MouvementRepository.filterIdInTenant(data.mouvement, { ...this.options, session });
      data.suicide = await SuicideRepository.filterIdsInTenant(data.suicide, { ...this.options, session });
      data.violence = await ViolenceRepository.filterIdsInTenant(data.violence, { ...this.options, session });

      const record = await ActionRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'action',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await ActionRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return ActionRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return ActionRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ActionRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await ActionRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
