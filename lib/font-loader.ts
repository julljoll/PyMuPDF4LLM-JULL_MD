// lib/font-loader.ts
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;

export const registerPDFFonts = () => {
  if (fontsRegistered) return;

  try {
    // Registramos la fuente Inter desde Google Fonts CDN
    Font.register({
      family: 'Inter',
      fonts: [
        {
          src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_y1A.woff',
          fontWeight: 400,
        },
        {
          src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_y1A.woff',
          fontWeight: 500,
        },
        {
          src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_y1A.woff',
          fontWeight: 700,
        },
      ],
    });
    fontsRegistered = true;
  } catch (error) {
    console.error('Error al registrar fuentes en @react-pdf/renderer:', error);
  }
};
