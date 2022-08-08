import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('mediatique');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const MediatiqueSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      type: {
        type: String,
        required: true,
        enum: [
          "poadcast",
          "documentaire",
          "videos",
          "printers",
          "exposition"
        ],
      },
      photos: [FileSchema],
      videos: [FileSchema],
      attachements: [FileSchema],
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

  MediatiqueSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  MediatiqueSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  MediatiqueSchema.set('toJSON', {
    getters: true,
  });

  MediatiqueSchema.set('toObject', {
    getters: true,
  });

  return database.model('mediatique', MediatiqueSchema);
};
