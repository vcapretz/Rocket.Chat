/*
 * Markdown is a named function that will parse markdown syntax
 * @param {String} msg - The message html
 */
import hljs from 'highlight.js';

const highlighter = function(str, lang) {
	const pre_code = '<pre class="code-colors hljs"><code><span class="copyonly">\`\`\`<br></span>';
	const post_code = '<span class="copyonly"><br>\`\`\`</span></code></pre>';
	if (lang && hljs.getLanguage(lang)) {
		return pre_code.concat(hljs.highlight(lang, str, true).value, post_code);
	}
	return pre_code.concat(_.escapeHTML(str), post_code);
};

const parseNotEscaped = function(msg) {
	console.log(require('markdown-it'));
	const md = require('markdown-it')
	('zero', {breaks:true, typographer:true, highlight:highlighter})
		.enable([
			'table',		// GFM table, non-standard  BLK
			'code',			// Code block (4 spaces padded) BLK		NOPE?
			'fence',		// ``` lang, ~~~ lang  BLK				OK
			'blockquote',	// > quote syntax  BLK					NOPE
			'list',			// Lists  BLK
			'heading',		// headings (#, ##, ...)  BLK			OK
			'escape',		// Process escaped chars and hardbreaks	INLINE
			'newline',		// Remove tabs at the beginning of the line in paragraphs	INLINE
			'backticks',	// Parse backticks   INLINE			NO REALLY (new line)
			'strikethrough', // ~~strike through~~	INLINE		NOT REALLY (new line)
			'emphasis',		// Process *this* and _that_		INLINE   NOT REALLY (new line)
			'link',			// Process [link](<to> "stuff")		INLINE
			'image',		// Process ![image](<src> "title")	INLINE
			'replacements',	// Simple typographyc replacements	CORE
			'smartquotes',	// Convert straight quotation marks to typographic ones	CORE
			'hr'			// Horizontal rule	BLK
		])
		.use(require('markdown-it-sub'))
		.use(require('markdown-it-sup'))
		.use(require('markdown-it-checkbox'))
		;
	msg = md.render(msg);

	if (typeof window !== 'undefined' && window !== null ? window.rocketDebug : undefined) { console.log('Markdown', msg); }
	return msg;
};

export const markdown = function(message) {
	return parseNotEscaped(_.escapeHTML(message.html, message));
};
