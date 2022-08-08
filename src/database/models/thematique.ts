import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('thematique');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ThematiqueSchema = new Schema(
    {
      titre: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      tags: [
        {
          type: Schema.Types.ObjectId,
          ref: 'tags',
        },
      ],
      publications: [
        {
          type: Schema.Types.ObjectId,
          ref: 'publication',
        },
      ],
      evenements: [
        {
          type: Schema.Types.ObjectId,
          ref: 'evenement',
        },
      ],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  ThematiqueSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ThematiqueSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ThematiqueSchema.set('toJSON', {
    getters: true,
  });

  ThematiqueSchema.set('toObject', {
    getters: true,
  });

  return database.model('thematique', ThematiqueSchema);
};
