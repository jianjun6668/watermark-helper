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
    canvasAddImage({ ctx, img, left, top, width, height, }: {
        ctx: CanvasRenderingContext2D;
        img: HTMLImageElement;
        left: number;
        top: number;
        width: number;
        height: number;
    }): void;
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
    canvasAddFont({ ctx, text, color, row, col, wWidth, wHeight, }: {
        ctx: CanvasRenderingContext2D;
        text: string;
        color: string;
        row: number;
        col: number;
        wWidth: number;
        wHeight: number;
    }): void;
    /**
     * 加载图像并返回一个包含该图像的 Promise。
     * @param {string} url - 图像的 URL。
     * @returns {Promise<HTMLImageElement>} - 包含加载的图像的 Promise。
     */
    getImageInfo(url: string): Promise<HTMLImageElement>;
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
    watermarkGenerator(config: {
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
    }): Promise<string>;
}
