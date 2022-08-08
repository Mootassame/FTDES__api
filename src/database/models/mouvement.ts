import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('mouvement');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const MouvementSchema = new Schema(
    {
      sujet: {
        type: String,
        required: true,
        enum: [
          'titularisation',
          'no_infrastructure',
          'recrutement',
          'sport',
          'transport',
          'environnement',
          'droit_eau',
        ],
      },
      date: {
        type: String,
        required: true,
      },
      observation: {
        type: String,
      },
      actions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'action',
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

  MouvementSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  MouvementSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  MouvementSchema.set('toJSON', {
    getters: true,
  });

  MouvementSchema.set('toObject', {
    getters: true,
  });

  return database.model('mouvement', MouvementSchema);
};
