const fr = {
  app: {
    title: 'Application',
  },
  auth: {
    userNotFound:
    `Désolé, nous ne reconnaissons pas vos informations d'identification`,
    wrongPassword:
    `Désolé, nous ne reconnaissons pas vos informations d'identification`,
    weakPassword: `Ce mot de passe est très faible.`,
    emailAlreadyInUse: `L'adresse e-mail est déjà utilisé`,
    invalidEmail:
      `Veuillez fournir une adresse e-mail valide`,
    passwordReset: {
      invalidToken:
        `Le lien de réinitialisation du mot de passe n'est pas valide ou a expiré.`,
      error: `e-mail  non reconnu`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        `Le lien de vérification de l'e-mail n'est pas valide ou a expiré.`,
      error: `e-mail  non reconnu`,
      signedInAsWrongUser:
        `Cet e-mail de confirmation a été envoyé à {0} mais vous êtes connecté en tant que {1}.`,
    },
    passwordChange: {
      invalidPassword:
       ` Le mot de passe ci-dessus n'est pas valide`,
    },
  },
  user: {
    errors: {
      userAlreadyExists:
       `L'utilisateur existe déjà.`,
      userNotFound: `Utilisateur introuvable`,
      destroyingHimself: `Vous ne pouvez pas vous éliminer vous-même.`,
      revokingOwnPermission:
        `Vous ne pouvez pas révoquer votre propre autorisation d'administrateur.`,
      revokingPlanUser:
       ` Vous ne pouvez pas révoquer l'autorisation de l'administrateur du plan `,
      destroyingPlanUser:
        `Vous ne pouvez pas supprimer l'administrateur du plan`,
    },
  },
  tenant: {
    exists:
      `Il existe déjà un espace de travail dans cette application`,
    url: {
      exists:
        `L'URL de cet espace de travail est déjà utilisé.`,
    },
    invitation: {
      notSameEmail:
        `Cette invitation a été envoyée à {0} mais vous êtes connecté en tant que {1}.`,
    },
    planActive:
      `Il existe un plan actif pour cet espace de travail. Veuillez d'abord annuler le plan.`,
    stripeNotConfigured: 'Stripe no está configurado.',
  },
  importer: {
    errors: {
      invalidFileEmpty:`Le fichier est vide`,
      invalidFileExcel:
        `Seuls les fichiers Excel (.xlsx) sont autorisés.`,
      invalidFileUpload:
        `Fichier non valide. Assurez-vous que vous utilisez la dernière version du modèle.`,
      importHashRequired: `Hachage d'importation requis`,
      importHashExistent:
        `Les données ont déjà été importées.`,
    },
  },
  errors: {
    notFound: {
      message: `Introuvable`,
    },
    forbidden: {
      message: `Interdit`,
    },
    validation: {
      message: `Une erreur s'est produite`,
    },
  },
  email: {
    error:
      `Le fournisseur de messagerie n'est pas configuré.`,
  },
  preview: {
    error:
      `Désolé, cette opération n'est pas autorisée en mode aperçu.`,
  },

  entities: {
    publication: {
      errors: {
        unique: {

        }
      }
    },
    forum: {
      errors: {
        unique: {

        }
      }
    },
    demandeAppui: {
      errors: {
        unique: {

        }
      }
    },
    evenement: {
      errors: {
        unique: {

        }
      }
    },
    thematique: {
      errors: {
        unique: {

        }
      }
    },
    tags: {
      errors: {
        unique: {

        }
      }
    },
    artiste: {
      errors: {
        unique: {

        }
      }
    },
    espaceArtistique: {
      errors: {
        unique: {

        }
      }
    },
  }
};

export default fr;
