import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('publication');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PublicationSchema = new Schema(
    {
      thematique: {
        type: Schema.Types.ObjectId,
        ref: 'thematique',
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'categoryPublication',
      },
      type: {
        type: String,
        required: true,
        enum: [
          'Texte',
          'audio',
          'vidéo',
          'lien web',
          'photo',
          'infographie',
          'statistiques',
          'autre',
        ],
      },
      supports: [FileSchema],
      description: {
        type: String,
        required: true,
      },
      statut: {
        type: String,
        required: true,
        enum: ['archive', 'en_attente', 'valide', 'rejete'],
      },
      date: {
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

  PublicationSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PublicationSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PublicationSchema.set('toJSON', {
    getters: true,
  });

  PublicationSchema.set('toObject', {
    getters: true,
  });

  return database.model('publication', PublicationSchema);
};
