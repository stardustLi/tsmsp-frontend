import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { UserTrace } from 'models/UserTrace';
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
  readonly data: UserTrace[];
}

export const TraceRow: React.FC<ListRenderItemInfo<UserTrace>> = (props) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellTime}>{date2str(props.item.time)}</Text>
      <Text style={styles.tableCellTrace}>{props.item.trace.province}</Text>
      <Text style={styles.tableCellTrace}>{props.item.trace.city}</Text>
      <Text style={styles.tableCellTrace}>{props.item.trace.county}</Text>
    </View>
  );
};

export const TraceTable: React.FC<TraceTableProps> = (props) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellTime}>时间</Text>
      <Text style={styles.tableHeadCellTrace}>省/直辖市/自治区/特别行政区</Text>
      <Text style={styles.tableHeadCellTrace}>市/区/盟/自治州</Text>
      <Text style={styles.tableHeadCellTrace}>区/县/街道/旗/自治县</Text>
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
