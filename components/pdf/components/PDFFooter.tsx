// components/pdf/components/PDFFooter.tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme, ThemeColors } from '../styles/theme';

interface PDFFooterProps {
  colors: ThemeColors;
  leftText?: string;
  rightText?: string;
}

export const PDFFooter: React.FC<PDFFooterProps> = ({
  colors,
  leftText = 'Informe Técnico Integral de Producción Agrícola  ·  2026',
  rightText = '9°53\'20.0"N  /  69°35\'35.0"W',
}) => {
  const styles = StyleSheet.create({
    footerContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: theme.page.footerHeight,
      backgroundColor: colors.primary,
      borderTopWidth: 1.5,
      borderTopColor: colors.accentBright,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    textLeft: {
      color: colors.coverSubtext,
      fontSize: 7.5,
      fontFamily: theme.fonts.primary,
      width: '40%',
    },
    textCenter: {
      color: colors.accentBright,
      fontSize: 8,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
      textAlign: 'center',
      width: '20%',
    },
    textRight: {
      color: colors.coverSubtext,
      fontSize: 7.5,
      fontFamily: theme.fonts.primary,
      textAlign: 'right',
      width: '40%',
    },
  });

  return (
    <View style={styles.footerContainer} fixed>
      <Text style={styles.textLeft}>{leftText}</Text>
      <Text 
        style={styles.textCenter} 
        render={({ pageNumber, totalPages }) => `Página  ${pageNumber}  /  ${totalPages || pageNumber}`} 
      />
      <Text style={styles.textRight}>{rightText}</Text>
    </View>
  );
};
