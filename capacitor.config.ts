
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fe42fe4c6e5342d186d04f8dd396a581',
  appName: 'fund-disbursement-tracker',
  webDir: 'dist',
  server: {
    url: 'https://fe42fe4c-6e53-42d1-86d0-4f8dd396a581.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
