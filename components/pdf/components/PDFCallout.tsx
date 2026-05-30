// components/pdf/components/PDFCallout.tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme, ThemeColors } from '../styles/theme';
import { CalloutData, CalloutVariant } from '../../../types/document.types';

interface PDFCalloutProps {
  colors: ThemeColors;
  data: CalloutData;
}

export const PDFCallout: React.FC<PDFCalloutProps> = ({ colors, data }) => {
  const { variant, icon, title, content } = data;

  const getVariantStyles = (v: CalloutVariant) => {
    switch (v) {
      case 'warning':
        return {
          borderLeftColor: colors.warning,
          backgroundColor: 'rgba(255, 149, 0, 0.08)',
          textColor: '#8F5B00',
        };
      case 'success':
        return {
          borderLeftColor: colors.success,
          backgroundColor: 'rgba(52, 199, 89, 0.08)',
          textColor: '#1E6F33',
        };
      case 'danger':
        return {
          borderLeftColor: colors.danger,
          backgroundColor: 'rgba(255, 59, 48, 0.08)',
          textColor: '#9C0006',
        };
      case 'dark':
        return {
          borderLeftColor: colors.accentBright,
          backgroundColor: colors.primary,
          textColor: colors.white,
        };
      case 'info':
      default:
        return {
          borderLeftColor: colors.info,
          backgroundColor: 'rgba(0, 122, 255, 0.08)',
          textColor: '#0054B0',
        };
    }
  };

  const vStyle = getVariantStyles(variant);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: vStyle.backgroundColor,
      borderLeftWidth: 4,
      borderLeftColor: vStyle.borderLeftColor,
      borderRadius: theme.borders.radius,
      padding: 12,
      marginVertical: theme.spacing.sm,
    },
    iconContainer: {
      marginRight: 8,
      alignSelf: 'flex-start',
    },
    iconText: {
      fontSize: 12,
    },
    contentContainer: {
      flex: 1,
    },
    titleText: {
      fontSize: theme.fontSizes.body,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
      color: vStyle.textColor,
      marginBottom: 3,
    },
    contentText: {
      fontSize: 9,
      fontFamily: variant === 'warning' ? theme.fonts.italic : theme.fonts.primary,
      color: vStyle.textColor,
      lineHeight: 1.5,
    },
  });

  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
      )}
      <View style={styles.contentContainer}>
        {title && <Text style={styles.titleText}>{title}</Text>}
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </View>
  );
};
