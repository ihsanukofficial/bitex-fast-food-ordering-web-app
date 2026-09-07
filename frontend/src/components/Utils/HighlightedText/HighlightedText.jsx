import RedStyleText from '../RedStyleText/RedStyleText';

/**
 * HighlightedText
 *
 * Renders CMS-edited copy that marks one word or phrase for red emphasis by wrapping
 * it in *asterisks* (e.g. "The *Taste* You Remember."), so admins can move the
 * highlight without touching code — the emphasis Headline and CallToActionHeading
 * used to hardcode directly via RedStyleText.
 */
function HighlightedText({ text }) {
  if (!text) return null;

  return text.split(/\*(.+?)\*/g).map((part, index) =>
    index % 2 === 1 ? <RedStyleText key={index}>{part}</RedStyleText> : part,
  );
}

export default HighlightedText;
