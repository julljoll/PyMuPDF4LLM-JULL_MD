// components/pdf/components/PDFTwoColumn.tsx
import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

interface PDFTwoColumnProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: number; // porcentaje (ej. 55 para 55%)
  gap?: number;       // en puntos PDF
  verticalAlign?: 'top' | 'center' | 'bottom';
}

export const PDFTwoColumn: React.FC<PDFTwoColumnProps> = ({
  leftContent,
  rightContent,
  leftWidth = 55,
  gap = 24,
  verticalAlign = 'top',
}) => {
  const rightWidth = 100 - leftWidth;

  const getAlignItems = () => {
    switch (verticalAlign) {
      case 'center':
        return 'center';
      case 'bottom':
        return 'flex-end';
      case 'top':
      default:
        return 'flex-start';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      alignItems: getAlignItems(),
    },
    leftCol: {
      width: `${leftWidth}%`,
      paddingRight: gap / 2,
    },
    rightCol: {
      width: `${rightWidth}%`,
      paddingLeft: gap / 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>{leftContent}</View>
      <View style={styles.rightCol}>{rightContent}</View>
    </View>
  );
};
