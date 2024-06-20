var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 水印辅助类，提供在 canvas 上添加图像和文字水印的功能。
 */
var WatermarkHelper = /** @class */ (function () {
    function WatermarkHelper() {
    }
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
    WatermarkHelper.prototype.canvasAddImage = function (_a) {
        var ctx = _a.ctx, img = _a.img, left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        ctx.drawImage(img, left, top, width, height);
    };
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
    WatermarkHelper.prototype.canvasAddFont = function (_a) {
        var ctx = _a.ctx, text = _a.text, color = _a.color, row = _a.row, col = _a.col, wWidth = _a.wWidth, wHeight = _a.wHeight;
        // 定义水印文字的颜色
        var colors = [color];
        // 定义水印文字在画布上的起始位置
        var pos = [
            { left: 73, top: 72 },
            { left: 225, top: 195 },
        ];
        // 测量文字的宽度
        var width = ctx.measureText(text).width;
        // 遍历颜色数组和位置数组，为文字水印设置不同颜色和位置
        for (var i = 0; i < colors.length; i++) {
            for (var j = 0; j < pos.length; j++) {
                ctx.font = "16px PingFang SC";
                ctx.fillStyle = colors[i];
                // 根据列数和行数以及位置数组，计算文字的绘制位置
                ctx.fillText(text, col * wWidth + pos[j].left - width / 2, row * wHeight + pos[j].top);
            }
        }
    };
    /**
     * 加载图像并返回一个包含该图像的 Promise。
     * @param {string} url - 图像的 URL。
     * @returns {Promise<HTMLImageElement>} - 包含加载的图像的 Promise。
     */
    WatermarkHelper.prototype.getImageInfo = function (url) {
        // @ts-ignore
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = url;
            img.crossOrigin = "anonymous";
            // 图像加载成功时的处理
            img.onload = function () {
                resolve(img);
            };
            // 图像加载失败时的处理
            img.onerror = reject;
        });
    };
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
    WatermarkHelper.prototype.watermarkGenerator = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, sourceUrl, sourceWidth, sourceHeight, _c, _d, watermarkText, watermarkColor, watermarkUrl, watermarkWidth, watermarkHeight, mainImg, watermarkImg, width, height, wWidth, wHeight, canvas, ctx, rowNum, colNum, i, j;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = config.source, _b = _a === void 0 ? {} : _a, sourceUrl = _b.url, sourceWidth = _b.width, sourceHeight = _b.height, _c = config.watermark, _d = _c === void 0 ? {} : _c, watermarkText = _d.text, watermarkColor = _d.color, watermarkUrl = _d.url, watermarkWidth = _d.width, watermarkHeight = _d.height;
                        // 检查必要的配置项是否提供
                        if (!sourceUrl) {
                            throw new Error("sourceUrl is required");
                        }
                        if (!watermarkUrl && !watermarkText) {
                            throw new Error("watermarkUrl or watermarkText are required");
                        }
                        return [4 /*yield*/, this.getImageInfo(sourceUrl)];
                    case 1:
                        mainImg = _e.sent();
                        if (!watermarkUrl) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getImageInfo(watermarkUrl)];
                    case 2:
                        watermarkImg = _e.sent();
                        _e.label = 3;
                    case 3:
                        width = sourceWidth || mainImg.width || 300;
                        height = sourceHeight || mainImg.height || 200;
                        wWidth = watermarkWidth || (watermarkImg === null || watermarkImg === void 0 ? void 0 : watermarkImg.width) || 300;
                        wHeight = watermarkHeight || (watermarkImg === null || watermarkImg === void 0 ? void 0 : watermarkImg.height) || 200;
                        canvas = document.createElement("canvas");
                        ctx = canvas.getContext("2d");
                        if (!ctx) {
                            throw new Error("Failed to get 2D context");
                        }
                        canvas.width = width;
                        canvas.height = height;
                        // 在 canvas 上绘制源图像
                        ctx.drawImage(mainImg, 0, 0, width, height);
                        rowNum = Math.ceil(height / wHeight);
                        colNum = Math.ceil(width / wWidth);
                        // 遍历网格，为每个网格添加图像或文字水印
                        for (i = 0; i < rowNum; i++) {
                            for (j = 0; j < colNum; j++) {
                                if (watermarkImg) {
                                    this.canvasAddImage({
                                        ctx: ctx,
                                        img: watermarkImg,
                                        left: j * wWidth,
                                        top: i * wHeight,
                                        width: wWidth,
                                        height: wHeight,
                                    });
                                }
                                if (watermarkText) {
                                    this.canvasAddFont({
                                        ctx: ctx,
                                        text: watermarkText,
                                        color: watermarkColor || "#fff",
                                        row: i,
                                        col: j,
                                        wWidth: wWidth,
                                        wHeight: wHeight,
                                    });
                                }
                            }
                        }
                        // 返回带水印的图像数据 URL
                        return [2 /*return*/, canvas.toDataURL()];
                }
            });
        });
    };
    return WatermarkHelper;
}());
export default WatermarkHelper;
