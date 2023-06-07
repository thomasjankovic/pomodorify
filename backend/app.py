from flask import Flask, jsonify
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
from Track import Track

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Set up the Spotipy OAuth credentials
SPOTIPY_CLIENT_ID = os.environ.get('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.environ.get('SPOTIPY_CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = os.environ.get('SPOTIPY_REDIRECT_URI')
SCOPE = "user-library-read"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID,
                                               client_secret=SPOTIPY_CLIENT_SECRET,
                                               redirect_uri=SPOTIPY_REDIRECT_URI,
                                               scope=SCOPE))

def get_songs(limit=50, offset=0):
    results = sp.current_user_saved_tracks(limit=limit, offset=offset)
    tracks = results['items']
    list_of_Tracks = []
    # Build list of Tracks.
    for track in tracks:
        track_name = track['track']['name']
        artist_name = track['track']['artists'][0]['name']
        duration_ms = track['track']['duration_ms']
        album = track['track']['album']['name']
        album_art_url = track['track']['album']['images'][0]['url']
        total_seconds, remaining_ms = divmod(duration_ms, 1000)
        # minutes, remaining_s = divmod(total_seconds, 60)
        track = Track()
        track.set_title(track_name)
        track.set_artist(artist_name)
        track.set_duration_s(total_seconds)
        track.set_album(album)
        track.set_album_art_url(album_art_url)
        list_of_Tracks.append(track)
    return list_of_Tracks

def find_combination(list_of_Tracks, minutes=25):
    '''Modified knapsack problem algorithm'''
    seconds = minutes * 60
    dp = [None] * (seconds + 1)
    dp[0] = []

    for track in list_of_Tracks:
        d = Track.get_duration_s(track)
        for i in range(seconds, d - 1, -1):
            if dp[i - d] is not None:
                # new_combination = dp[i - d] + [d]
                new_combination = dp[i - d] + [track]
                if dp[i] is None or len(new_combination) < len(dp[i]):
                    dp[i] = new_combination
    return dp[seconds]

def form_playlist(minutes):
    list_of_Tracks = get_songs()
    playlist = find_combination(list_of_Tracks, minutes)
    while not playlist:
        list_of_Tracks + get_songs()
        playlist = find_combination(list_of_Tracks, minutes)
    return playlist

@app.route('/playlist')
def display_playlist():
    work_playlist = form_playlist(25)
    print(f'25 minute playlist: {[Track.get_title(track) for track in work_playlist]}')
    formatted_work_playlist = []
    for track in work_playlist:
        minutes, remaining_s = divmod(Track.get_duration_s(track), 60)
        formatted_work_playlist.append({'title':Track.get_title(track), 'artist':Track.get_artist(track), 'duration':f'{minutes}:{str(remaining_s).zfill(2)}', 'album':Track.get_album(track), 'album_art_url':Track.get_album_art_url(track)})
    # rest_playlist = form_playlist(5)
    # print(f'5 minute playlist: {[Track.get_title(track) for track in rest_playlist]}')
    return jsonify(formatted_work_playlist)

if __name__ == '__main__':
    app.run(debug=True)