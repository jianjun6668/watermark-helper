### WatermarkHelper 使用文档
WatermarkHelper 是一个用于在 Canvas 上添加图像和文字水印的辅助类。
#### 安装

首先确保已经安装了 `watermark-helper` 包：

```bash
npm install watermark-helper
```

或者使用 yarn：

```bash
yarn add watermark-helper
```

#### 引入

在您的项目中引入 `WatermarkHelper`：

```javascript
import WatermarkHelper from 'watermark-helper';
```

#### 使用方法

##### 参数

`watermarkGenerator` 方法接受一个配置对象作为参数，配置对象包含两个主要部分：`source` 和 `watermark`。

- `source` 对象包含源图像的信息：
    - `url` (string): 源图像的 URL。
    - `width` (number, optional): 源图像的宽度。
    - `height` (number, optional): 源图像的高度。

- `watermark` 对象包含水印的信息：
    - `text` (string, optional): 要添加的文字水印内容。
    - `color` (string, optional): 文字水印的颜色。
    - `url` (string, optional): 要添加的图像水印的 URL。
    - `width` (number, optional): 图像水印的宽度。
    - `height` (number, optional): 图像水印的高度。

##### 返回值

`watermarkGenerator` 方法返回一个 Promise，Promise 的解析值是生成的带水印的图像数据 URL。

##### 示例

以下示例展示了如何使用 `watermarkGenerator` 方法：

```javascript
import WatermarkHelper from 'watermark-helper';

const helper = new WatermarkHelper();

// 配置对象，包含源图像和水印信息
const config = {
  source: {
    url: 'path/to/your/source-image.jpg',
    width: 800, // 可选，源图像宽度
    height: 600, // 可选，源图像高度
  },
  watermark: {
    text: 'Confidential',
    color: '#ff0000', // 可选，文字颜色
    // url: 'path/to/your/watermark-image.png', // 可选，图像水印的 URL
    // width: 200, // 可选，图像水印的宽度
    // height: 100, // 可选，图像水印的高度
  },
};

// 调用 watermarkGenerator 方法生成带水印的图像数据 URL
helper.watermarkGenerator(config)
  .then(dataUrl => {
    // dataUrl 包含了带水印的图像数据 URL，可以将其用作需要显示水印的地方
    const imgElement = new Image();
    imgElement.src = dataUrl;
    document.body.appendChild(imgElement);
  })
  .catch(error => {
    console.error('Failed to generate watermark:', error);
  });
```

#### 注意事项

- 确保配置对象中提供了源图像的 URL (`source.url`)，以及至少一个水印（文字或图像）的信息 (`watermark.text` 或 `watermark.url`)。
- 如果需要，可以根据实际需求调整 `watermarkGenerator` 方法的配置对象，例如指定水印的颜色、位置和大小等。
