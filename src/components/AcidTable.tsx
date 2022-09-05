import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { UserAcid } from 'models/UserAcid';
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

interface AcidTableProps {
  readonly data: UserAcid[];
}

export const AcidRow: React.FC<ListRenderItemInfo<UserAcid>> = (props) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellTime}>
        {date2datestr(zonedDate(props.item.time)) +
          ' ' +
          date2timestr(zonedDate(props.item.time))}
      </Text>
      <Text style={styles.tableCellOther}>{props.item.testPlace}</Text>
      <Text style={styles.tableCellOther}>
        {props.item.result ? '阳性' : '阴性'}
      </Text>
    </View>
  );
};

export const AcidTable: React.FC<AcidTableProps> = (props) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellTime}>时间</Text>
      <Text style={styles.tableHeadCellOther}>核酸地点</Text>
      <Text style={styles.tableHeadCellOther}>核酸结果</Text>
    </View>
  );

  return (
    <FlatList
      data={props.data}
      renderItem={AcidRow}
      keyExtractor={(trace) => trace.time.getTime().toString()}
      ListHeaderComponent={header}
      style={{ minWidth: 400 }}
    />
  );
};
