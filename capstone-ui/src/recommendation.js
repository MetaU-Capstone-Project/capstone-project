// var dataset = {
//   "Lisa Rose": {
//     "Lady in the Water": 2.5,
//     "Snakes on a Plane": 3.5,
//     "Just My Luck": 3.0,
//     "Superman Returns": 3.5,
//     "You, Me and Dupree": 2.5,
//     "The Night Listener": 3.0,
//   },
//   "Gene Seymour": {
//     "Lady in the Water": 3.0,
//     "Snakes on a Plane": 3.5,
//     "Just My Luck": 1.5,
//     "Superman Returns": 5.0,
//     "The Night Listener": 3.0,
//     "You, Me and Dupree": 3.5,
//   },

//   "Michael Phillips": {
//     "Lady in the Water": 2.5,
//     "Snakes on a Plane": 3.0,
//     "Superman Returns": 3.5,
//     "The Night Listener": 4.0,
//   },
//   "Claudia Puig": {
//     "Snakes on a Plane": 3.5,
//     "Just My Luck": 3.0,
//     "The Night Listener": 4.5,
//     "Superman Returns": 4.0,
//     "You, Me and Dupree": 2.5,
//   },

//   "Mick LaSalle": {
//     "Lady in the Water": 3.0,
//     "Snakes on a Plane": 4.0,
//     "Just My Luck": 2.0,
//     "Superman Returns": 3.0,
//     "The Night Listener": 3.0,
//     "You, Me and Dupree": 2.0,
//   },

//   "Jack Matthews": {
//     "Lady in the Water": 3.0,
//     "Snakes on a Plane": 4.0,
//     "The Night Listener": 3.0,
//     "Superman Returns": 5.0,
//     "You, Me and Dupree": 3.5,
//   },

//   Toby: {
//     "Snakes on a Plane": 4.5,
//     "You, Me and Dupree": 1.0,
//     "Superman Returns": 4.0,
//   },
// };

// var len = function (obj) {
//   var len = 0;
//   for (var i in obj) {
//     len++;
//   }
//   return len;
// };

// //calculate the euclidean distance btw two item
// var euclidean_score = function (dataset, p1, p2) {
//   var existp1p2 = {}; //store item existing in both item
//   //if dataset is in p1 and p2
//   //store it in as one
//   for (var key in dataset[p1]) {
//     console.log('key: ' + key);
//     // if (key in dataset[p2]) {
//     //   existp1p2[key] = 1;
//     // }
//     if (dataset[p2].hasOwnProperty(key)) {
//       existp1p2[key] = 1;
//     }
//     if (len(existp1p2) == 0) return 0; //check if it has a data
//     var sum_of_euclidean_dist = []; //store the  euclidean distance

//     //calculate the euclidean distance
//     for (item in dataset[p1]) {
//       if (item in dataset[p2]) {
//         sum_of_euclidean_dist.push(
//           Math.pow(dataset[p1][item] - dataset[p2][item], 2)
//         );
//       }
//     }
//     var sum = 0;
//     for (var i = 0; i < sum_of_euclidean_dist.length; i++) {
//       sum += sum_of_euclidean_dist[i]; //calculate the sum of the euclidean
//     }
//     //since the sum will be small for familiar user
//     // and larger for non-familiar user
//     //we make it exist btwn 0 and 1
//     var sum_sqrt = 1 / (1 + Math.sqrt(sum));
//     return sum_sqrt;
//   }
// };

// euclidean_score(dataset, "Lisa Rose", "Jack Mathews");

// console.log(euclidean_score);
