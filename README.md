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

Download `jobscout_<version>_windows_amd64_setup.exe` and run it.

The build is not code-signed, so SmartScreen shows **"Windows protected your
PC"** on first run. Click **More info**, then **Run anyway**.

Windows 10 and 11 already include the WebView2 runtime jobscout renders with.
On anything older, install it first from
[Microsoft](https://developer.microsoft.com/microsoft-edge/webview2/).

### Linux

Download `jobscout_<version>_linux_x86_64.AppImage`, make it executable, and
run it:

```sh
chmod +x jobscout_<version>_linux_x86_64.AppImage
./jobscout_<version>_linux_x86_64.AppImage
```

There is nothing to install and no packages to add first — the AppImage carries
its own GTK and WebKitGTK, so the same file works on Debian, Ubuntu, Fedora,
Arch and anything else with a desktop. x86_64 only.

To get it into your application menu, use a tool like
[Gear Lever](https://github.com/mijorus/gearlever) or
[AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher), which will
also keep it updated.

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
