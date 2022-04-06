# String.fromCharCode 与 String.fromCodePoint 背后的知识

`String.fromCodePoint` 与 `String.fromCharCode` 这两个方法名称相似。如果你之前未了解过，让我们来先看 MDN 上的介绍。

- [String.fromCodePoint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)

> String.fromCodePoint() 静态方法返回使用指定的代码点序列创建的字符串。

- [String.fromCodePoint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)

> 静态 String.fromCharCode() 方法返回由指定的 UTF-16 代码单元序列创建的字符串。

读完以上介绍，你的困惑可能又多了一些。「代码点」，「UTF-16 代码单元序列」分别指的是什么意思？为了这些理解概念，让我们 Unicode 编码开始谈起。

## Unicode 编码

Unicode 编码给全世界上所有的字符分配了唯一的数字编号，即 code point（下文统一称代码点）。Unicode 字符共计 110 多万，用一个 unsigned int32 来完全够了。

| 字符 | 代码点 |
| ---- | ------ |
| a    | 97     |
| 金   | 37329  |
| 😝   | 128541 |

通过调用字符串的 `codePointAt` 方法可以获取指定位置字符的代码点，调用 `String.fromCodePoint` 可以将代码点转为字符，`codePointAt` 与 `fromCodePoint` 可以归为一类。

```js
"😝".codePointAt(0); // 128541

String.fromCodePoint(128541); // '😝'
```

### UTF-8 与 UTF-16

Unicode 编码只是定义了代码点，但并未规定二进制数据存储的格式。用四个字节来存储最方便，但是过于浪费存储空间。实践中，往往采用变长编码，比如 UTF-8 与 UTF-16 格式来存储数据。

UTF-8 编码占用字节数 1 - 4，UTF-16 编码占用字节数为 2 或者 4。借助 Node 中的 `Buffer` 对象可以观察字符对应二进制数据。

```js
Buffer.from("😝", "utf8"); // [0xf0, 0x9f, 0x98, 0x9d]

Buffer.from("😝", "utf16le"); // [0x3d, 0xd8, 0x1d, 0xde]
```

### JavaScript 字符的缺陷

JavaScript 虽然遵循 Unicode 编码，但采用的是已经废弃的 UCS-2 编码格式。该方案的缺陷是对于占用 4 个**字节**的字符，比如 emoji 表情，会被当做 2 个**字符**。调用字符串的 `charCodeAt` 方法可以看到字符指定位置的单元序列。

```js
"😝".length; // 2

"😝".split(""); // ['\uD83D', '\uDE1D']

"😝".charCodeAt(0); // 55357 === 0xD83D
"😝".charCodeAt(1); // 56861 === 0xDE1D
```

将单元序列转成 16 进制数，加上 `\u` 也可用以表示该字符。所以我们看到上方对 「😝」拆分即得到 2 个字符。使用 `String.fromCharCode` 可以将单元序列转成字符。`fromCharCode` 与 `charCodeAt` 可以归为一组。

在日常的开发中，我们不应该纠结于这些细节中，好在 ES6 的一些新特性帮助我们更方便地的处理字符串。说使用 `for...of` 来遍历字符串，使用 `Array.from` 来准确的计算字符串长度。

```js
for (const ch of "😝") {
  console.log(ch);
}

Array.from("😝").length;
```

## ES6 中对 Unicode 的支持

```js
// '😝'
// '\uD83D\uDE1D'
// '\u{1F61D}'
```
