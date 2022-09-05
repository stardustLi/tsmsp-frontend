import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NucleicAcidPoint } from 'models/NucleicAcidPoint';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  tableRow: baseStyle.tableRow,
  tableCellOther: baseStyle.tableCellOther,
  tableHeadRow: baseStyle.tableHeadRow,
  tableHeadCellOther: baseStyle.tableHeadCellOther,
});

interface NucleicAcidPointTableProps {
  readonly data: NucleicAcidPoint[];
}

export const NucleicAcidPointRow: React.FC<
  ListRenderItemInfo<NucleicAcidPoint>
> = (props) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellOther}>{props.item.testPlace}</Text>
      <Text style={styles.tableCellOther}></Text>
    </View>
  );
};

export const NucleicAcidPointTable: React.FC<NucleicAcidPointTableProps> = (
  props
) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellOther}>检测点名称</Text>
    </View>
  );

  return (
    <FlatList
      data={props.data}
      renderItem={NucleicAcidPointRow}
      keyExtractor={(trace) => trace.testPlace}
      ListHeaderComponent={header}
      style={{ minWidth: 400 }}
    />
  );
};
