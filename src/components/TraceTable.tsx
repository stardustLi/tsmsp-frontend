import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { Trace } from 'models/trace';
import { date2str } from 'utils/dateFormat';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  tableRow: baseStyle.tableRow,
  tableCellTime: baseStyle.tableCellTime,
  tableCellTrace: baseStyle.tableCellTrace,
  tableHeadRow: baseStyle.tableHeadRow,
  tableHeadCellTime: baseStyle.tableHeadCellTime,
  tableHeadCellTrace: baseStyle.tableHeadCellTrace,
});

interface TraceTableProps {
  readonly data: Trace[];
}

export const TraceRow: React.FC<ListRenderItemInfo<Trace>> = (props) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellTime}>{date2str(props.item.time)}</Text>
      <Text style={styles.tableCellTrace}>{props.item.trace}</Text>
    </View>
  );
};

export const TraceTable: React.FC<TraceTableProps> = (props) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellTime}>时间</Text>
      <Text style={styles.tableHeadCellTrace}>地点</Text>
    </View>
  );

  return (
    <FlatList
      data={props.data}
      renderItem={TraceRow}
      keyExtractor={(trace) => trace.time.getTime().toString()}
      ListHeaderComponent={header}
      style={{ minWidth: 400 }}
    />
  );
};
