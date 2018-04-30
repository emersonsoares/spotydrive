# :loud_sound: Spotydrive

### Synchronize your Spotify playlists offline as mp3 files.

Spotydrive is a command line tool(cli-tool) that can keep your Spotify playlists synced offline as mp3 files.

## Installation

```console
npm i -g spotydrive
```

## Usage

Connect Spotydrive to your Spotify account

```console
spotydrive connect --provider spotify
```

Connect Spotydrive to your YouTube account

```console
spotydrive connect --provider youtube
```

Tell Spotydrive to sync using your playlist uri

```console
spotydrive sync-playlist spotify:user:spotify:playlist:37i9dQZF1DWXfi2vTRVTna
```

Spotydrive will download each playlist track, on a folder with the name of the playlist.