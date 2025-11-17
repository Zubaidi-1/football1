// ! idk i wanna sort by goals , assists maybe cards later.

export const sortGoals = (players) =>
  [...players].sort(
    (a, b) =>
      (b.statistics?.[0]?.goals?.total ?? 0) -
      (a.statistics?.[0]?.goals?.total ?? 0)
  );

export const sortAssists = (players) =>
  [...players].sort(
    (a, b) =>
      (b.statistics?.[0]?.goals?.assists ?? 0) -
      (a.statistics?.[0]?.goals?.assists ?? 0)
  );
