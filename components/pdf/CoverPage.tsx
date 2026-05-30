// components/pdf/CoverPage.tsx
import React from 'react';
import { Page, View, Text, StyleSheet, Svg, Path, Circle, Rect, G } from '@react-pdf/renderer';
import { theme, ThemeColors } from './styles/theme';
import { DocumentCover } from '../../types/document.types';

interface CoverPageProps {
  colors: ThemeColors;
  cover: DocumentCover;
}

export const CoverPage: React.FC<CoverPageProps> = ({ colors, cover }) => {
  const { title, subtitle, description, badgeText, author, date = '2026' } = cover;

  const styles = StyleSheet.create({
    page: {
      width: theme.page.width,
      height: theme.page.height,
      backgroundColor: colors.coverBg,
      position: 'relative',
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
      paddingVertical: 48,
    },
    topSection: {
      alignItems: 'center',
      paddingHorizontal: 40,
      marginTop: 20,
    },
    preTitle: {
      fontFamily: theme.fonts.heading,
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
      letterSpacing: 6,
      marginBottom: 8,
    },
    title: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes.coverTitle,
      fontWeight: 'bold',
      color: colors.coverAccent, // Acento (dorado en La Cigarronera, naranja en HIG)
      textAlign: 'center',
      lineHeight: 1.1,
    },
    divider: {
      width: 180,
      height: 2,
      backgroundColor: colors.coverAccent,
      marginVertical: 16,
    },
    subtitle: {
      fontFamily: theme.fonts.primary,
      fontSize: theme.fontSizes.coverSubtitle,
      color: colors.coverSubtext,
      textAlign: 'center',
      letterSpacing: 1.5,
    },
    centerSection: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
    },
    badgeText: {
      fontFamily: theme.fonts.heading,
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.coverAccent,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: theme.borders.radius,
      marginTop: 16,
    },
    description: {
      fontFamily: theme.fonts.primary,
      fontSize: 10,
      color: colors.coverSubtext,
      textAlign: 'center',
      lineHeight: 1.5,
      marginTop: 12,
      maxWidth: 380,
    },
    bottomSection: {
      backgroundColor: colors.coverLowerBg,
      borderTopWidth: 2,
      borderTopColor: colors.coverAccent,
      paddingVertical: 24,
      paddingHorizontal: 40,
      alignItems: 'center',
    },
    authorLabel: {
      fontFamily: theme.fonts.heading,
      fontSize: 9,
      fontWeight: 'bold',
      color: colors.coverAccent,
      letterSpacing: 2,
      marginBottom: 4,
    },
    authorName: {
      fontFamily: theme.fonts.heading,
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 6,
    },
    authorDetails: {
      fontFamily: theme.fonts.primary,
      fontSize: 9,
      color: colors.coverSubtext,
      textAlign: 'center',
      lineHeight: 1.4,
    },
  });

  return (
    <Page size="LEGAL" style={styles.page}>
      {/* Fondo Ilustrado con Svg Vectorial Dinámico que se adapta al esquema de color activo */}
      <Svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} viewBox="0 0 612 1008">
        {/* Cielo Estrellado */}
        <Circle cx="120" cy="150" r="1.5" fill="#FFFFFF" opacity="0.6" />
        <Circle cx="480" cy="180" r="2" fill="#FFFFFF" opacity="0.8" />
        <Circle cx="280" cy="220" r="1" fill="#FFFFFF" opacity="0.5" />
        <Circle cx="80" cy="350" r="1.5" fill="#FFFFFF" opacity="0.4" />
        <Circle cx="520" cy="380" r="1.5" fill="#FFFFFF" opacity="0.6" />
        <Circle cx="350" cy="100" r="2.5" fill="#FFFFFF" opacity="0.7" />

        {/* Línea decorativa superior */}
        <Rect x="0" y="80" width="612" height="1.5" fill={colors.coverAccent} opacity="0.35" />

        {/* Línea decorativa inferior (antes del footer) */}
        <Rect x="0" y="840" width="612" height="1.5" fill={colors.coverAccent} opacity="0.35" />

        {/* Montañas traseras (Basadas en coverLowerBg) */}
        <Path 
          d="M-40,840 L60,720 L180,780 L310,670 L480,790 L580,740 L660,840 Z" 
          fill={colors.coverLowerBg} 
          opacity="0.85"
        />

        {/* Montañas medias (Basadas en primaryLight) */}
        <Path 
          d="M-50,840 L100,750 L240,795 L390,720 L520,780 L670,710 L670,840 Z" 
          fill={colors.primaryLight} 
          opacity="0.9"
        />

        {/* Primer plano colinas (Basado en primary / accent) */}
        <Path 
          d="M-20,840 Q150,790 320,810 T640,800 L640,840 Z" 
          fill={colors.accent} 
          opacity="0.95"
        />

        {/* Cactus decorativos en primer plano (Tono accent) */}
        <G opacity="0.2" fill={colors.white}>
          <Rect x="40" y="750" width="10" height="60" rx="5" />
          <Path d="M30,770 Q30,780 40,780 L40,775 Q35,775 35,770 Z" />
          <Rect x="26" y="760" width="10" height="15" rx="5" />
          <Path d="M50,780 Q60,780 60,790 L50,790 Z" />
          <Rect x="54" y="775" width="10" height="18" rx="5" />
        </G>
        <G opacity="0.2" fill={colors.white}>
          <Rect x="530" y="740" width="12" height="70" rx="6" />
          <Path d="M515,765 Q515,775 530,775 L530,770 Q522,770 522,765 Z" />
          <Rect x="510" y="752" width="12" height="18" rx="6" />
        </G>
      </Svg>

      {/* Contenido en capa flotante */}
      <View style={styles.overlayContainer}>
        {/* Título y Subtítulo */}
        <View style={styles.topSection}>
          <Text style={styles.preTitle}>PREDIO</Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.divider} />
          {subtitle && <Text style={styles.subtitle}>{subtitle.toUpperCase()}</Text>}
        </View>

        {/* Ícono de Pitahaya e Info Central */}
        <View style={styles.centerSection}>
          {/* Svg del ícono circular de la Pitahaya */}
          <Svg width="80" height="80" viewBox="0 0 80 80">
            {/* Cáscara roja */}
            <Circle cx="40" cy="40" r="38" fill="#E63946" />
            
            {/* Escamas verdes de la fruta */}
            <Path d="M35,5 L40,15 L45,5 Z" fill="#34C759" />
            <Path d="M12,20 L22,25 L16,12 Z" fill="#34C759" />
            <Path d="M68,20 L58,25 L64,12 Z" fill="#34C759" />
            <Path d="M5,42 L15,40 L8,32 Z" fill="#34C759" />
            <Path d="M75,42 L65,40 L72,32 Z" fill="#34C759" />
            <Path d="M15,62 L24,55 L20,68 Z" fill="#34C759" />
            <Path d="M65,62 L56,55 L60,68 Z" fill="#34C759" />
            <Path d="M35,75 L40,65 L45,75 Z" fill="#34C759" />
            
            {/* Pulpa Blanca */}
            <Circle cx="40" cy="40" r="28" fill="#FFFFFF" />
            
            {/* Semillas Negras */}
            <Circle cx="35" cy="30" r="1.2" fill="#333333" />
            <Circle cx="45" cy="28" r="1.2" fill="#333333" />
            <Circle cx="30" cy="42" r="1.2" fill="#333333" />
            <Circle cx="50" cy="38" r="1.2" fill="#333333" />
            <Circle cx="40" cy="48" r="1.2" fill="#333333" />
            <Circle cx="34" cy="52" r="1.2" fill="#333333" />
            <Circle cx="46" cy="50" r="1.2" fill="#333333" />
            <Circle cx="28" cy="32" r="1.2" fill="#333333" />
            <Circle cx="52" cy="30" r="1.2" fill="#333333" />
            <Circle cx="40" cy="34" r="1.2" fill="#333333" />
          </Svg>

          {badgeText && <Text style={styles.badgeText}>{badgeText}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>

        {/* Datos de Autor y Footer */}
        <View style={styles.bottomSection}>
          <Text style={styles.authorLabel}>UNIDAD PRODUCTIVA</Text>
          <Text style={styles.authorName}>{author.name.toUpperCase()}</Text>
          
          <View style={{ width: 120, height: 1, backgroundColor: colors.accent, marginVertical: 8, opacity: 0.5 }} />

          {author.role && author.organization ? (
            <Text style={styles.authorDetails}>
              {author.role}  ·  {author.organization}
            </Text>
          ) : null}
          <Text style={styles.authorDetails}>
            Elaborado: {date}
          </Text>
        </View>
      </View>
    </Page>
  );
};
export default CoverPage;
