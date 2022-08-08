import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('artiste');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ArtisteSchema = new Schema(
    {
      nom: {
        type: String,
        required: true,
      },
      prenom: {
        type: String,
        required: true,
      },
      domaine: {
        type: Schema.Types.ObjectId,
        ref: 'domaine',
      },
      adresse: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
      },
      espaceArtistique: {
        type: Schema.Types.ObjectId,
        ref: 'espaceArtistique',
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

  ArtisteSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ArtisteSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ArtisteSchema.set('toJSON', {
    getters: true,
  });

  ArtisteSchema.set('toObject', {
    getters: true,
  });

  return database.model('artiste', ArtisteSchema);
};
