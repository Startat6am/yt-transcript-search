# YouTube Transcript Search

A small Python tool to build a searchable catalogue of a YouTube channel and search imported subtitle files by exact words, phrases, and hashtags. Results include a direct YouTube link to the matching timestamp and can be exported to CSV for Google Sheets or Excel.

## Current scope

- Collect public video metadata from a channel using the official YouTube Data API v3.
- Import subtitle files you are authorized to use (WebVTT `.vtt` files).
- Preserve start/end timestamps and generate timestamp links.
- Search exact words, phrases, and hashtags.
- Export results to CSV, which can be opened in Google Sheets or Excel.

**Important:** public videos do not automatically grant API permission to download their caption tracks. This project does not bypass access controls or download third-party captions without authorization. For a channel you do not own, use subtitle files provided by the owner or another authorized transcription workflow. Videos without imported text remain in the catalogue with no transcript.

## Requirements

- Python 3.10+
- A YouTube Data API v3 key for collecting public video metadata
- Authorized subtitle files in WebVTT (`.vtt`) format for transcript search

## Setup

```bash
python -m venv .venv
# macOS/Linux:
source .venv/bin/activate
# Windows PowerShell:
# .\.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

Copy `.env.example` to `.env` and set `YOUTUBE_API_KEY`. Never commit your real `.env` file or credentials.

## 1. Collect the channel's video catalogue

```bash
python -m src.main catalog --channel-id UCl0p-aoACzTOgnCctzIQWPQ
```

This writes `data/videos.csv`. The script uses the channel's uploads playlist and paginates through it.

## 2. Import authorized subtitle files

Put `.vtt` files in `data/transcripts/`. Name each file with the corresponding YouTube video ID, for example `VIDEO_ID.vtt`.

```bash
python -m src.main import-transcripts
```

This writes `data/segments.csv` with text, start/end seconds, hashtags, and timestamp URLs.

## 3. Search

```bash
python -m src.main search "neural network"
python -m src.main search "#AI"
python -m src.main search '"exact phrase"'
```

Search results are printed and written to `data/search_results.csv`. Open the CSV in Google Sheets or Excel.

## CSV outputs

- `data/videos.csv`: video metadata
- `data/segments.csv`: transcript segments and timestamps
- `data/search_results.csv`: latest search results

## Notes and limitations

- The first version searches imported VTT files; it does not automatically acquire captions from a third-party channel.
- API quota and availability can affect catalogue collection.
- Auto-generated captions may contain transcription errors.
- Keep copyrighted transcript data private unless you have permission to redistribute it.
