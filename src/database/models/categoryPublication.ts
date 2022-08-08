import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('categoryPublication');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CategoryPublicationSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      publications: [
        {
          type: Schema.Types.ObjectId,
          ref: 'publication',
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

  CategoryPublicationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  CategoryPublicationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CategoryPublicationSchema.set('toJSON', {
    getters: true,
  });

  CategoryPublicationSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'categoryPublication',
    CategoryPublicationSchema,
  );
};
