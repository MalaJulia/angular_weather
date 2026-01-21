const targetPath = './src/environments/environment.ts';

// Беремо ключ з .env або порожній рядок, якщо не задано
const apiKey = '958662c33e57781e557127dddd1f79e4';

export const environment = {
  production: false,
  weatherApiKey: apiKey,
};