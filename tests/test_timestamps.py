from pathlib import Path

from src.main import fmt_time, parse_vtt, parse_vtt_timestamp


def test_parse_vtt_timestamp_with_hours():
    assert parse_vtt_timestamp("01:05:20.500") == 3920.5


def test_parse_vtt_timestamp_without_hours():
    assert parse_vtt_timestamp("12:34.250") == 754.25


def test_fmt_time():
    assert fmt_time(754) == "12:34"
    assert fmt_time(3920) == "01:05:20"


def test_parse_vtt_preserves_timestamp_link_and_hashtag(tmp_path: Path):
    vtt = tmp_path / "video123.vtt"
    vtt.write_text(
        "WEBVTT\n\n00:12:34.000 --> 00:12:38.000\nDiscussing #AI today.\n",
        encoding="utf-8",
    )
    rows = parse_vtt(vtt, {"video123": "Test video"})
    assert len(rows) == 1
    assert rows[0]["start_time"] == "12:34"
    assert rows[0]["hashtags"] == "#ai"
    assert rows[0]["timestamp_url"].endswith("&t=754s")
