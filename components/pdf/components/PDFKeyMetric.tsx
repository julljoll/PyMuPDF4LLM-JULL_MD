// components/pdf/components/PDFKeyMetric.tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme, ThemeColors } from '../styles/theme';
import { KeyMetric } from '../../../types/document.types';

interface PDFKeyMetricProps {
  colors: ThemeColors;
  metric: KeyMetric;
  showLeftBorder?: boolean;
}

export const PDFKeyMetric: React.FC<PDFKeyMetricProps> = ({
  colors,
  metric,
  showLeftBorder = false,
}) => {
  const { value, unit, label, color = 'primary' } = metric;

  const getValueColor = () => {
    switch (color) {
      case 'accent':
        return colors.accent;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'danger':
        return colors.danger;
      case 'primary':
      default:
        return colors.primary;
    }
  };

  const styles = StyleSheet.create({
    metricCard: {
      flex: 1,
      backgroundColor: colors.white,
      borderWidth: 0.5,
      borderColor: colors.light,
      borderLeftWidth: showLeftBorder ? 0.5 : 0.5, // Se puede cambiar si queremos que actúe de divisor
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    valueText: {
      fontSize: theme.fontSizes.metric,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
      color: getValueColor(),
    },
    unitText: {
      fontSize: 12,
      fontFamily: theme.fonts.primary,
      color: colors.mid,
      marginLeft: 2,
    },
    labelText: {
      fontSize: theme.fontSizes.metricLabel,
      fontFamily: theme.fonts.heading,
      color: colors.dark,
      textTransform: 'uppercase',
      marginTop: 4,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.metricCard}>
      <View style={styles.valueRow}>
        <Text style={styles.valueText}>{value}</Text>
        {unit && <Text style={styles.unitText}>{unit}</Text>}
      </View>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

interface PDFMetricBannerProps {
  colors: ThemeColors;
  metrics: KeyMetric[];
}

export const PDFMetricBanner: React.FC<PDFMetricBannerProps> = ({
  colors,
  metrics,
}) => {
  const styles = StyleSheet.create({
    bannerContainer: {
      flexDirection: 'row',
      width: '100%',
      marginVertical: theme.spacing.sm,
      gap: 8,
    },
  });

  return (
    <View style={styles.bannerContainer}>
      {metrics.map((m, index) => (
        <PDFKeyMetric 
          key={`metric-${index}`} 
          colors={colors} 
          metric={m} 
          showLeftBorder={index > 0} 
        />
      ))}
    </View>
  );
};
