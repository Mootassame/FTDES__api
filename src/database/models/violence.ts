import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('violence');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ViolenceSchema = new Schema(
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
      type: {
        type: String,
        required: true,
        enum: ['Collectif', 'Individuel'],
      },
      mode: {
        type: String,
        required: true,
        enum: ['Physique', 'Morale', 'Verbale', 'Mixte'],
      },
      cadre: {
        type: String,
        required: true,
        enum: ['Urbain', 'Rural'],
      },
      espace: {
        type: String,
        required: true,
        enum: ['Rue', 'Transport'],
      },
      degre: {
        type: String,
        required: true,
        enum: ['Menace', 'Violence', 'Violence extrême'],
      },
      planifie: {
        type: Boolean,
        default: false,
      },
      categorie: {
        type: String,
        required: true,
        enum: ['Braquage', 'Viol', 'Meurtre'],
      },
      traitement: {
        type: String,
        required: true,
        enum: ['En fuite', 'Judiciaire'],
      },
      description: {
        type: String,
      },
      idAgresseur: {
        type: String,
        required: true,
      },
      objectif: {
        type: String,
        required: true,
        enum: ['Agression', 'Protestation'],
      },
      explication: {
        type: String,
      },
      outil: {
        type: String,
      },
      typeAgresseur: {
        type: String,
        required: true,
        enum: ['physique', 'Morale'],
      },
      nombreAgresseur: {
        type: Number,
      },
      genreAgresseur: {
        type: String,
        required: true,
        enum: ['Homme', 'Femme'],
      },
      ageAgresseur: {
        type: Number,
      },
      idAgresse: {
        type: String,
        required: true,
      },
      nombreAgresse: {
        type: Number,
      },
      typeAgresse: {
        type: String,
        required: true,
        enum: ['physique', 'Morale'],
      },
      genreAgresse: {
        type: String,
        required: true,
        enum: ['Homme', 'Femme'],
      },
      statut: {
        type: String,
        required: true,
        enum: ['en_attente', 'valide', 'rejete', 'archive'],
      },
      ageAgresse: {
        type: Number,
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

  ViolenceSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ViolenceSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ViolenceSchema.set('toJSON', {
    getters: true,
  });

  ViolenceSchema.set('toObject', {
    getters: true,
  });

  return database.model('violence', ViolenceSchema);
};
