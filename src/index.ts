/**
 * 水印辅助类，提供在 canvas 上添加图像和文字水印的功能。
 */
export default class WatermarkHelper {
  /**
   * 在 canvas 上添加图像水印。
   * @param {Object} config - 包含 canvas 上下文、图像对象、以及水印位置和大小的信息。
   * @param {CanvasRenderingContext2D} config.ctx - Canvas 的绘图上下文。
   * @param {HTMLImageElement} config.img - 要添加的图像对象。
   * @param {number} config.left - 图像的左上角 x 坐标。
   * @param {number} config.top - 图像的左上角 y 坐标。
   * @param {number} config.width - 图像的宽度。
   * @param {number} config.height - 图像的高度。
   */
  canvasAddImage({
    ctx,
    img,
    left,
    top,
    width,
    height,
  }: {
    ctx: CanvasRenderingContext2D;
    img: HTMLImageElement;
    left: number;
    top: number;
    width: number;
    height: number;
  }): void {
    ctx.drawImage(img, left, top, width, height);
  }

  /**
   * 在 canvas 上添加文字水印。
   * @param {Object} config - 包含 canvas 上下文、文字内容、以及水印网格位置和大小的信息。
   * @param {CanvasRenderingContext2D} config.ctx - Canvas 的绘图上下文。
   * @param {string} config.text - 要添加的文字内容。
   * @param {string} config.color - 要添加的文字颜色。
   * @param {number} config.row - 当前文字所在的行号。
   * @param {number} config.col - 当前文字所在的列号。
   * @param {number} config.wWidth - 水印网格的宽度。
   * @param {number} config.wHeight - 水印网格的高度。
   */
  canvasAddFont({
    ctx,
    text,
    color,
    row,
    col,
    wWidth,
    wHeight,
  }: {
    ctx: CanvasRenderingContext2D;
    text: string;
    color: string;
    row: number;
    col: number;
    wWidth: number;
    wHeight: number;
  }): void {
    // 定义水印文字的颜色
    const colors: string[] = [color];
    // 定义水印文字在画布上的起始位置
    const pos: { left: number; top: number }[] = [
      { left: 73, top: 72 },
      { left: 225, top: 195 },
    ];
    // 测量文字的宽度
    const { width } = ctx.measureText(text);

    // 遍历颜色数组和位置数组，为文字水印设置不同颜色和位置
    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        ctx.font = `16px PingFang SC`;
        ctx.fillStyle = colors[i];
        // 根据列数和行数以及位置数组，计算文字的绘制位置
        ctx.fillText(
          text,
          col * wWidth + pos[j].left - width / 2,
          row * wHeight + pos[j].top,
        );
      }
    }
  }

  /**
   * 加载图像并返回一个包含该图像的 Promise。
   * @param {string} url - 图像的 URL。
   * @returns {Promise<HTMLImageElement>} - 包含加载的图像的 Promise。
   */
  getImageInfo(url: string): Promise<HTMLImageElement> {
    // @ts-ignore
    return new Promise(
      (
        resolve: (img: HTMLImageElement) => void,
        reject: (error: Event | string) => void,
      ) => {
        const img: HTMLImageElement = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        // 图像加载成功时的处理
        img.onload = () => {
          resolve(img);
        };
        // 图像加载失败时的处理
        img.onerror = reject;
      },
    );
  }

  /**
   * 生成带水印的图像数据 URL。
   * @param {Object} config - 包含源图像 URL、文字水印内容和图像水印 URL 的信息。
   * @param {Object} config.source - 源图像信息。
   * @param {string} config.source.url - 源图像的 URL。
   * @param {number} [config.source.width] - 源图像的宽度（可选）。
   * @param {number} [config.source.height] - 源图像的高度（可选）。
   * @param {Object} config.watermark - 水印信息。
   * @param {string} config.watermark.text - 文字水印的内容。
   * @param {string} config.watermark.color - 文字水印的颜色。
   * @param {string} config.watermark.url - 图像水印的 URL。
   * @param {number} [config.watermark.width] - 水印图像的宽度（可选）。
   * @param {number} [config.watermark.height] - 水印图像的高度（可选）。
   * @returns {Promise<string>} - 带水印的图像的数据 URL。
   */
  async watermarkGenerator(config: {
    source: {
      url: string;
      width?: number;
      height?: number;
    };
    watermark: {
      text?: string;
      color?: string;
      url?: string;
      width?: number;
      height?: number;
    };
  }): Promise<string> {
    // 解构配置中的源图像和水印信息
    const {
      source: { url: sourceUrl, width: sourceWidth, height: sourceHeight } = {},
      watermark: {
        text: watermarkText,
        color: watermarkColor,
        url: watermarkUrl,
        width: watermarkWidth,
        height: watermarkHeight,
      } = {},
    } = config;

    // 检查必要的配置项是否提供
    if (!sourceUrl) {
      throw new Error("sourceUrl is required");
    }
    if (!watermarkUrl && !watermarkText) {
      throw new Error("watermarkUrl or watermarkText are required");
    }

    // 加载源图像和水印图像
    const mainImg: HTMLImageElement = await this.getImageInfo(sourceUrl);
    let watermarkImg: HTMLImageElement | undefined;

    if (watermarkUrl) {
      watermarkImg = await this.getImageInfo(watermarkUrl);
    }

    // 设置水印图像的默认大小
    const width: number = sourceWidth || mainImg.width || 300;
    const height: number = sourceHeight || mainImg.height || 200;
    const wWidth: number = watermarkWidth || watermarkImg?.width || 300;
    const wHeight: number = watermarkHeight || watermarkImg?.height || 200;

    // 创建 canvas 元素，并设置其大小
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get 2D context");
    }
    canvas.width = width;
    canvas.height = height;

    // 在 canvas 上绘制源图像
    ctx.drawImage(mainImg, 0, 0, width, height);

    // 计算水印网格的行数和列数
    const rowNum: number = Math.ceil(height / wHeight);
    const colNum: number = Math.ceil(width / wWidth);

    // 遍历网格，为每个网格添加图像或文字水印
    for (let i = 0; i < rowNum; i++) {
      for (let j = 0; j < colNum; j++) {
        if (watermarkImg) {
          this.canvasAddImage({
            ctx,
            img: watermarkImg,
            left: j * wWidth,
            top: i * wHeight,
            width: wWidth,
            height: wHeight,
          });
        }
        if (watermarkText) {
          this.canvasAddFont({
            ctx,
            text: watermarkText,
            color: watermarkColor || "#fff",
            row: i,
            col: j,
            wWidth,
            wHeight,
          });
        }
      }
    }

    // 返回带水印的图像数据 URL
    return canvas.toDataURL();
  }
}
