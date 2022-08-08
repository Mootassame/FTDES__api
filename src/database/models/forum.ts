import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('forum');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ForumSchema = new Schema(
    {
      titre: {
        type: String,
        required: true,
      },
      sujet: {
        type: String,
        required: true,
      },
      visibilite: {
        type: String,
        required: true,
        enum: ['Ouverte', 'Fermee'],
      },
      statut: {
        type: String,
        required: true,
        enum: ['en_attente', 'valide', 'rejete', 'archive'],
      },
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

  ForumSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ForumSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ForumSchema.set('toJSON', {
    getters: true,
  });

  ForumSchema.set('toObject', {
    getters: true,
  });

  return database.model('forum', ForumSchema);
};
