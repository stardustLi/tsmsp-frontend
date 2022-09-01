import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { UserVaccine } from 'models/UserVaccine';
import { date2datestr } from 'utils/date';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  tableRow: baseStyle.tableRow,
  tableCellTime: baseStyle.tableCellTime,
  tableCellOther: baseStyle.tableCellOther,
  tableHeadRow: baseStyle.tableHeadRow,
  tableHeadCellTime: baseStyle.tableHeadCellTime,
  tableHeadCellOther: baseStyle.tableHeadCellOther,
});

interface VaccineTableProps {
  readonly data: UserVaccine[];
}

export const VaccineRow: React.FC<ListRenderItemInfo<UserVaccine>> = (
  props
) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellTime}>{date2datestr(props.item.time)}</Text>
      <Text style={styles.tableCellOther}>{props.item.manufacture}</Text>
      <Text style={styles.tableCellOther}>{props.item.vaccineType}</Text>
    </View>
  );
};

export const VaccineTable: React.FC<VaccineTableProps> = (props) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellTime}>时间</Text>
      <Text style={styles.tableHeadCellOther}>疫苗生产机构</Text>
      <Text style={styles.tableHeadCellOther}>接种针次</Text>
    </View>
  );

  return (
    <FlatList
      data={props.data}
      renderItem={VaccineRow}
      keyExtractor={(trace) => trace.time.getTime().toString()}
      ListHeaderComponent={header}
      style={{ minWidth: 400 }}
    />
  );
};
