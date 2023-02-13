import RNFS from 'react-native-fs';

export const AppConstants = {
  // TILES_FOLDER_LOCAL: `.${RNFS.DocumentDirectoryPath}/maptiles`,
  TILES_FOLDER_LOCAL: `.${RNFS.DownloadDirectoryPath}/maptiles`,
  TILES_FOLDER_SDCARD: `.${RNFS.ExternalStorageDirectoryPath}/Download/maptiles`,
  LIVE_MAP_URL: 'https://c.tile.openstreetmap.org',
};
