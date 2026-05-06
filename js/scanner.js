// シンプルなQRコード読み取りライブラリ
class QRScanner {
  constructor(video, callback) {
    this.video = video;
    this.callback = callback;
    this.startCamera();
  }

  async startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    this.video.srcObject = stream;
    this.video.setAttribute("playsinline", true);
    this.video.play();
    requestAnimationFrame(() => this.scan());
  }

  scan() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    context.drawImage(this.video, 0, 0, canvas.width, canvas.height);

    try {
      const code = jsQR(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
      if (code) {
        this.callback(code.data);
      }
    } catch (e) {}

    requestAnimationFrame(() => this.scan());
  }
}
