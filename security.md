---
title: Digital Security Guide
---

## [marxist.space](https://marxist.space)

# Digital Security Guide

Most major tech companies sell your data to advertisers and governments. You
need to stay safe online, so you should be careful about what you use and how
you use it.

You should try to avoid anything hosted in, or owned by, a company in the US.
You should also use end to end encryption wherever possible.

### Table of Contents

* [OS](#os)
* [Browser](#browser)
* [Messaging](#messaging)
* [Misc](#misc)
* [Links](#links)

#### TODO

* email (no google, MS, yahoo)
* crypto (keybase, pgp)
* file sharing (temporary, encrypted)
* text documents (no pdfs, .doc(x), encrypted)
* social (no real names, temporary, no google/fb/twitter)
* mfa
* ??

### OS

Prefer almost any OS over Windows. Windows is buggy, full of telemetry (read:
Microsoft Spyware), and insecure. If you're tech savvy, learning Linux is a good
route. You could try [Xubuntu](https://xubuntu.org/) as a good starter distro.
If you're very tech-minded, you could try [OpenBSD](https://www.openbsd.org/) or
[FreeBSD](https://www.freebsd.org/). Mac OS is also a better choice than
Windows, but comes with some of the same vendor lock in (and a huge price tag).

For extreme needs, you should look into [Tails](https://tails.boum.org/) or
[Qubes](https://www.qubes-os.org/).

Whichever OS you use, you absolutely need to enable Full-Disk Encrpytion:

* [Linux](https://wiki.archlinux.org/index.php/Disk_encryption)
    * Most Linux distributions will offer setting up FDE at install time, which is easier.
* [BSD](https://forums.freebsd.org/threads/howto-quick-geli-encryption-guide.29652/)
* [Mac](https://support.apple.com/en-us/HT204837)
* [Windows](https://support.microsoft.com/en-us/help/4028713/windows-10-turn-on-device-encryption)

For mobile, both iOS and Android are okay options, as long as you keep them up
to date and don't install anything requiring permissions it shouldn't need. In
the Android world, you could also look into Lineage, UBPorts (Ubuntu Phone
fork), and other hobbyist OSs and phones.

### Browser

Avoid Chrome. Google's business model is surveillance, and their browser exists
to collect your data. Also avoid Internet Explorere (it's unmaintained and
insecure), Microsoft Edge (because of the telemetry), and anything
closed-source.

* [Tor Browser](https://www.torproject.org/download/) is likely to be the most secure option, but will be slow for everyday browsing.
* [Firefox](https://www.mozilla.org/en-US/firefox/) is all-around the easiest option, and has tons of addons.
    * See [here](https://github.com/pyllyukko/user.js) for privacy settings tweaks.
    * Recommended addons: [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/), [Privacy Badger](https://addons.mozilla.org/en-US/firefox/addon/privacy-badger17/), [DuckDuckGo](https://addons.mozilla.org/en-US/firefox/addon/duckduckgo-for-firefox/?src=search).
* [Waterfox](https://www.waterfox.net/) is an independent fork of Firefox.
* [Brave](https://brave.com/) is Chrome-based, has built-in ad and tracker blocking, and has a Tor mode. It also includes its own advertisements and a cryptocurrency, though.

### Messaging

Use [Signal](https://signal.org/) for an SMS/KakaoTalk/WhatsApp alternative, and [Riot/Matrix](https://about.riot.im/) for group chat.
Use [Keybase](https://keybase.io/) for both, if you're already using Keybase for other needs (see [Encryption](#encryption)).

### Misc

Use [DuckDuckGo](https://duckduckgo.com/), [Startpage](https://www.startpage.com/), or [Searx](https://searx.me/) for search.

Use [youtube-dl](https://youtube-dl.org/) to watch videos from almost any website offline, and [Invidious](https://www.invidio.us/) to watch YouTube videos.

### Links

* [DNS Leak Test](https://dnsleaktest.com/)
* [PrivacyTools](https://www.privacytools.io/) (List of software recommendations)
* [ThinkPrivacy](https://www.thinkprivacy.io/) (Software recommendations blog)
* [Dessaline's Favorite Apps and Services](https://github.com/dessalines/essays/blob/master/favorite_apps_and_services.md)
