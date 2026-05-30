// components/pdf/components/PDFTable.tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme, ThemeColors } from '../styles/theme';
import { TableData, ColumnAlignment } from '../../../types/document.types';

interface PDFTableProps {
  colors: ThemeColors;
  data: TableData;
}

export const PDFTable: React.FC<PDFTableProps> = ({ colors, data }) => {
  const { headers, rows, columnWidths, columnAlignments, highlightLastRow } = data;

  const styles = StyleSheet.create({
    tableContainer: {
      width: '100%',
      marginVertical: theme.spacing.sm,
      borderWidth: 0.5,
      borderColor: colors.light,
    },
    headerRow: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      borderBottomWidth: 2,
      borderBottomColor: colors.accentBright,
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: colors.light,
      alignItems: 'center',
    },
    lastRowHighlighted: {
      flexDirection: 'row',
      backgroundColor: colors.success, // Verde Agronómico / success #2D6A4F
      borderBottomWidth: 0,
      alignItems: 'center',
    },
    cell: {
      paddingVertical: 6,
      paddingHorizontal: 8,
    },
    headerText: {
      color: colors.white,
      fontSize: theme.fontSizes.tableHeader,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
    },
    bodyText: {
      color: colors.black,
      fontSize: theme.fontSizes.tableBody,
      fontFamily: theme.fonts.primary,
    },
    highlightedText: {
      color: colors.white,
      fontSize: theme.fontSizes.tableBody,
      fontWeight: 'bold',
      fontFamily: theme.fonts.heading,
    },
  });

  const getAlignment = (index: number): ColumnAlignment => {
    if (columnAlignments && columnAlignments[index]) {
      return columnAlignments[index];
    }
    return 'left';
  };

  return (
    <View style={styles.tableContainer}>
      {/* Cabecera de la Tabla */}
      <View style={styles.headerRow} fixed>
        {headers.map((header, i) => (
          <View 
            key={`h-${i}`} 
            style={[
              styles.cell, 
              { 
                width: `${columnWidths[i]}%`, 
                textAlign: getAlignment(i) 
              }
            ]}
          >
            <Text style={styles.headerText}>{header}</Text>
          </View>
        ))}
      </View>

      {/* Filas de la Tabla */}
      {rows.map((row, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;
        const useHighlight = isLastRow && highlightLastRow;
        
        // Zebra striping para filas normales (pares blanco, impares verde tenue)
        const rowBg = useHighlight 
          ? colors.success 
          : (rowIndex % 2 === 0 ? colors.white : colors.ultraLight);

        return (
          <View 
            key={`r-${rowIndex}`} 
            style={[
              useHighlight ? styles.lastRowHighlighted : styles.row,
              { backgroundColor: rowBg }
            ]}
          >
            {row.map((cellValue, cellIndex) => (
              <View 
                key={`c-${rowIndex}-${cellIndex}`} 
                style={[
                  styles.cell, 
                  { 
                    width: `${columnWidths[cellIndex]}%`, 
                    textAlign: getAlignment(cellIndex) 
                  }
                ]}
              >
                <Text style={useHighlight ? styles.highlightedText : styles.bodyText}>
                  {cellValue}
                </Text>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
};
