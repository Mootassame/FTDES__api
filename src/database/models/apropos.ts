import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('apropos');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AproposSchema = new Schema(
    {
      about: {
        type: String,
        required: true,
      },
      objectifs: {
        type: String,
        required: true,
      },
      services: {
        type: String,
        required: true,
      },
      contacts: {
        type: String,
        required: true,
      },
      tutorial: {
        type: String,
      },
      publicationDesc: {
        type: String,
      },
      appelDesc: {
        type: String,
      },
      forumDesc: {
        type: String,
      },
      mouvementDesc: {
        type: String,
      },
      mediatequeDesc: {
        type: String,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
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

  AproposSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  AproposSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AproposSchema.set('toJSON', {
    getters: true,
  });

  AproposSchema.set('toObject', {
    getters: true,
  });

  return database.model('apropos', AproposSchema);
};
