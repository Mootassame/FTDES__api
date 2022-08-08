import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('action');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ActionSchema = new Schema(
    {
      sujet: {
        type: String,
        required: true,
        enum: ['absenceInfrastructure', 'transport'],
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
      type: {
        type: String,
        required: true,
        enum: ['Collectif', 'Individuel'],
      },
      genre: {
        type: String,
        required: true,
        enum: ['Femmes', 'Hommes', 'Mixte', 'Inconnu'],
      },
      categorie: {
        type: String,
        required: true,
        enum: [
          'Rassemblement protestataire',
          'Manifestation',
        ],
      },
      espace: {
        type: String,
        required: true,
        enum: [
          'Médias',
          'Routes',
          'Réseaux sociaux',
          'Espaces de travail',
        ],
      },
      acteurs: {
        type: String,
        required: true,
        enum: ['Jeunes', 'employés', 'eleves', 'etudiants'],
      },
      description: {
        type: String,
      },
      modeAction: {
        type: String,
        required: true,
        enum: ['Instantané', 'Planifié'],
      },
      mouvement: {
        type: Schema.Types.ObjectId,
        ref: 'mouvement',
      },
      suicide: [
        {
          type: Schema.Types.ObjectId,
          ref: 'suicide',
        },
      ],
      violence: [
        {
          type: Schema.Types.ObjectId,
          ref: 'violence',
        },
      ],

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

  ActionSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ActionSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ActionSchema.set('toJSON', {
    getters: true,
  });

  ActionSchema.set('toObject', {
    getters: true,
  });

  return database.model('action', ActionSchema);
};
