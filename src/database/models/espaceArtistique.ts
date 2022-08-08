import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('espaceArtistique');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const EspaceArtistiqueSchema = new Schema(
    {
      artiste: {
        type: Schema.Types.ObjectId,
        ref: 'artiste',
        required: true,
      },
      supports: [FileSchema],
      titre: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
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

  EspaceArtistiqueSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  EspaceArtistiqueSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  EspaceArtistiqueSchema.set('toJSON', {
    getters: true,
  });

  EspaceArtistiqueSchema.set('toObject', {
    getters: true,
  });

  return database.model('espaceArtistique', EspaceArtistiqueSchema);
};
