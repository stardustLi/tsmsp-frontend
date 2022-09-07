import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { UserAppeal } from 'models/UserAppeal';
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

interface AppealTableProps {
  readonly data: UserAppeal[];
}

export const AppealRow: React.FC<ListRenderItemInfo<UserAppeal>> = (props) => {
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

export const AppealTable: React.FC<AppealTableProps> = (props) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellTime}>时间</Text>
      <Text style={styles.tableHeadCellOther}>身份证号</Text>
      <Text style={styles.tableHeadCellOther}>申诉原因</Text>
    </View>
  );

  return (
    <FlatList
      data={props.data}
      renderItem={AppealRow}
      keyExtractor={(trace) => trace.time.getTime().toString()}
      ListHeaderComponent={header}
      style={{ minWidth: 400 }}
    />
  );
};
