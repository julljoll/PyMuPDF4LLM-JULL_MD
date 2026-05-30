// components/pdf/components/PDFImageBlock.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { theme, ThemeColors } from '../styles/theme';
import { DocumentImage } from '../../../types/document.types';

interface PDFImageBlockProps {
  colors: ThemeColors;
  data: DocumentImage;
}

export const PDFImageBlock: React.FC<PDFImageBlockProps> = ({ colors, data }) => {
  const { src, alt, caption, figureNumber, width = '100%', height } = data;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: theme.spacing.sm,
      width: '100%',
    },
    image: {
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.primaryLight, // #2D6A4F
      width: width,
      height: height ? height : undefined,
    },
    placeholder: {
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.primaryLight,
      backgroundColor: colors.ultraLight, // #EAF4EE
      width: width,
      height: height ? height : 150,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    placeholderText: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes.body,
      color: colors.primaryLight,
      marginBottom: 4,
    },
    placeholderAlt: {
      fontFamily: theme.fonts.primary,
      fontSize: theme.fontSizes.small,
      color: colors.dark,
      textAlign: 'center',
    },
    captionText: {
      fontFamily: theme.fonts.italic,
      fontSize: theme.fontSizes.caption,
      color: colors.mid,
      textAlign: 'center',
      marginTop: 8,
      paddingHorizontal: 16,
    },
    boldFig: {
      fontFamily: theme.fonts.boldItalic,
      fontWeight: 'bold',
    },
  });

  const hasSrc = src && src.length > 0 && !src.startsWith('placeholder:');

  return (
    <View style={styles.container}>
      {hasSrc ? (
        <Image style={styles.image} src={src} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>[ Imagen Pendiente ]</Text>
          <Text style={styles.placeholderAlt}>{alt}</Text>
        </View>
      )}
      {caption && (
        <Text style={styles.captionText}>
          {figureNumber ? (
            <Text style={styles.boldFig}>Fig. {figureNumber} — </Text>
          ) : null}
          {caption}
        </Text>
      )}
    </View>
  );
};
