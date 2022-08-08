import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('evenement');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const EvenementSchema = new Schema(
    {
      thematique: {
        type: Schema.Types.ObjectId,
        ref: 'thematique',
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'categoryEvenement',
      },
      type: {
        type: String,
        required: true,
        enum: [
          'texte',
          'audio',
          'vidéo',
          'lien_web',
          'photo',
          'infographie',
          'statistiques',
        ],
      },
      supports: [FileSchema],
      description: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      statut: {
        type: String,
        required: true,
        enum: ['En_attente', 'valide', 'rejete','archive'],
      },
      emplacement: {
        type: String,
        required: true,
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

  EvenementSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  EvenementSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  EvenementSchema.set('toJSON', {
    getters: true,
  });

  EvenementSchema.set('toObject', {
    getters: true,
  });

  return database.model('evenement', EvenementSchema);
};
