import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('suicide');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SuicideSchema = new Schema(
    {
      date: {
        type: String,
        required: true,
      },
      region: {
        type: String,
        required: true,
        enum: [
          'tunis',
          'ariana',
          'gafsa',
          'kasserine',
          'beja',
          'sousse',
          'monastir',
        ],
      },
      age: {
        type: Number,
        required: true,
      },
      genre: {
        type: String,
        required: true,
        enum: ['Femme', 'Homme'],
      },
      maniere: {
        type: String,
        required: true,
        enum: ['Pendaison', 'Immolation'],
      },
      raison: {
        type: String,
        required: true,
        enum: ['Conflits familiaux', 'harcèlement'],
      },
      espace: {
        type: String,
        required: true,
        enum: ['Domicile', 'Public'],
      },
      statut: {
        type: String,
        required: true,
        enum: ['en_attente', 'valide', 'rejete', 'archive'],
      },
      cible: {
        type: String,
        required: true,
        enum: ['Gouvernement', 'Employeur'],
      },
      deces: {
        type: String,
        required: true,
        enum: ['Inconnu', 'Oui', 'Non'],
      },
      description: {
        type: String,
      },
      consequence: {
        type: String,
      },
      action: {
        type: Schema.Types.ObjectId,
        ref: 'action',
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

  SuicideSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  SuicideSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SuicideSchema.set('toJSON', {
    getters: true,
  });

  SuicideSchema.set('toObject', {
    getters: true,
  });

  return database.model('suicide', SuicideSchema);
};
