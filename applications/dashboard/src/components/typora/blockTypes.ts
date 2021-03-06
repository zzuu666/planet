/**
 * enum for content block type
 * includes CoreDraftBlockType and custom block type
 *
 * @see https://draftjs.org/docs/api-reference-content-block
 */
export enum BlockType {
    image = 'atomic:image',
    code = 'atomic:code',
    title = 'title',
    break = 'break',

    /** core draft block type  */
    unstyled = 'unstyled',
    atomic = 'atomic',
    unorderedListItem = 'unordered-list-item'
}
