export const nodes = [
  {
    id: '1',
    data: {
      label: 'BOSS',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'LEFT',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'RIGHT',
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: {
      label: 'AA 20%',
    },
    position: { x: -25, y: 200 },
  },
  {
    id: '5',
    data: {
      label: 'BB 20%',
    },
    position: { x: 225, y: 300 },
  },
  {
    id: '6',
    data: {
      label: 'CC 20%',
    },
    position: { x: 275, y: 200 },
  },
  {
    id: '7',
    data: {
      label: 'CC 20%',
    },
    position: { x: 525, y: 200 },
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
