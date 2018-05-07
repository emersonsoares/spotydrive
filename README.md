# :loud_sound: spotydrive

[![Build Status](https://travis-ci.org/emersonsoares/spotydrive.svg?branch=master)](https://travis-ci.org/emersonsoares/spotydrive)
[![Maintainability](https://api.codeclimate.com/v1/badges/9787c59674c2d58cbebe/maintainability)](https://codeclimate.com/github/emersonsoares/spotydrive/maintainability)
[![npm version](https://badge.fury.io/js/spotydrive.svg)](https://badge.fury.io/js/spotydrive)

### Synchronize your Spotify playlists offline as mp3 files.

spotydrive is a command line tool(cli-tool) that can keep your Spotify playlists synced offline as mp3 files.

## Installation

#### Prerequisites

To run this project, you need to have a local installation of FFmpeg present on your system. You can download it from https://www.ffmpeg.org/download.html

#### Installation via NPM

```console
npm i -g spotydrive
```

## Usage

Connect spotydrive to your Spotify account

```console
spotydrive connect --provider spotify
```

Connect spotydrive to your YouTube account

```console
spotydrive connect --provider youtube
```

Tell spotydrive to sync using your playlist uri

```console
spotydrive sync-playlist spotify:user:spotify:playlist:37i9dQZF1DWXfi2vTRVTna
```

spotydrive will download each playlist track, on a folder with the name of the playlist.
