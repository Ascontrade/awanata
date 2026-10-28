# Awanata — aplikasi HP

Cangkang aplikasi (PWA) untuk Awanata, sistem keuangan keluarga. Pola sama dengan aplikasi ASCON:
GitHub Pages menyajikan cangkang yang bisa dipasang di layar utama HP, dan isi aplikasinya dibuka dari
web app Google Apps Script milik awnandreas@gmail.com.

Repo ini hanya berisi tampilan pembuka dan ikon. **Tidak ada data keuangan, kata sandi, atau kunci di sini**,
sehingga repo boleh publik. Semua data tetap di Google Drive pemilik dan hanya bisa dibuka setelah login.

## Berkas

| Berkas | Isi |
|---|---|
| `index.html` | Layar pembuka + bingkai yang memuat web app (`APP_URL`) |
| `manifest.webmanifest` | Nama, ikon, warna — agar bisa "Tambahkan ke Layar Utama" |
| `sw.js` | Service worker: hanya menyimpan berkas cangkang, tidak pernah data |
| `*.png` | Ikon aplikasi |

## Pemasangan

1. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
2. Alamat aplikasi menjadi `https://ascontrade.github.io/awanata/`.
3. Di Apps Script → Project Settings → Script properties, tambahkan
   `FRAME_ORIGINS` = `https://ascontrade.github.io` (tanpa garis miring di akhir).
   Tanpa ini, Awanata menolak tampil di dalam cangkang (perlindungan clickjacking).
4. Buka alamat aplikasi di HP → **Tambahkan ke Layar Utama** / **Install app**.

Jika URL web app berubah (deployment baru, bukan versi baru), ganti `APP_URL` di `index.html`.
