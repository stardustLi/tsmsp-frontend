import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { UserJingReport } from 'models/UserJingReport';
import { date2datestr, date2timestr, zonedDate } from 'utils/date';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  tableRow: baseStyle.tableRow,
  tableCellTime: baseStyle.tableCellTime,
  tableCellOther: baseStyle.tableCellOther,
  tableHeadRow: baseStyle.tableHeadRow,
  tableHeadCellTime: baseStyle.tableHeadCellTime,
  tableHeadCellOther: baseStyle.tableHeadCellOther,
});

interface JingReportTableProps {
  readonly data: UserJingReport[];
}

export const JingReportRow: React.FC<ListRenderItemInfo<UserJingReport>> = (
  props
) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellTime}>
        {date2datestr(zonedDate(props.item.time)) +
          ' ' +
          date2timestr(zonedDate(props.item.time))}
      </Text>
      <Text style={styles.tableCellOther}>{props.item.idCard}</Text>
      <Text style={styles.tableCellOther}>{props.item.reason}</Text>
    </View>
  );
};

export const JingReportTable: React.FC<JingReportTableProps> = (props) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellTime}>时间</Text>
      <Text style={styles.tableHeadCellOther}>身份证号</Text>
      <Text style={styles.tableHeadCellOther}>报备内容</Text>
    </View>
  );

  return (
    <FlatList
      data={props.data}
      renderItem={JingReportRow}
      keyExtractor={(trace) => trace.time.getTime().toString()}
      ListHeaderComponent={header}
      style={{ minWidth: 400 }}
    />
  );
};
