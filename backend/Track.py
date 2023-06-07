class Track:
    def __init__(self, track_id='', title='', artist='', duration_s=0, album='', album_art_url=''):
        self._track_id = track_id
        self._title = title
        self._artist = artist
        self._duration_s = duration_s
        self._album = album
        self._album_art_url = album_art_url

    # Getters.
    def get_track_id(self):
        return self._track_id

    def get_title(self):
        return self._title
    
    def get_artist(self):
        return self._artist

    def get_duration_s(self):
        return self._duration_s
    
    def get_album(self):
        return self._album
    
    def get_album_art_url(self):
        return self._album_art_url
      
    # Setters.
    def set_track_id(self, track_id):
        self._track_id = track_id

    def set_title(self, title):
        self._title = title

    def set_artist(self, artist):
        self._artist = artist

    def set_duration_s(self, duration):
        self._duration_s = duration

    def set_album(self, album):
        self._album = album

    def set_album_art_url(self, album_art_url):
        self._album_art_url = album_art_url