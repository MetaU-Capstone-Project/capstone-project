import axios from 'axios';

function rank(recommendedUsers) {
    recommendedUsers.sort(function(a, b){
        return b.score - a.score;
    });    
}

export const getRecommendedUsers = async (username, topGenres, topArtists, postedSongs) => {
    let allUsers = await axios.get(
        `http://localhost:3001/user/users`
    );

    let friends = await axios.get(
        `http://localhost:3001/user/followers/${username}`
    );

    allUsers = allUsers.data.map(element => element.username);
    allUsers = allUsers.filter(element => element != username);
    friends = friends.data;
    // skip people who are already friends - can't recommend them
    allUsers = allUsers.filter(x => !friends.includes(x));
    let result = [];

    console.log('getting recommended users');
    console.log(allUsers);
    for (let i = 0; i < allUsers.length; i++) {
        let score = 0;
        let friendUsername = allUsers[i];
        let friendArtists = await axios.get(`http://localhost:3001/user/topartists/${friendUsername}`);
        let friendGenres = await axios.get(`http://localhost:3001/user/topgenres/${friendUsername}`);

        console.log('mine');
        console.log(topArtists);
        console.log('friend' + friendUsername);
        console.log(friendArtists.data);

        // weight shared artist preferences more heavily than genres since more rare to like a specific artist
        for (let j = 0; j < friendArtists.data.length; j++) {
            let currArtist = friendArtists.data[j];
            let isInArray = topArtists.some(e => e.value === currArtist.value); 
            if (isInArray) {
                score += 5;
            }
        }

        for (let j = 0; j < friendGenres.data.length; j++) {
            let currGenre = friendGenres.data[j];
            let isInArray = topGenres.some(e => e.value === currGenre.value); 
            if (isInArray) {
                score++;
            }
        }

        result.push({username: friendUsername, score: score});
    }

    rank(result);
    console.log(result);
    return result;
};
