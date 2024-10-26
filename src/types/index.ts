import { v4 as uuidv4 } from 'uuid';

// -----------------------------
// ブロックのベースクラス
// -----------------------------
export class Block {
    public readonly id: string; // 一意なID
    public type: BlockType; // ブロックのタイプ
    public content: Content; // コンテンツデータ
    public isEmpty: boolean; // 空かどうかのフラグ

    constructor(type: BlockType, content: Content) {
        this.id = uuidv4();
        this.type = type;
        this.content = content;
        this.isEmpty =
            !content ||
            content.chunks.every((chunk) => chunk.text.trim() === '\u200B');
    }
}

// -----------------------------
// ブロックのタイプを定義
// -----------------------------
export type BlockType = 'heading' | 'text' | 'list' | 'image';

// -----------------------------
// コンテンツのインターフェース
// -----------------------------
export interface Content {
    chunks: ContentChunk[]; // 複数のチャンク
    fileData?: FileData; // 画像ファイルのメタ情報（任意）
}

// -----------------------------
// チャンクの内容を定義
// -----------------------------
export interface ContentChunk {
    text: string; // チャンクごとのテキスト内容
    style: TextStyle; // チャンクに適用されるスタイル
    linkUrl?: string; // リンクのURL（任意）
}

// -----------------------------
// テキストスタイルのインターフェース
// -----------------------------
export interface TextStyle {
    size?: 'small' | 'medium' | 'large'; // テキストサイズ
    weight?: 'normal' | 'bold'; // フォントウェイト
    italic?: boolean; // 斜体
    underline?: boolean; // 下線
    strikethrough?: boolean; // 打ち消し線
    color?: string; // テキストの色
    backgroundColor?: string; // テキストの背景色
    tips?: boolean; // TIPS枠
    point?: boolean; // POINT枠
}

// -----------------------------
// ファイルデータを定義
// -----------------------------
export interface FileData {
    url: string; // 画像、動画のURL
    fileName: string; // ファイル名
    fileSize: number; // ファイルサイズ
    alt?: string; // 画像や動画の説明テキスト（任意）
    mimeType: string; // ファイルのMIMEタイプ
}

// -----------------------------
// 見出しブロックのクラス
// -----------------------------
export class HeadingBlock extends Block {
    constructor(
        text: string = '',
        style: TextStyle = { size: 'large', weight: 'bold' }
    ) {
        const content: Content = {
            chunks: [{ text, style }],
        };
        super('heading', content);
    }
}

// -----------------------------
// テキストブロックのクラス
// -----------------------------
export class TextBlock extends Block {
    constructor(
        text: string = '',
        style: TextStyle = { size: 'medium', weight: 'normal' }
    ) {
        const content: Content = {
            chunks: [{ text, style }],
        };
        super('text', content);
    }
}

// -----------------------------
// 任意のターゲットプロパティを追加するためのインターフェース
// -----------------------------
export interface CustomMouseEventInit extends MouseEventInit {
    target?: EventTarget;
}
