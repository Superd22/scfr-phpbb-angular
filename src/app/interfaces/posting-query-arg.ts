/**
 * Describes url args to send to phpbb for posting.php
 */
export interface PostingQueryArg {
  /** forum id */
  f: number,
  /** topic id */
  t?: number,
  /** post id */
  p?: number,
  /** mode of posting */
  mode: "post" | "reply" | "edit"
}