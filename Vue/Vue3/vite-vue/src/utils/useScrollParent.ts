import { isBrowser } from './basic'
type ScrollElement = HTMLElement | Window

const overflowScrollReg = /scroll|auto|overlay/i
const defaultRoot = isBrowser ? window : undefined

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1
  return (
    node.tagName !== 'HTML' &&
		node.tagName !== 'BODY' &&
		node.nodeType === ELEMENT_NODE_TYPE)
}

export function getScrollParent(el: Element, root: ScrollElement | undefined = defaultRoot) {
  let node = el

  while (node && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node)

    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    node = node.parentNode as Element
  }
}
