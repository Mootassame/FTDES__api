/**
 * I18n dictionary for the en.
 */

const ar = {
  app: {
    title: `المنتدى التونسي للحقوق الاقتصادية والاجتماعية`,
  },

  auth: {
    userNotFound: `عذرًا ، لم نتعرف على بيانات الاعتماد الخاصة بك`,
    wrongPassword: `عذرًا ، لم نتعرف على بيانات الاعتماد الخاصة بك`,
    weakPassword: `كلمة المرور هذه ضعيفة للغاية`,
    emailAlreadyInUse: `البريد الإلكتروني مستخدم بالفعل`,
    invalidEmail: `يرجى تقديم بريد إلكتروني صالح`,
    passwordReset: {
      invalidToken:
        `رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية`,
      error: `البريد الإلكتروني غير موجود`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
       `رابط التحقق من البريد الإلكتروني غير صالح أو منتهي الصلاحية`,
      error: `البريد الإلكتروني غير موجود.`,
      signedInAsWrongUser: `تم إرسال هذا التأكيد عبر البريد الإلكتروني إلى {0} ولكنك تقوم بتسجيل الدخول باسم {1}.`,
    },
    passwordChange: {
      invalidPassword: `كلمة المرور القديمة غير صالحة`,
    },
  },

  user: {
    errors: {
      userAlreadyExists:`البريد الإلكتروني مستخدم بالفعل`,
      userNotFound: `المستخدم ليس موجود`,
      destroyingHimself: `لا يمكنك حذف نفسك`,
      revokingOwnPermission: `لا يمكنك إلغاء إذن المالك الخاص بك`,
      revokingPlanUser: `لا يمكنك إلغاء الإذن من مالك الخطة النشطة`,
      destroyingPlanUser: `لا يمكنك حذف مالك الخطة النشطة`,
    },
  },

  tenant: {
    exists: `المستأجر موجود بالفعل لهذا التطبيق`,
    url: {
      exists:
        `هذا عنوان URL الخاص بسطح المكتب قيد الاستخدام بالفعل`,
    },
    invitation: {
      notSameEmail: `تم إرسال هذه الدعوة إلى {0} ولكنك تقوم بتسجيل الدخول باسم {1}`,
    },
    planActive: `توجد خطة نشطة لمساحة العمل هذه. الرجاء إلغاء الخطة أولا`,
  },

  importer: {
    errors: {
      invalidFileEmpty: `الملف فارغ`,
      invalidFileExcel:
        `يُسمح فقط بملفات Excel (.xlsx)`,
      invalidFileUpload:
        `ملف غير صالح. تأكد من أنك تستخدم أحدث إصدار من الطراز`,
      importHashRequired: `مطلوب تحميل تجزئة`,
      importHashExistent:`تم بالفعل تحميل البيانات`,
    },
  },

  errors: {
    notFound: {
      message:`غير موجود`,
    },
    forbidden: {
      message: `غير مسموح`,
    },
    validation: {
      message: `حدث خطأ`,
    },
  },

  email: {
    error: `لم يتم تكوين البريد الإلكتروني`,
  },

  preview: {
    error:
      `عذرًا ، هذه العملية غير مسموح بها في الوضع التجريبي`,
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

export default ar;
