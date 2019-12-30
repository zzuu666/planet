/**
 * Find selection dom
 *
 * @param root
 *
 * @returns {HTMLElement | null}
 */
export const getSelectedBlockNode = (root: Window) => {
    const selection = root.getSelection()
    if (!selection || selection.rangeCount === 0) {
        return null
    }
    let node: HTMLElement | null = selection.getRangeAt(0)
        .startContainer as HTMLElement
    do {
        if (node.getAttribute && node.getAttribute('data-block') === 'true') {
            return node
        }
        node = node.parentNode as HTMLElement
    } while (node !== null)

    return node
}
