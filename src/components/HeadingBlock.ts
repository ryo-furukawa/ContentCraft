import { Block } from '@/types/index';
import { Content, TextStyle } from '@/types/index';

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
