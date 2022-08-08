import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('demandeAppui');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DemandeAppuiSchema = new Schema(
    {
      type: {
        type: String,
        required: true,
        enum: [
          "Legal",
          "logistique"
        ],
      },
      etat: {
        type: String,
        required: true,
        enum: [
          "En_ligne",
          "physique"
        ],
      },
      gouvernorat: {
        type: String,
        required: true,
        enum: [
          "tunis",
          "ariana",
          "beja",
          "ben_arouss",
          "bizerte",
          "gabes",
          "gafsa",
          "jendouba",
          "kairouan",
          "kasserine",
          "kebili",
          "kef",
          "mahdia",
          "manouba",
          "medenine",
          "monastir",
          "nabeul",
          "sfax",
          "sidi_bouzid",
          "siliana",
          "sousse",
          "tataouine",
          "tozeur",
          "zaghouan"
        ],
      },
      importance: {
        type: String,
        required: true,
        enum: [
          "Haute",
          "modere",
          "normale"
        ],
      },
      description: {
        type: String,
        required: true,
      },
      supports: [FileSchema],
     
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'categoryAppel',
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

  DemandeAppuiSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  DemandeAppuiSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DemandeAppuiSchema.set('toJSON', {
    getters: true,
  });

  DemandeAppuiSchema.set('toObject', {
    getters: true,
  });

  return database.model('demandeAppui', DemandeAppuiSchema);
};
