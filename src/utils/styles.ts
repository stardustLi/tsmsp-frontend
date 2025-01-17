export const baseBorder = <const>{
    borderColor: 'rgba(34, 36, 38, .15)',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  baseButton = <const>{
    borderRadius: 4,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: 200,
  },
  button = ({ pressed }: { pressed: boolean }) =>
    <const>{
      ...baseButton,
      backgroundColor: '#0ea5e9',
      opacity: pressed ? 0.5 : 1,
    },
  yellowButton = ({ pressed }: { pressed: boolean }) =>
    <const>{
      ...baseButton,
      backgroundColor: '#fde047',
      opacity: pressed ? 0.5 : 1,
    },
  alignCenter = <const>{
    alignItems: 'center',
  },
  container = <const>{
    alignItems: 'center',
    ...baseBorder,
    borderTopStyle: 'none',
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 1,
    justifyContent: 'center',
  },
  timeText = (color: string) =>
    <const>{
      alignItems: 'center',
      color,
      fontSize: 40,
    },
  press = <const>{
    cursor: 'pointer',
  },
  header = <const>{
    backgroundColor: '#eee',
    ...baseBorder,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 50,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerText = <const>{
    fontSize: 36,
    fontWeight: 'bold',
  },
  input = <const>{
    ...baseBorder,
    marginVertical: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: 200,
  },
  label = <const>{
    marginTop: 7,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 200,
  },
  labelWhite = <const>{
    marginTop: 0,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    width: 200,
    color: '#fff',
  },
  tableRow = <const>{
    flexDirection: 'row',
  },
  tableHeadRow = <const>{
    ...tableRow,
    marginTop: 20,
  },
  tableCell = <const>{
    borderTopColor: 'rgba(34, 36, 38, .15)',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  tableCellTime = <const>{
    ...tableCell,
    flex: 5,
  },
  tableCellOther = <const>{
    ...tableCell,
    flex: 5,
    borderLeftColor: 'rgba(34, 36, 38, .15)',
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
  },
  tableHeadCell = <const>{
    backgroundColor: '#eee',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableHeadCellTime = <const>{
    ...tableHeadCell,
    flex: 5,
  },
  tableHeadCellOther = <const>{
    ...tableHeadCell,
    flex: 5,
    borderLeftColor: 'rgba(34, 36, 38, .15)',
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
  };
