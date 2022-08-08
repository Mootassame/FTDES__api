import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('tags');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TagsSchema = new Schema(
    {
      titre: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
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

  TagsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  TagsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TagsSchema.set('toJSON', {
    getters: true,
  });

  TagsSchema.set('toObject', {
    getters: true,
  });

  return database.model('tags', TagsSchema);
};
