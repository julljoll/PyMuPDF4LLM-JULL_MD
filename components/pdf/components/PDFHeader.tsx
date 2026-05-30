// components/pdf/components/PDFHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme, ThemeColors } from '../styles/theme';

interface PDFHeaderProps {
  colors: ThemeColors;
  leftText?: string;
  rightText?: string;
}

export const PDFHeader: React.FC<PDFHeaderProps> = ({
  colors,
  leftText = 'PREDIO LA CIGARRONERA  ·  UNIDAD PRODUCTIVA JULL ORTIZ',
  rightText = 'Parroquia Cuara, Municipio Jiménez, Estado Lara',
}) => {
  const styles = StyleSheet.create({
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: theme.page.headerHeight,
      backgroundColor: colors.primary,
      borderBottomWidth: 3,
      borderBottomColor: colors.accentBright,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    textLeft: {
      color: colors.white,
      fontSize: 7.8,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
    },
    textRight: {
      color: colors.coverSubtext,
      fontSize: 7.5,
      fontFamily: theme.fonts.primary,
    },
  });

  return (
    <View style={styles.headerContainer} fixed>
      <Text style={styles.textLeft}>{leftText.toUpperCase()}</Text>
      <Text style={styles.textRight}>{rightText}</Text>
    </View>
  );
};
