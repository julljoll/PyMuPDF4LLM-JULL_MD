// components/pdf/components/PDFSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme, ThemeColors } from '../styles/theme';

interface PDFSectionProps {
  colors: ThemeColors;
  title: string;
  sectionNumber?: string;
}

export const PDFSection: React.FC<PDFSectionProps> = ({
  colors,
  title,
  sectionNumber,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.primary,
      paddingVertical: 7,
      paddingHorizontal: 11,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      color: colors.white,
      fontSize: theme.fontSizes.h1,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
      textTransform: 'uppercase',
    },
  });

  const displayTitle = sectionNumber ? `${sectionNumber}. ${title}` : title;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{displayTitle}</Text>
    </View>
  );
};

interface PDFSubSectionProps {
  colors: ThemeColors;
  title: string;
  level: 2 | 3;
}

export const PDFSubSection: React.FC<PDFSubSectionProps> = ({
  colors,
  title,
  level,
}) => {
  const isLevel2 = level === 2;
  const styles = StyleSheet.create({
    text: {
      fontSize: isLevel2 ? theme.fontSizes.h2 : theme.fontSizes.h3,
      color: isLevel2 ? colors.primary : colors.danger, // colors.danger is tierra_ocre #8B5E3C
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
      marginTop: isLevel2 ? 12 : 8,
      marginBottom: isLevel2 ? 4 : 3,
    },
  });

  return <Text style={styles.text}>{title}</Text>;
};
