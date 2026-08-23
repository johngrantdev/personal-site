import * as migration_20260821_124135_initial from './20260821_124135_initial';

export const migrations = [
  {
    up: migration_20260821_124135_initial.up,
    down: migration_20260821_124135_initial.down,
    name: '20260821_124135_initial'
  },
];
