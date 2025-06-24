//with event reference
export function domToJsonExtended(node) {
  const selfClosingTags = new Set(["input", "br", "hr", "img", "meta", "link"]);

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    return text ? { textContent: text } : null;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const tag = node.tagName.toLowerCase();
  const json = { startTag: tag };

  if (selfClosingTags.has(tag)) {
    json.endTag = "/";
  } else {
    json.endTag = `/${tag}`;
  }

  let attr = [];
  let on = {};

  if (node.attributes?.length) {
    Array.from(node.attributes).forEach(attrNode => {
      const name = attrNode.name;
      const value = attrNode.value;

      if (name.startsWith("on")) {
        const event = name.slice(2); // e.g., 'click' from 'onclick'
        on[event] = value;
      } else {
        attr.push({
          key: name,
          value: name === "required" ? true : value
        });
      }
    });

    if (attr.length) json.attr = attr;
    if (Object.keys(on).length > 0) json.on = on;
  }

  const children = Array.from(node.childNodes)
    .map(domToJsonExtended)
    .filter(Boolean);

  if (
    children.length === 1 &&
    children[0].textContent &&
    !children[0].startTag
  ) {
    json.textContent = children[0].textContent;
  } else if (children.length) {
    json.elements = children;
  }

  return json;
}

//with auto-bind logic
export function jsonToDomExtended(json, eventRegistry = {}) {
  if (!json || !json.startTag) {
    return document.createTextNode(json.textContent || '');
  }

  const svgns = "http://www.w3.org/2000/svg";
  const svgTags = new Set([
    "svg", "path", "circle", "line", "ellipse", "rect",
    "text", "image", "defs", "pattern"
  ]);

  const create = svgTags.has(json.startTag)
    ? () => document.createElementNS(svgns, json.startTag)
    : () => document.createElement(json.startTag);

  const el = create();

  // Attributes
  if (json.attr) {
    for (const { key, value } of json.attr) {
      el.setAttribute(key, value === true ? "" : value);
    }
  }

  // Event bindings
  if (json.on) {
    for (const [event, handlerName] of Object.entries(json.on)) {
      const handler = eventRegistry[handlerName];
      if (typeof handler === 'function') {
        el.addEventListener(event, handler);
      } else {
        console.warn(`No handler found for "${handlerName}" in registry`);
      }
    }
  }

  // Text content
  if (json.textContent) {
    el.textContent = json.textContent;
  }

  // Recursively render child elements
  if (json.elements) {
    for (const child of json.elements) {
      el.appendChild(jsonToDomExtended(child, eventRegistry));
    }
  }

  return el;
}
