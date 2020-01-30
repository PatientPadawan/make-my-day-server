const sanitizeHtml = require('sanitize-html');

function htmlSanitizer(req, res, context) {
  req.body.content = sanitizeHtml(req.body.content, {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe'],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt', 'width'],
    },
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: true,
  });
  return context.continue;
}

module.exports = htmlSanitizer;
