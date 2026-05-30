// components/pdf/PDFDocument.tsx
import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme, getThemeColors } from './styles/theme';
import { DocumentConfig, ContentBlock, DocumentSection } from '../../types/document.types';
import { CoverPage } from './CoverPage';
import { PDFHeader } from './components/PDFHeader';
import { PDFFooter } from './components/PDFFooter';
import { PDFSection, PDFSubSection } from './components/PDFSection';
import { PDFTable } from './components/PDFTable';
import { PDFCallout } from './components/PDFCallout';
import { PDFImageBlock } from './components/PDFImageBlock';
import { PDFMetricBanner } from './components/PDFKeyMetric';
import { PDFTwoColumn } from './components/PDFTwoColumn';
import { registerPDFFonts } from '../../lib/font-loader';

// Registramos fuentes una sola vez
registerPDFFonts();

interface PDFDocumentProps {
  config: DocumentConfig;
}

export const PDFDocument: React.FC<PDFDocumentProps> = ({ config }) => {
  const colors = getThemeColors(config.colorScheme, config.customColors);

  const styles = StyleSheet.create({
    page: {
      width: theme.page.width,
      height: theme.page.height,
      backgroundColor: colors.cream,
      paddingTop: theme.page.margins.top + theme.page.headerHeight,
      paddingBottom: theme.page.margins.bottom + theme.page.footerHeight,
      paddingLeft: theme.page.margins.left,
      paddingRight: theme.page.margins.right,
      fontFamily: theme.fonts.primary,
      position: 'relative',
    },
    sectionWrapper: {
      marginBottom: theme.spacing.lg,
    },
    // Block Styles
    paragraph: {
      fontSize: theme.fontSizes.body,
      color: colors.black,
      fontFamily: theme.fonts.primary,
      lineHeight: 1.5,
      textAlign: 'justify',
      marginBottom: 8,
    },
    bulletList: {
      marginLeft: 16,
      marginBottom: 8,
    },
    bulletItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    bulletPoint: {
      width: 10,
      fontSize: theme.fontSizes.body,
      color: colors.primary,
      fontFamily: theme.fonts.heading,
    },
    bulletText: {
      flex: 1,
      fontSize: theme.fontSizes.body,
      color: colors.black,
      lineHeight: 1.4,
    },
    numberedList: {
      marginLeft: 16,
      marginBottom: 8,
    },
    numberText: {
      width: 15,
      fontSize: theme.fontSizes.body,
      color: colors.primary,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
    },
    divider: {
      height: 1,
      backgroundColor: colors.light,
      marginVertical: theme.spacing.md,
      opacity: 0.5,
    },
  });

  // Renderizador de Bloques de Contenido Individuales
  const renderBlock = (block: ContentBlock, blockIndex: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <Text key={`p-${blockIndex}`} style={styles.paragraph}>
            {block.text}
          </Text>
        );
      case 'heading2':
        return (
          <PDFSubSection 
            key={`h2-${blockIndex}`} 
            level={2} 
            title={block.text} 
            colors={colors} 
          />
        );
      case 'heading3':
        return (
          <PDFSubSection 
            key={`h3-${blockIndex}`} 
            level={3} 
            title={block.text} 
            colors={colors} 
          />
        );
      case 'bullet_list':
        return (
          <View key={`bl-${blockIndex}`} style={styles.bulletList}>
            {block.items.map((item, idx) => (
              <View key={`bli-${idx}`} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      case 'numbered_list':
        return (
          <View key={`nl-${blockIndex}`} style={styles.numberedList}>
            {block.items.map((item, idx) => (
              <View key={`nli-${idx}`} style={styles.bulletItem}>
                <Text style={styles.numberText}>{idx + 1}.</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      case 'table':
        return <PDFTable key={`tbl-${blockIndex}`} data={block.data} colors={colors} />;
      case 'image':
        return <PDFImageBlock key={`img-${blockIndex}`} data={block.data} colors={colors} />;
      case 'callout':
        return <PDFCallout key={`cal-${blockIndex}`} data={block.data} colors={colors} />;
      case 'metrics':
        return <PDFMetricBanner key={`met-${blockIndex}`} metrics={block.items} colors={colors} />;
      case 'divider':
        return <View key={`div-${blockIndex}`} style={styles.divider} />;
      case 'spacer':
        const spaceHeight = block.size === 'lg' ? 24 : block.size === 'sm' ? 8 : 16;
        return <View key={`sp-${blockIndex}`} style={{ height: spaceHeight }} />;
      default:
        return null;
    }
  };

  // Renderizador de Layouts de Sección Completa
  const renderSectionLayout = (section: DocumentSection) => {
    const leftContent = section.mainContent.map((block, i) => renderBlock(block, i));

    switch (section.layout) {
      case 'TEXT_IMAGE_RIGHT':
        return (
          <PDFTwoColumn
            leftContent={<View>{leftContent}</View>}
            rightContent={
              section.sideImage ? (
                <PDFImageBlock data={section.sideImage} colors={colors} />
              ) : (
                <View />
              )
            }
            leftWidth={60}
            verticalAlign="top"
          />
        );
      case 'IMAGE_TEXT_LEFT':
        return (
          <PDFTwoColumn
            leftContent={
              section.sideImage ? (
                <PDFImageBlock data={section.sideImage} colors={colors} />
              ) : (
                <View />
              )
            }
            rightContent={<View>{leftContent}</View>}
            leftWidth={40}
            verticalAlign="top"
          />
        );
      case 'TWO_COLUMN_EQUAL':
        const rightContent = section.sideContent
          ? section.sideContent.map((block, i) => renderBlock(block, i))
          : [];
        return (
          <PDFTwoColumn
            leftContent={<View>{leftContent}</View>}
            rightContent={<View>{rightContent}</View>}
            leftWidth={50}
            verticalAlign="top"
          />
        );
      case 'IMAGE_FULL_WIDTH':
        return (
          <View>
            <View>{leftContent}</View>
            {section.sideImage && (
              <PDFImageBlock data={{ ...section.sideImage, width: '100%' }} colors={colors} />
            )}
          </View>
        );
      case 'METRIC_BANNER':
      case 'CALLOUT_BLOCK':
      case 'TEXT_FULL':
      default:
        return (
          <View>
            <View>{leftContent}</View>
          </View>
        );
    }
  };

  return (
    <Document title={config.title} author={config.cover.author.name}>
      {/* 1. Portada del Documento */}
      <CoverPage colors={colors} cover={config.cover} />

      {/* 2. Páginas de Contenido */}
      <Page size="LEGAL" style={styles.page}>
        {/* Header y Footer globales que se repiten en cada página */}
        <PDFHeader 
          colors={colors} 
          leftText={config.headerText?.left} 
          rightText={config.headerText?.right} 
        />
        <PDFFooter 
          colors={colors} 
          leftText={config.footerText?.left} 
          rightText={config.footerText?.right} 
        />

        {/* Mapeamos y renderizamos las secciones */}
        <View style={{ flex: 1 }}>
          {config.sections.map((section, idx) => {
            const isFirstSection = idx === 0;
            const needsPageBreak = section.pageBreakBefore ?? !isFirstSection;

            return (
              <View 
                key={section.id} 
                style={styles.sectionWrapper} 
                break={needsPageBreak}
              >
                {/* Título de la Sección */}
                <PDFSection 
                  colors={colors} 
                  title={section.title} 
                  sectionNumber={section.sectionNumber} 
                />
                
                {/* Renderizar según el Layout de la sección */}
                {renderSectionLayout(section)}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};
