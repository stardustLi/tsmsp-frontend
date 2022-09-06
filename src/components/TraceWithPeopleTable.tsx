import React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { UserTraceWithPeople } from 'models/UserTraceWithPeople';
import { date2datestr, zonedDate } from 'utils/date';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
    tableRow: baseStyle.tableRow,
    tableCellTime: baseStyle.tableCellTime,
    tableCellOther: baseStyle.tableCellOther,
    tableHeadRow: baseStyle.tableHeadRow,
    tableHeadCellTime: baseStyle.tableHeadCellTime,
    tableHeadCellOther: baseStyle.tableHeadCellOther,
});

interface TraceWithPeopleTableProps {
    readonly data: UserTraceWithPeople[];
}

export const TraceWithPeopleRow: React.FC<ListRenderItemInfo<UserTraceWithPeople>> = (
    props
) => {
    return (
        <View style={styles.tableRow}>
            <Text style={styles.tableCellTime}>
                {date2datestr(zonedDate(props.item.time))}
            </Text>
            <Text style={styles.tableCellOther}>{props.item.CCUserName}</Text>
        </View>
    );
};

export const TraceWithPeopleTable: React.FC<TraceWithPeopleTableProps> = (props) => {
    const header = (
        <View style={styles.tableHeadRow}>
            <Text style={styles.tableHeadCellTime}>时间</Text>
            <Text style={styles.tableHeadCellOther}>贴贴过的人的用户名</Text>
        </View>
    );

    return (
        <FlatList
            data={props.data}
            renderItem={TraceWithPeopleRow}
            keyExtractor={(trace) => trace.time.getTime().toString()}
            ListHeaderComponent={header}
            style={{ minWidth: 400 }}
        />
    );
};
