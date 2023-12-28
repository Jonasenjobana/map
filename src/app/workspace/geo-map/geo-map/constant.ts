export const Point1: [number, number][] = [
  [39.977772, 121.058762],
  [40.031115, 121.054698],
  [40.084892, 121.047164],
  [40.138662, 121.039603],
  [40.192398, 121.03214],
  [40.242717, 121.024608],
];
export const Point2: [number, number][] = [
  [40.143114, 121.835892],
  [40.114228, 121.732944],
  [40.111303, 121.616234],
  [40.1092, 121.534178],
  [40.106687, 121.440333],
  [40.115642, 121.324178],
];
export type Track = {
  date
  geohash
  mmsi
  code
  turn
  speed
  accuracy
  lat
  lng
  heading
  nextDistance
  sumPreDistance
  message
  course
}
export const Track1 = [
  {
      "date": "2023-12-14 18:00:55",
      "geohash": "w7w6220",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.9,
      "accuracy": 1,
      "lat": 20.083982,
      "lng": 110.05135,
      "course": 1,
      "heading": 14,
      "message": "",
      "nextDistance": 0.3,
      "sumPreDistance": 0
  },
  {
      "date": "2023-12-14 18:02:55",
      "geohash": "w7w6230",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.8,
      "accuracy": 1,
      "lat": 20.088984,
      "lng": 110.051285,
      "course": 358,
      "heading": 17,
      "message": "",
      "nextDistance": 0.09,
      "sumPreDistance": 0.3
  },
  {
      "date": "2023-12-14 18:03:35",
      "geohash": "w7w6232",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.6,
      "accuracy": 1,
      "lat": 20.090534,
      "lng": 110.051315,
      "course": 1,
      "heading": 17,
      "message": "",
      "nextDistance": 0.05,
      "sumPreDistance": 0.39
  },
  {
      "date": "2023-12-14 18:03:55",
      "geohash": "w7w6238",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.5,
      "accuracy": 1,
      "lat": 20.091333,
      "lng": 110.05133,
      "course": 2,
      "heading": 17,
      "message": "",
      "nextDistance": 0.09,
      "sumPreDistance": 0.44
  },
  {
      "date": "2023-12-14 18:04:35",
      "geohash": "w7w623b",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.3,
      "accuracy": 1,
      "lat": 20.092884,
      "lng": 110.051414,
      "course": 2,
      "heading": 17,
      "message": "",
      "nextDistance": 0.23,
      "sumPreDistance": 0.53
  },
  {
      "date": "2023-12-14 18:06:15",
      "geohash": "w7w6263",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.3,
      "accuracy": 1,
      "lat": 20.096733,
      "lng": 110.051636,
      "course": 3,
      "heading": 17,
      "message": "",
      "nextDistance": 0.05,
      "sumPreDistance": 0.76
  },
  {
      "date": "2023-12-14 18:06:35",
      "geohash": "w7w6269",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.3,
      "accuracy": 1,
      "lat": 20.097567,
      "lng": 110.0517,
      "course": 3,
      "heading": 17,
      "message": "",
      "nextDistance": 0.09,
      "sumPreDistance": 0.81
  },
  {
      "date": "2023-12-14 18:07:15",
      "geohash": "w7w626c",
      "mmsi": "566926000",
      "code": "0",
      "turn": 0,
      "speed": 8.2,
      "accuracy": 1,
      "lat": 20.099117,
      "lng": 110.051765,
      "course": 3,
      "heading": 20,
      "message": "",
      "nextDistance": 0,
      "sumPreDistance": 0.9
  }
]
export const Track2 = [
  {
      "date": "2023-12-08 18:32:05",
      "geohash": "w7w6224",
      "mmsi": "413231030",
      "code": "0",
      "turn": 0,
      "speed": 11.6,
      "accuracy": 1,
      "lat": 20.083855,
      "lng": 110.05386,
      "course": 6.6,
      "heading": 8,
      "message": "",
      "nextDistance": 0.59,
      "sumPreDistance": 0
  },
  {
      "date": "2023-12-10 16:38:55",
      "geohash": "w7w623b",
      "mmsi": "413231030",
      "code": "0",
      "turn": -127,
      "speed": 12.2,
      "accuracy": 0,
      "lat": 20.09324,
      "lng": 110.05065,
      "course": 190.6,
      "heading": 187,
      "message": "",
      "nextDistance": 0.24,
      "sumPreDistance": 0.59
  },
  {
      "date": "2023-12-11 16:27:11",
      "geohash": "w7w6230",
      "mmsi": "413231030",
      "code": "0",
      "turn": 0,
      "speed": 11.9,
      "accuracy": 0,
      "lat": 20.08928,
      "lng": 110.05071,
      "course": 177.6,
      "heading": 170,
      "message": "",
      "nextDistance": 0.07,
      "sumPreDistance": 0.83
  },
  {
      "date": "2023-12-14 16:33:01",
      "geohash": "w7w622b",
      "mmsi": "413231030",
      "code": "0",
      "turn": 127,
      "speed": 11.6,
      "accuracy": 1,
      "lat": 20.088118,
      "lng": 110.05069,
      "course": 179.4,
      "heading": 166,
      "message": "",
      "nextDistance": 0.65,
      "sumPreDistance": 0.9
  },
  {
      "date": "2023-12-14 18:47:07",
      "geohash": "w7w626g",
      "mmsi": "413231030",
      "code": "0",
      "turn": 0,
      "speed": 10.1,
      "accuracy": 0,
      "lat": 20.098238,
      "lng": 110.05462,
      "course": 34.7,
      "heading": 47,
      "message": "",
      "nextDistance": 0.1,
      "sumPreDistance": 1.55
  },
  {
      "date": "2023-12-15 13:21:23",
      "geohash": "w7w626f",
      "mmsi": "413231030",
      "code": "0",
      "turn": -127,
      "speed": 11.9,
      "accuracy": 1,
      "lat": 20.099018,
      "lng": 110.05308,
      "course": 9,
      "heading": 6,
      "message": "",
      "nextDistance": 0,
      "sumPreDistance": 1.65
  }
]