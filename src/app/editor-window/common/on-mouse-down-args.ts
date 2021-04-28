export interface OnMouseDownArgs {
  /** DOM ID of the tag which was clicked on (either <p> for line or <span> for colored text inside it). */
  clickedLineElementId: string;
  /** Number of characters between the caret and the closes from left node. */
  caretOffset: number;
}