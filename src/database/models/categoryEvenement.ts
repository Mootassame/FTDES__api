import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('categoryEvenement');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CategoryEvenementSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
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

  CategoryEvenementSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  CategoryEvenementSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CategoryEvenementSchema.set('toJSON', {
    getters: true,
  });

  CategoryEvenementSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'categoryEvenement',
    CategoryEvenementSchema,
  );
};
