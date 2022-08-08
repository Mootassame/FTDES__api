import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('categoryAppel');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CategoryAppelSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      demandeAppui: [
        {
          type: Schema.Types.ObjectId,
          ref: 'demandeAppui',
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

  CategoryAppelSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  CategoryAppelSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CategoryAppelSchema.set('toJSON', {
    getters: true,
  });

  CategoryAppelSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'categoryAppel',
    CategoryAppelSchema,
  );
};
