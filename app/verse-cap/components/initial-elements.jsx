export const nodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'Test company',
      siren: '885 732 012',
      address: '0x21728dd7bc8e643667331643dc5f7e300f351e72',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: -200, y: 100 },
    data: {
      label: 'Test company',
      siren: '885 732 012',
      address: '0x21728dd7bc8e643667331643dc5f7e300f351e72',
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 200, y: 150 },
    data: {
      label: 'Test company',
      siren: '885 732 012',
      address: '0x21728dd7bc8e643667331643dc5f7e300f351e72',
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: -200, y: 200 },
    data: {
      label: 'Test company',
      siren: '885 732 012',
      address: '0x21728dd7bc8e643667331643dc5f7e300f351e72',
    },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 200, y: 250 },
    data: {
      label: 'Test company',
      siren: '885 732 012',
      address: '0x21728dd7bc8e643667331643dc5f7e300f351e72',
    },
  },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '2', target: '4' },
  { id: 'e1-5', source: '2', target: '5' },
  { id: 'e1-6', source: '3', target: '6' },
  { id: 'e1-7', source: '3', target: '7' },
];
