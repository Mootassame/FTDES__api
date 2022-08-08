import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('domaine');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DomaineSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      artiste: [
        {
          type: Schema.Types.ObjectId,
          ref: 'artiste',
          required: false,
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

  DomaineSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  DomaineSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DomaineSchema.set('toJSON', {
    getters: true,
  });

  DomaineSchema.set('toObject', {
    getters: true,
  });

  return database.model('domaine', DomaineSchema);
};
