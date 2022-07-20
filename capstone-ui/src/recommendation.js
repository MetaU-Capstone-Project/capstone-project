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

    friends = friends.data;
    let nonFriendUsers = allUsers.data.map(user => user.username).filter(currentUsername => currentUsername != username && !friends.includes(currentUsername));
    let result = [];

    for (let i = 0; i < nonFriendUsers.length; i++) {
        let score = 0;
        let friendUsername = nonFriendUsers[i];
        let friendArtists = await axios.get(`http://localhost:3001/user/topartists/${friendUsername}`);
        let friendGenres = await axios.get(`http://localhost:3001/user/topgenres/${friendUsername}`);

        // weight shared artist preferences more heavily than genres since more rare to like a specific artist
        for (let j = 0; j < friendArtists.data.length; j++) {
            let currArtist = friendArtists.data[j];
            let hasSameArtist = topArtists.some(e => e.value === currArtist.value); 
            if (hasSameArtist) {
                score += 5;
            }
        }

        // weight shared genres preferences less than artists since there are fewer genres than artists and so more likely to share genre preferences
        for (let j = 0; j < friendGenres.data.length; j++) {
            let currGenre = friendGenres.data[j];
            let hasSameGenre = topGenres.some(e => e.value === currGenre.value); 
            if (hasSameGenre) {
                score++;
            }
        }

        result.push({username: friendUsername, score: score});
    }

    rank(result);
    return result;
};
