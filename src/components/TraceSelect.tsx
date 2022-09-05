import { TraceID } from 'models/fields';
import React, { Dispatch, Fragment, useState } from 'react';
import { Text } from 'react-native';

import { Select } from 'components/ui/Select';
import { GetPlaceSubordinatesMessage } from 'models/api/trace/GetPlaceSubordinatesMessage';
import { send } from 'utils/web';
import type { Trace } from 'models/Trace';
import { useEffect } from 'react';

interface TraceSelectLevel {
  readonly label: string;
  readonly placeholder: string;
}

interface TraceSelectProps {
  readonly trace: TraceID;
  readonly setTrace: Dispatch<TraceID>;
  readonly levels: TraceSelectLevel[];
}

export const StandardPCCLevels: TraceSelectLevel[] = [
  {
    label: '省/直辖市/自治区/特别行政区',
    placeholder: '省/直辖市/自治区/特别行政区',
  },
  {
    label: '市/区/盟/自治州',
    placeholder: '市/区/盟/自治州',
  },
  {
    label: '区/县/街道/旗/自治县',
    placeholder: '区/县/街道/旗/自治县',
  },
];

export const StandardPCCLevelsWithStreet: TraceSelectLevel[] = [
  ...StandardPCCLevels,
  {
    label: '街道',
    placeholder: '街道',
  },
];

async function getSubordinate(value: TraceID): Promise<Trace[]> {
  if (value < 0) return [];
  try {
    return await send(new GetPlaceSubordinatesMessage(value));
  } catch (e) {
    console.error(e);
  }
  return [];
}

export const TraceSelect: React.FC<TraceSelectProps> = (props) => {
  const levels = props.levels.map(({ label, placeholder }, idx) => {
    const [items, setItems] = useState<Trace[]>([]);
    if (idx === props.levels.length - 1) {
      return {
        label,
        placeholder,
        items,
        setItems,
        value: props.trace,
        setValue: props.setTrace,
      };
    }
    const [value, setValue] = useState<TraceID>(-1);
    return { label, placeholder, items, setItems, value, setValue };
  });

  levels.reduce<[TraceID[], TraceID]>(
    ([dependencies, lastValue], { value, setItems }) => {
      useEffect(() => {
        getSubordinate(lastValue).then(setItems);
      }, dependencies);
      return [[value], value];
    },
    [[], 0]
  );

  return (
    <>
      {levels.map(({ label, placeholder, value, setValue, items }) => (
        <Fragment key={label}>
          <Text>{label}</Text>
          <Select
            value={value.toString()}
            setValue={(newValue) => setValue(Number(newValue))}
            placeholder={placeholder}
            items={
              items.map(({ id, name }) => ({
                label: name,
                value: id.toString(),
              }))
              /*
                  [{ label: '请选择', value: '-1' }].concat(
                    items.map(({ id, name }) => ({ label: name, value: id.toString() }))
                  )
                */
            }
          />
        </Fragment>
      ))}
    </>
  );
};
