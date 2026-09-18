# jobscout

A desktop job search. Sign in with GitHub, search across roles pulled from
Greenhouse and Wellfound, filter by remote, seniority and employment type, and
work through the results without a browser tab in sight.

**[Download the latest release →](https://github.com/Souvikns/findmejob/releases/latest)**

Built with Wails, Go and React. The source is kept in a private repository;
this one carries the releases and the issue tracker.

---

## Install

### macOS

Intel and Apple Silicon share one universal build.

1. Download `jobscout_<version>_macos_universal.dmg`.
2. Open it and drag **jobscout** into Applications.
3. Run this once in Terminal:

   ```sh
   xattr -dr com.apple.quarantine /Applications/jobscout.app
   ```

4. Launch jobscout from Applications.

Step 3 is not optional. jobscout is not signed with an Apple Developer
certificate, so macOS marks anything downloaded from the internet as
quarantined and reports it as **"jobscout is damaged and can't be opened"**.
That message does not mean the download failed — it is what macOS says about
every unsigned app. Clearing the quarantine flag is a one-time thing per
install.

### Windows

Download `jobscout_<version>_windows_amd64_setup.exe` — or the `arm64` build on
a Snapdragon / Surface Pro X style device — and run it. The `.zip` next to it
contains the same `jobscout.exe` with no installer, if you would rather not
install anything.

The build is not code-signed, so SmartScreen shows **"Windows protected your
PC"** on first run. Click **More info**, then **Run anyway**.

Windows 10 and 11 already include the WebView2 runtime jobscout renders with.
On anything older, install it first from
[Microsoft](https://developer.microsoft.com/microsoft-edge/webview2/).

### Linux

Pick the package for your distribution. All of them install jobscout to
`/usr/bin`, add it to the application menu, and pull in the GTK and WebKitGTK
libraries it needs.

```sh
# Debian, Ubuntu, Pop!_OS, Mint
sudo apt install ./jobscout_<version>_amd64.deb

# Fedora, RHEL, openSUSE
sudo dnf install ./jobscout-<version>-1.x86_64.rpm

# Arch, Manjaro, EndeavourOS — from the AUR
yay -S jobscout-bin
# ...or from the release file directly
sudo pacman -U ./jobscout-<version>-1-x86_64.pkg.tar.zst
```

No package for your distro? Use the `.AppImage` — `chmod +x` it and run it — or
the `.tar.gz`, which holds the binary, an icon and a note listing the runtime
libraries to install.

#### Which Linux file do I want?

Downloads marked **`_legacy`** link against **WebKitGTK 4.0**; everything else
links against **4.1**. The two are incompatible and distributions are split
between them:

| Your system | Use |
| --- | --- |
| Ubuntu 24.04+, Fedora 40+, Arch, Debian 13+ | the unsuffixed files (4.1) |
| Debian 12, Ubuntu 22.04, and other older releases | the **`_legacy`** files (4.0) |

If you are unsure, try the unsuffixed one first. When the wrong one is
installed, jobscout fails to start with an error about a missing
`libwebkit2gtk` library — install the other build and it will work.

`arm64` builds (Raspberry Pi, Asahi, Arm servers with a desktop) are published
for WebKitGTK 4.1 only.

### Verifying a download

Every release ships `SHA256SUMS.txt`:

```sh
sha256sum -c SHA256SUMS.txt --ignore-missing
```

---

## First run

jobscout signs in with GitHub. The session is stored in your user application
data directory and restored the next time you open the app, so signing in is a
one-time step.

## Reporting a problem

Open an [issue](https://github.com/Souvikns/findmejob/issues). Please include
your operating system and version, the jobscout version from the release you
downloaded, and what you expected to happen.
