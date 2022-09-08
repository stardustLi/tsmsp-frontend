import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, Text, View,} from 'react-native';

import type {UserAppeal} from 'models/UserAppeal';
import {date2datestr, date2timestr, zonedDate} from 'utils/date';
import * as baseStyle from 'utils/styles';
import {UserStore} from 'libs/UserStore';
import {Button} from 'components/ui/Button';
import {send} from 'utils/web';
import {ResolveAppealMessage} from 'models/api/code/appeal/ResolveAppealMessage';
import {AdminSetColorMessage} from 'models/api/code/AdminSetColorMessage';
import {CodeColor} from 'models/enums/CodeColor';

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
      <Button text={'接受申诉并将其转为绿码'} onPress={ () => AcceptAppeal(props.item.idCard) } style={baseStyle.button}/>
      <Button text={'拒绝申诉'}  onPress={ () => RefuseAppeal(props.item.idCard) } style={baseStyle.button} />
    </View>
  );//按钮的大小和位置需要调整，且按钮所调用的函数目前无法正常发出message请求
};

export const AppealTable: React.FC<AppealTableProps> = (props) => {
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellTime}>时间</Text>
      <Text style={styles.tableHeadCellOther}>身份证号</Text>
      <Text style={styles.tableHeadCellOther}>申诉原因</Text>
      <Text style={styles.tableHeadCellOther}>接受申诉</Text>
      <Text style={styles.tableHeadCellOther}>拒绝申诉</Text>
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

async function AcceptAppeal(idCard: string) {
    const { token } = UserStore();
    try{
      await send (new ResolveAppealMessage(token, idCard));
      await send (new AdminSetColorMessage(token, idCard, CodeColor.GREEN));
    } catch (e) {
        console.error(e);
    }
}

async function RefuseAppeal(idCard: string) {
    const { token } = UserStore();
    try {
      await send (new ResolveAppealMessage(token, idCard));
    } catch (e) {
        console.error(e);
    }
}