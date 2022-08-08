/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @bypassWritingPermissions - Does not validate if the user has permission to write
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */
export default class Storage {
  static get values() {
    return {
      userAvatarsProfiles: {
        id: 'userAvatarsProfiles',
        folder: 'user/avatars/profile/:userId',
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },
      settingsLogos: {
        id: 'settingsLogos',
        folder: 'tenant/:tenantId/settings/logos',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      settingsBackgroundImages: {
        id: 'settingsBackgroundImages',
        folder:
          'tenant/:tenantId/settings/backgroundImages',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      publicationSupports: {
        id: 'publicationSupports',
        folder: 'tenant/:tenantId/publication/supports',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      demandeAppuiSupports: {
        id: 'demandeAppuiSupports',
        folder: 'tenant/:tenantId/demandeAppui/supports',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      evenementSupports: {
        id: 'evenementSupports',
        folder: 'tenant/:tenantId/evenement/supports',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      espaceArtistiqueSupports: {
        id: 'espaceArtistiqueSupports',
        folder:
          'tenant/:tenantId/espaceArtistique/supports',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      mediatiquePhotos: {
        id: 'mediatiquePhotos',
        folder: 'tenant/:tenantId/mediatique/photos',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      mediatiqueVideos: {
        id: 'mediatiqueVideos',
        folder: 'tenant/:tenantId/mediatique/videos',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      mediatiqueAttachements: {
        id: 'mediatiqueAttachements',
        folder: 'tenant/:tenantId/mediatique/attachements',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
    };
  }
}
