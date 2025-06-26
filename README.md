# 🏷️ QRIFY.DEV

Free public API for QR code generation on the command line.

## Usage

### Quick

For quick generation of QR codes, you can use `/:text` endpoint like this:

```http
GET https://qrify.dev/Hello,_World!
```

This path is designed to be used either by humans who type it out manually
or with simple alphanumeric codes and alike strings &mdash; it is limited to
100 characters, does not allow slashes and single underscores `_` are
converted to spaces (to insert an actual underscore double it like this
&mdash; `__`)

### Full-path

Instead of 'quick' endpoint mentioned above, scripts can use `/qr/:text`
endpoint:

```http
GET https://qrify.dev/qr/Hello,%20World!
```

Unlike the abovementioned quick endpoint, here _everything_ after `/qr/`
part is encoded as QR code, including slashes etc.

> [!NOTE]
> Don't forget to URL-encode your data before passing it in URL.
