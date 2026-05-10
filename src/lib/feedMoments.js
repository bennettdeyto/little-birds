/** Curated small moments — shuffled in the feed for variety */
export const FEED_MOMENTS = [
  'the first warm light on the kitchen counter',
  'someone held the door without making it a thing',
  'coffee tasted exactly right',
  'a dog stopped to say hello',
  'the bus came the moment you stopped checking',
  'a text from someone who was thinking of you',
  'rain sounded better than the playlist',
  'you laughed before you meant to',
  'the house was quiet in a kind way',
  'bread from the oven, imperfect and perfect',
  'a stranger’s playlist matched your mood',
  'you took the long way on purpose',
  'the pen glided — small mercy',
  'a hawk sat still long enough to be noticed',
  'someone said your name like it mattered',
  'the chair fit when you sat down',
  'steam rose from the tea in one clean line',
  'you remembered to water the plant',
  'a song you forgot came back halfway through',
  'the room smelled like something good was coming',
]

export function shuffleFeedMoments(arr = FEED_MOMENTS) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
